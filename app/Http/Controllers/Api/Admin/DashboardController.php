<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PesanLead;
use App\Models\Portofolio;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get summary metrics and recent activity for the Admin Dashboard.
     */
    public function index(): JsonResponse
    {
        $totalLeads = PesanLead::count();
        $newLeads = PesanLead::where('status_lead', 'New')->count();
        $followUpLeads = PesanLead::where('status_lead', 'Follow Up')->count();
        $closedLeads = PesanLead::where('status_lead', 'Closed')->count();

        $totalTransactions = Transaksi::count();
        $paidStatuses = ['success', 'settlement', 'capture'];
        $paidTransactions = Transaksi::whereIn('status_pembayaran', $paidStatuses)->count();
        $pendingTransactions = Transaksi::where('status_pembayaran', 'pending')->count();
        $failedTransactions = Transaksi::whereIn('status_pembayaran', ['failed', 'expire', 'expired', 'cancel', 'cancelled', 'deny'])->count();
        $totalRevenue = (float) Transaksi::whereIn('status_pembayaran', $paidStatuses)->sum('total_harga');

        $totalCourses = Produk::whereHas('kategori', function ($q): void {
            $q->where('nama_kategori', 'Courses');
        })->count();

        $totalDigitalProducts = Produk::whereHas('kategori', function ($q): void {
            $q->where('nama_kategori', 'Digital Products');
        })->count();

        $totalProjectProducts = Produk::whereHas('kategori', function ($q): void {
            $q->where('nama_kategori', 'Projects');
        })->count();

        $totalServices = Produk::whereHas('kategori', function ($q): void {
            $q->whereNotIn('nama_kategori', ['Courses', 'Digital Products', 'Projects']);
        })->count();

        $totalPortofolios = Portofolio::count();

        $totalCustomers = User::where('role', 'Customer')->count();
        $totalAdmins = User::where('role', 'Admin')->count();

        $recentLeads = PesanLead::latest()->take(5)->get();
        $recentTransactions = Transaksi::with(['user:id,name,email'])
            ->latest('tanggal_transaksi')
            ->take(5)
            ->get();

        return response()->json([
            'message' => 'Admin dashboard summary retrieved successfully.',
            'data' => [
                'leads' => [
                    'total' => $totalLeads,
                    'new' => $newLeads,
                    'follow_up' => $followUpLeads,
                    'closed' => $closedLeads,
                ],
                'transactions' => [
                    'total' => $totalTransactions,
                    'paid' => $paidTransactions,
                    'pending' => $pendingTransactions,
                    'failed' => $failedTransactions,
                    'total_revenue' => $totalRevenue,
                ],
                'catalog' => [
                    'total_courses' => $totalCourses,
                    'total_digital_products' => $totalDigitalProducts,
                    'total_project_products' => $totalProjectProducts,
                    'total_services' => $totalServices,
                    'total_portofolios' => $totalPortofolios,
                ],
                'users' => [
                    'total_customers' => $totalCustomers,
                    'total_admins' => $totalAdmins,
                ],
                'recent_leads' => $recentLeads,
                'recent_transactions' => $recentTransactions,
            ],
        ]);
    }
}
