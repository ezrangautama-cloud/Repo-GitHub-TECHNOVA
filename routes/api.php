<?php

use App\Http\Controllers\Api\CalculatorController;
use App\Http\Controllers\Api\ContactLeadController;
use App\Http\Controllers\Api\DigitalProductController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Homepage Routes
Route::get('/home', [HomeController::class, 'index']);

// Service Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Digital Products Routes
Route::get('/digital-products', [DigitalProductController::class, 'index']);
Route::get('/digital-products/{id}', [DigitalProductController::class, 'show']);
Route::get('/digital-products/{id}/download', [DigitalProductController::class, 'download']);

// Calculator Routes
Route::prefix('tools')->group(function () {
    Route::get('/electrical/presets', [CalculatorController::class, 'electricalPresets']);
    Route::get('/solar/presets', [CalculatorController::class, 'solarPresets']);
    Route::get('/led-resistor/presets', [CalculatorController::class, 'ledResistorPresets']);
    Route::post('/calculate/electrical', [CalculatorController::class, 'calculateElectrical']);
    Route::post('/calculate/solar', [CalculatorController::class, 'calculateSolar']);
    Route::post('/calculate/led-resistor', [CalculatorController::class, 'calculateLedResistor']);
});

// Contact WhatsApp Routes
Route::post('/contact', [ContactLeadController::class, 'store']);
Route::post('/contact/quick-whatsapp', [ContactLeadController::class, 'quickUrl']);
