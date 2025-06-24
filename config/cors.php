<?php

return [

    // Cross-Origin Resource Sharing (CORS) Configuration

    'paths'              => ['api/*','sanctum/csrf-cookie'],

    'allowed_methods'    => ['*'],

    'allowed_origins'    => [
        'http://localhost:5173',
        'http://192.168.1.17:5173',
        'http://192.168.1.220:5174',
        'http://localhost:5174',
        // ajoutez ici toutes les URLs front
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers'    => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials'=> true,
];
