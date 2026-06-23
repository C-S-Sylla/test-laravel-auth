<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful; // <--- AJOUTE CET IMPORT

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        // 1. OBLIGATOIRE : On retire le middleware de session/cookies de Sanctum pour l'API
        $middleware->api(remove: [
            EnsureFrontendRequestsAreStateful::class,
        ]);

        // 2. Par sécurité : on exclut l'API du CSRF
        $middleware->validateCsrfTokens(except: [
            'api/*',
            'api/auth/*',
            'auth/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();