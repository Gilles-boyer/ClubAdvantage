<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

    // 1. Routes WEB
    $middleware->web();

    // 2. Routes API
    $middleware->api(prepend: [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class // optionnel pour validations
    ]);

    // 3. Alias
    $middleware->alias([
        'auth:sanctum' => \Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'abilities'    => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
        'ability'      => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
    ]);
})
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
