<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QrcodeController extends Controller
{
    public function qrPayload(Request $request)
    {
        $cipher = encrypt($request->user()->id);   // ex. eyJpdiI6Ij…==
        return response()->json(['payload' => $cipher]);
    }
}
