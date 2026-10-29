package uk.co.greendawn.jungle;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
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
    private WebView gameView;

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
