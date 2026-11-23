<?php

use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\LeadManagementController;
use App\Http\Controllers\Api\Admin\PortofolioManagementController;
use App\Http\Controllers\Api\Admin\ProductManagementController;
use App\Http\Controllers\Api\Admin\TransactionManagementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CalculatorController;
use App\Http\Controllers\Api\ContactLeadController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\DigitalProductController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PortofolioController;
use App\Http\Controllers\Api\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Homepage Routes
Route::get('/home', [HomeController::class, 'index']);

// Service Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Course Routes
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);

// Portofolio / Projects Routes
Route::get('/portofolios', [PortofolioController::class, 'index']);
Route::get('/portofolios/{id}', [PortofolioController::class, 'show']);

// Digital Products Routes
Route::get('/digital-products', [DigitalProductController::class, 'index']);
Route::get('/digital-products/{id}', [DigitalProductController::class, 'show']);
Route::get('/digital-products/{id}/download', [DigitalProductController::class, 'download']);

// Calculator Routes
Route::prefix('tools')->group(function (): void {
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

// Payment Notification Webhook
Route::match(['get', 'post'], '/payment/notification', [PaymentController::class, 'notification']);

// Authenticated User Routes
Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/my-contents', [AuthController::class, 'myContents']);

    Route::post('/checkout', [PaymentController::class, 'checkout']);
    Route::get('/transactions', [PaymentController::class, 'index']);
    Route::get('/transactions/{order_id}', [PaymentController::class, 'show']);
});

// Admin CMS & Management Routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function (): void {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('products', ProductManagementController::class);
    Route::apiResource('portofolios', PortofolioManagementController::class);

    Route::get('/leads', [LeadManagementController::class, 'index']);
    Route::get('/leads/{id}', [LeadManagementController::class, 'show']);
    Route::patch('/leads/{id}/status', [LeadManagementController::class, 'updateStatus']);
    Route::delete('/leads/{id}', [LeadManagementController::class, 'destroy']);

    Route::get('/transactions', [TransactionManagementController::class, 'index']);
    Route::get('/transactions/{order_id}', [TransactionManagementController::class, 'show']);
    Route::post('/transactions/{order_id}/verify-unlock', [TransactionManagementController::class, 'verifyAndUnlock']);
    Route::post('/access-rights', [TransactionManagementController::class, 'grantManualAccess']);
});
