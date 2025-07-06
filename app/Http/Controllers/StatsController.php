<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Models\Committee;
use App\Models\Offer;
use App\Models\User;
use App\Models\Scan;
use Carbon\Carbon;

class StatsController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth   = $now->copy()->endOfMonth();

        return response()->json([
            'cseActifs'       => Committee::where('is_active', true)->count(),
            'offresActives'   => Offer::where('is_active', true)->count(),
            'adherents'       => User::where('status', 'active')
                                      ->whereNotIn('role_name', [RoleEnum::STAFF, RoleEnum::SUPER_ADMIN])
                                      ->count(),
            'scansThisMonth'  => Scan::whereBetween('scanned_at', [$startOfMonth, $endOfMonth])
                                     ->count(),
        ]);
    }
}
