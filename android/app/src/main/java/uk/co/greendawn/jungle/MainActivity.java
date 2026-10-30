package uk.co.greendawn.jungle;

import android.os.Build;
import android.os.Bundle;
import android.content.Intent;
import android.app.Activity;
import android.webkit.JavascriptInterface;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import android.content.res.Configuration;
import android.graphics.Color;
import android.net.Uri;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Collections;

/**
 * Offline Android wrapper for Green Dawn.
 * All the HTML, JavaScript and art are packaged in the APK.
 * No Internet permission or advertising SDKs are required.
 */
public final class MainActivity extends Activity {
    private static final String HOST = "appassets.androidplatform.net";
    private static final String PREFIX = "/game/";
    private static final int PICK_EXPORT = 412, PICK_IMPORT = 413;
    private static final int MAX_BACKUP_BYTES = 240000;
    private WebView gameView;
    private String pendingExport;
    private boolean pickerOpen = false;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        hideSystemBars();
        getWindow().addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        gameView = new WebView(this);
        gameView.setBackgroundColor(Color.rgb(17, 24, 18));
        gameView.setWebChromeClient(new WebChromeClient());
        WebSettings s = gameView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(true);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setBuiltInZoomControls(false);
        s.setDisplayZoomControls(false);
        // JS bridge is only exposed to the offline, locally intercepted game.
        // The Android document picker needs no file/storage permissions.
        gameView.addJavascriptInterface(new SaveBridge(), "GreenDawnAndroid");
        gameView.setWebViewClient(new WebViewClient() {
            private WebResourceResponse block() {
                return new WebResourceResponse("text/plain", "UTF-8", 403,
                    "Forbidden", Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                String path = u.getPath();
                return !"https".equals(u.getScheme()) || !HOST.equals(u.getHost())
                    || path == null || !path.startsWith(PREFIX);
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                String path = u.getPath();
                if (!"https".equals(u.getScheme()) || !HOST.equals(u.getHost())
                    || path == null || !path.startsWith(PREFIX)) return block();
                String asset = path.substring(PREFIX.length());
                if (asset.isEmpty()) asset = "index.html";
                if (asset.startsWith("/") || asset.contains("..")) return block();
                try {
                    InputStream input = getAssets().open(asset);
                    String type = asset.endsWith(".js") ? "text/javascript"
                        : asset.endsWith(".html") ? "text/html"
                        : asset.endsWith(".png") ? "image/png"
                        : "text/plain";
                    return new WebResourceResponse(type, "UTF-8", input);
                } catch (Exception ex) {
                    return block();
                }
            }
        });
        setContentView(gameView);
        gameView.loadUrl("https://" + HOST + PREFIX + "index.html");
        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                new OnBackInvokedCallback() {
                    @Override public void onBackInvoked() { togglePause(); }
                });
        }
    }

    /** Scoped Storage picker; backups never require INTERNET or storage permissions. */
    private final class SaveBridge {
        @JavascriptInterface public void exportSave(String content) {
            if (content == null || content.getBytes(StandardCharsets.UTF_8).length > MAX_BACKUP_BYTES) {
                runOnUiThread(() -> reportBackup("SAVE TOO LARGE - EXPORT FAILED"));
                return;
            }
            runOnUiThread(() -> {
                if (pickerOpen) { reportBackup("FINISH THE CURRENT FILE PICKER"); return; }
                pendingExport = content;
                pickerOpen = true;
                try {
                    Intent picker = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    picker.addCategory(Intent.CATEGORY_OPENABLE);
                    picker.setType("application/json");
                    String date = new SimpleDateFormat("yyyyMMdd-HHmm",Locale.UK).format(new Date());
                    boolean worldWar = content.contains("\"format\": \"GREEN_DAWN_WW2_SAVE\"");
                    picker.putExtra(Intent.EXTRA_TITLE,
                        (worldWar ? "GreenDawn-WW2-" : "GreenDawn-") + date + ".json");
                    startActivityForResult(picker,PICK_EXPORT);
                } catch (Exception e) {
                    pendingExport = null;
                    pickerOpen = false;
                    reportBackup("COULD NOT OPEN FILE PICKER");
                }
            });
        }

        @JavascriptInterface public void importSave() {
            runOnUiThread(() -> {
                if (pickerOpen) { reportBackup("FINISH THE CURRENT FILE PICKER"); return; }
                pickerOpen = true;
                try {
                    Intent picker = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                    picker.addCategory(Intent.CATEGORY_OPENABLE);
                    picker.setType("*/*"); // Some Android file managers label JSON as text/plain.
                    picker.putExtra(Intent.EXTRA_MIME_TYPES,
                        new String[]{"application/json","text/plain","application/octet-stream"});
                    startActivityForResult(picker,PICK_IMPORT);
                } catch (Exception e) {
                    pickerOpen = false;
                    reportBackup("COULD NOT OPEN FILE PICKER");
                }
            });
        }
    }

    private void callGame(String script) {
        if (gameView != null) gameView.evaluateJavascript(script,null);
    }

    private void reportBackup(String status) {
        callGame("window.greenDawnOnNativeStatus(" + JSONObject.quote(status) + ")");
    }

    @Override @SuppressWarnings("deprecation")
    protected void onActivityResult(int request, int result, Intent data) {
        super.onActivityResult(request,result,data);
        if (request != PICK_EXPORT && request != PICK_IMPORT) return;
        pickerOpen = false;
        String export = pendingExport;
        pendingExport = null; // Avoid keeping copies of campaign saves in Activity state.
        if (result != RESULT_OK || data == null || data.getData() == null) {
            reportBackup("CANCELLED - NO SAVE CHANGED");
            return;
        }
        Uri file = data.getData();
        if (request == PICK_EXPORT) {
            if (export == null) { reportBackup("SAVE NO LONGER AVAILABLE"); return; }
            try (OutputStream stream = getContentResolver().openOutputStream(file,"w")) {
                if (stream == null) throw new IllegalStateException("No output stream");
                byte[] bytes = export.getBytes(StandardCharsets.UTF_8);
                if (bytes.length > MAX_BACKUP_BYTES) throw new IllegalStateException("File too large");
                stream.write(bytes);
                stream.flush();
                reportBackup("BACKUP SAVED - KEEP THE JSON FILE");
            } catch (Exception e) {
                reportBackup("EXPORT FAILED - TRY AGAIN");
            }
        } else {
            try (InputStream stream = getContentResolver().openInputStream(file)) {
                if (stream == null) throw new IllegalStateException("No input stream");
                ByteArrayOutputStream content = new ByteArrayOutputStream();
                byte[] buf = new byte[8192];
                int n;
                while ((n = stream.read(buf)) != -1) {
                    if (content.size() + n > MAX_BACKUP_BYTES) throw new IllegalStateException("File too large");
                    content.write(buf,0,n);
                }
                String json = new String(content.toByteArray(),StandardCharsets.UTF_8);
                callGame("window.greenDawnOnNativeBackup(" + JSONObject.quote(json) + ")");
            } catch (Exception e) {
                reportBackup("IMPORT FAILED - CHECK JSON FILE");
            }
        }
    }

    private void hideSystemBars() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
            View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
    }

    private void togglePause() {
        if (gameView != null) gameView.evaluateJavascript(
            "window.dispatchEvent(new KeyboardEvent('keydown',{code:'Escape',key:'Escape',bubbles:true}))", null);
    }

    @SuppressWarnings("deprecation")
    @Override public void onBackPressed() { togglePause(); }

    @Override public void onWindowFocusChanged(boolean focused) {
        super.onWindowFocusChanged(focused);
        if (focused) hideSystemBars();
    }

    @Override public void onConfigurationChanged(Configuration config) {
        super.onConfigurationChanged(config);
        hideSystemBars();
    }

    @Override protected void onPause() {
        if (gameView != null) {
            gameView.evaluateJavascript("window.dispatchEvent(new Event('green-dawn-pause'))", null);
            gameView.onPause();
        }
        super.onPause();
    }

    @Override protected void onResume() {
        super.onResume();
        if (gameView != null) gameView.onResume();
        hideSystemBars();
    }

    @Override protected void onDestroy() {
        if (gameView != null) {
            gameView.loadUrl("about:blank");
            gameView.destroy();
            gameView = null;
        }
        super.onDestroy();
    }
}
