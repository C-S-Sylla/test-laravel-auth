<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        
        // CORRECTION : On change AuthController par ProfileController ici
        Route::put('/profile', [ProfileController::class, 'updateProfile']); 
        
        Route::delete('/profile', [AuthController::class, 'deleteProfile']);
        Route::post('/avatar', [ProfileController::class, 'updateAvatar']);
    });
});
