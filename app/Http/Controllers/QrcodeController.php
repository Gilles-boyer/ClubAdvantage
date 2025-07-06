<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class QrcodeController extends Controller
{
    public function qrPayload(Request $request)
{
    $payload = Crypt::encryptString($request->user()->id);
    return response()->json(['payload' => $payload]);
}
}
