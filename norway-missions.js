/* Original Green Dawn Norway 1940 mission layouts, world coordinates 1024 x 672.
 * Fictional squad actions in historical campaign settings. */
(function(root){
'use strict';
const missions=[
  {
    "number": 1,
    "title": "Cold Landing",
    "kind": "coastal",
    "environment": "snow",
    "summary": "Silence the coastal gun and secure the landing point."
  },
  {
    "number": 2,
    "title": "Mountain Patrol",
    "kind": "ridge",
    "environment": "highlands",
    "seed": 19400426,
    "summary": "Clear three defended ridge checkpoints.",
    "insertion": [
      [
        105,
        568
      ],
      [
        88,
        584
      ],
      [
        120,
        585
      ]
    ],
    "route": [
      [
        105,
        568
      ],
      [
        228,
        520
      ],
      [
        326,
        448
      ],
      [
        449,
        405
      ],
      [
        535,
        367
      ],
      [
        591,
        330
      ],
      [
        663,
        330
      ],
      [
        721,
        284
      ],
      [
        813,
        223
      ],
      [
        892,
        149
      ]
    ],
    "extraction": [
      894,
      142
    ],
    "ammo": [
      510,
      397
    ],
    "posts": [
      [
        280,
        500
      ],
      [
        371,
        431
      ],
      [
        435,
        393
      ],
      [
        513,
        369
      ],
      [
        687,
        289
      ],
      [
        758,
        280
      ],
      [
        817,
        235
      ],
      [
        879,
        184
      ],
      [
        944,
        138
      ]
    ],
    "checkpoints": [
      [
        330,
        450,
        31,
        "LOWER RIDGE"
      ],
      [
        748,
        289,
        32,
        "FJORD OVERLOOK"
      ],
      [
        895,
        146,
        33,
        "UPPER RIDGE"
      ]
    ]
  },
  {
    "number": 3,
    "title": "The Supply Route",
    "kind": "convoy",
    "environment": "blizzard",
    "seed": 19400501,
    "summary": "Escort ammunition across the icy pass; keep the supply cart safe.",
    "insertion": [
      [
        104,
        583
      ],
      [
        89,
        601
      ],
      [
        121,
        599
      ]
    ],
    "route": [
      [
        124,
        560
      ],
      [
        221,
        512
      ],
      [
        346,
        444
      ],
      [
        477,
        387
      ],
      [
        574,
        341
      ],
      [
        598,
        330
      ],
      [
        647,
        330
      ],
      [
        742,
        270
      ],
      [
        829,
        207
      ],
      [
        904,
        146
      ]
    ],
    "extraction": [
      898,
      140
    ],
    "ammo": [
      466,
      392
    ],
    "posts": [
      [
        293,
        510
      ],
      [
        390,
        427
      ],
      [
        498,
        394
      ],
      [
        553,
        318
      ],
      [
        684,
        299
      ],
      [
        735,
        254
      ],
      [
        817,
        220
      ],
      [
        876,
        195
      ],
      [
        924,
        180
      ],
      [
        819,
        317
      ]
    ],
    "convoy": [
      [
        127,
        559
      ],
      [
        221,
        512
      ],
      [
        346,
        444
      ],
      [
        477,
        387
      ],
      [
        574,
        341
      ],
      [
        598,
        330
      ],
      [
        647,
        330
      ],
      [
        742,
        270
      ],
      [
        829,
        207
      ],
      [
        898,
        145
      ]
    ]
  },
  {
    "number": 4,
    "title": "Guns Above the Fjord",
    "kind": "demolition",
    "environment": "cliffs",
    "seed": 19400514,
    "summary": "Destroy both fjord batteries and escape.",
    "insertion": [
      [
        921,
        563
      ],
      [
        908,
        583
      ],
      [
        937,
        581
      ]
    ],
    "route": [
      [
        921,
        563
      ],
      [
        831,
        500
      ],
      [
        758,
        420
      ],
      [
        667,
        333
      ],
      [
        598,
        330
      ],
      [
        515,
        299
      ],
      [
        427,
        267
      ],
      [
        333,
        229
      ],
      [
        246,
        223
      ],
      [
        255,
        145
      ],
      [
        320,
        92
      ]
    ],
    "extraction": [
      318,
      93
    ],
    "ammo": [
      539,
      296
    ],
    "posts": [
      [
        892,
        505
      ],
      [
        823,
        464
      ],
      [
        750,
        436
      ],
      [
        692,
        353
      ],
      [
        575,
        293
      ],
      [
        492,
        280
      ],
      [
        399,
        251
      ],
      [
        316,
        239
      ],
      [
        205,
        210
      ],
      [
        172,
        250
      ],
      [
        294,
        144
      ],
      [
        259,
        104
      ]
    ],
    "targets": [
      [
        829,
        406,
        66,
        51,
        10,
        "COASTAL GUN A"
      ],
      [
        135,
        146,
        67,
        51,
        10,
        "COASTAL GUN B"
      ]
    ]
  },
  {
    "number": 5,
    "title": "Narvik Harbour",
    "kind": "rescue",
    "environment": "harbour",
    "seed": 19400522,
    "summary": "Destroy the signal hut, rescue stranded sailors, and evacuate at the docks.",
    "insertion": [
      [
        921,
        570
      ],
      [
        907,
        591
      ],
      [
        936,
        588
      ]
    ],
    "route": [
      [
        921,
        570
      ],
      [
        839,
        523
      ],
      [
        763,
        444
      ],
      [
        668,
        333
      ],
      [
        591,
        330
      ],
      [
        517,
        297
      ],
      [
        419,
        270
      ],
      [
        310,
        234
      ],
      [
        241,
        212
      ],
      [
        181,
        178
      ],
      [
        127,
        118
      ]
    ],
    "extraction": [
      128,
      117
    ],
    "ammo": [
      475,
      291
    ],
    "posts": [
      [
        859,
        526
      ],
      [
        793,
        488
      ],
      [
        832,
        437
      ],
      [
        748,
        421
      ],
      [
        666,
        307
      ],
      [
        557,
        291
      ],
      [
        478,
        267
      ],
      [
        366,
        255
      ],
      [
        282,
        222
      ],
      [
        237,
        256
      ],
      [
        182,
        203
      ],
      [
        203,
        137
      ]
    ],
    "targets": [
      [
        824,
        443,
        60,
        50,
        10,
        "SIGNAL HUT"
      ]
    ],
    "rescue": [
      278,
      234
    ]
  },
  {
    "number": 6,
    "title": "Last Ships from Norway",
    "kind": "finale",
    "environment": "siege",
    "seed": 19400607,
    "summary": "Silence three defences, hold the evacuation pier, then board the final ship.",
    "insertion": [
      [
        928,
        563
      ],
      [
        911,
        584
      ],
      [
        942,
        587
      ]
    ],
    "route": [
      [
        928,
        563
      ],
      [
        849,
        511
      ],
      [
        749,
        417
      ],
      [
        661,
        330
      ],
      [
        595,
        330
      ],
      [
        517,
        290
      ],
      [
        422,
        269
      ],
      [
        318,
        252
      ],
      [
        263,
        201
      ],
      [
        275,
        139
      ],
      [
        137,
        115
      ]
    ],
    "extraction": [
      130,
      112
    ],
    "hold": [
      275,
      137
    ],
    "ammo": [
      545,
      287
    ],
    "posts": [
      [
        888,
        515
      ],
      [
        816,
        485
      ],
      [
        748,
        433
      ],
      [
        697,
        353
      ],
      [
        669,
        295
      ],
      [
        550,
        299
      ],
      [
        487,
        270
      ],
      [
        430,
        243
      ],
      [
        388,
        200
      ],
      [
        313,
        222
      ],
      [
        236,
        222
      ],
      [
        183,
        227
      ],
      [
        175,
        298
      ],
      [
        311,
        107
      ],
      [
        251,
        107
      ],
      [
        395,
        119
      ]
    ],
    "targets": [
      [
        833,
        414,
        67,
        53,
        12,
        "EAST BLOCKHOUSE"
      ],
      [
        438,
        174,
        67,
        53,
        12,
        "MIDWAY BATTERY"
      ],
      [
        146,
        157,
        67,
        53,
        14,
        "HARBOUR GUN"
      ]
    ]
  }
];
if(missions.length!==6||missions.some((m,i)=>m.number!==i+1))throw Error('Invalid Norway campaign');
root.GREEN_DAWN_NORWAY={missions,byNumber(n){return missions[n-1]||null},available:6};
})(typeof window!=='undefined'?window:globalThis);
