<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Committee;
use App\Models\CommitteeOffer;
use App\Models\Offer;
use App\Models\Role;
use App\Models\Scan;
use App\Models\User;
use App\Policies\CategoryPolicy;
use App\Policies\CommitteeOfferPolicyPolicy;
use App\Policies\committeePolicy;
use App\Policies\OfferPolicy;
use App\Policies\RolePolicy;
use App\Policies\ScanPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Category::class       => CategoryPolicy::class,
        Committee::class      => committeePolicy::class,
        Offer::class          => OfferPolicy::class,
        Scan::class           => ScanPolicy::class,
        CommitteeOffer::class => CommitteeOfferPolicyPolicy::class,
        Role::class           => RolePolicy::class,
        User::class           => UserPolicy::class,
    ];
}
