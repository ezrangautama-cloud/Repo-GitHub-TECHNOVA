<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Midtrans Merchant Configuration
    |--------------------------------------------------------------------------
    |
    | Kredensial dan pengaturan environment untuk integrasi Midtrans Snap & Core API.
    |
    */

    'merchant_id' => env('MIDTRANS_MERCHANT_ID', ''),
    'client_key' => env('MIDTRANS_CLIENT_KEY', ''),
    'server_key' => env('MIDTRANS_SERVER_KEY', ''),

    'is_production' => (bool) env('MIDTRANS_IS_PRODUCTION', false),
    'is_sanitized' => (bool) env('MIDTRANS_IS_SANITIZED', true),
    'is_3ds' => (bool) env('MIDTRANS_IS_3DS', true),

    'snap_url' => env(
        'MIDTRANS_SNAP_URL',
        env('MIDTRANS_IS_PRODUCTION', false)
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions'
    ),

    'snap_js_url' => env(
        'MIDTRANS_SNAP_JS_URL',
        env('MIDTRANS_IS_PRODUCTION', false)
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js'
    ),

    'api_url' => env(
        'MIDTRANS_API_URL',
        env('MIDTRANS_IS_PRODUCTION', false)
            ? 'https://api.midtrans.com'
            : 'https://api.sandbox.midtrans.com'
    ),
];
