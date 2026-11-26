<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CalculatorController;
use App\Http\Controllers\Api\DigitalProductController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ServiceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Homepage & Portfolios Routes
Route::get('/home', [HomeController::class, 'index']);
Route::get('/portfolios', [HomeController::class, 'portfolios']);

// Service & Course Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/services/request', [ServiceController::class, 'requestService']);
Route::get('/courses', [ServiceController::class, 'courses']);

// Digital Products Routes
Route::get('/digital-products', [DigitalProductController::class, 'index']);
Route::get('/digital-products/{id}', [DigitalProductController::class, 'show']);
Route::get('/digital-products/{id}/download', [DigitalProductController::class, 'download']);

// Calculator Routes
Route::prefix('tools')->group(function () {
    Route::get('/electrical/presets', [CalculatorController::class, 'electricalPresets']);
    Route::get('/solar/presets', [CalculatorController::class, 'solarPresets']);
    Route::post('/calculate/electrical', [CalculatorController::class, 'calculateElectrical']);
    Route::post('/calculate/solar', [CalculatorController::class, 'calculateSolar']);
});
