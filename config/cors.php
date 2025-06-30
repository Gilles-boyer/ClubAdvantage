<?php

return [

    // Cross-Origin Resource Sharing (CORS) Configuration

    'paths'              => ['api/*','api/stats','login', 'logout', 'sanctum/csrf-cookie', '/auth/validate'],

    'allowed_methods'    => ['*'],

    'allowed_origins'    => [
        'http://localhost:5173',
        'http://192.168.1.17:5173',
        'http://192.168.1.27:5173',
        'http://192.168.1.28:5173',
        'http://192.168.1.220:5173',
        'http://localhost:5173',
        'https://club-avantage.clicksolutions.re'
        // ajoutez ici toutes les URLs front
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers'    => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials'=> true,
];
