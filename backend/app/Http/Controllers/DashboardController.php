<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            $hotels = \App\Models\Tenant::with(['rooms'])->get();
            $totalHotels = $hotels->count();
            $totalRooms = \App\Models\Room::count();
            $totalManagers= \App\Models\User::where('role', 'manager')->count();
            $totalGuests = \App\Models\Guest::count();

            return \Inertia\Inertia::render('dashboard', [
                
            ]);
        }
    }

}
