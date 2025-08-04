<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = Tenant::orderBy('created_at', 'desc')->get();

        return Inertia::render('hotels', [
            'hotels' => $hotels,
        ]);
    }

    public function store(Request $request) 
    {
        $data = $request->validate([
            'hotel_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:255',
        ]);

        $hotel = Tenant::create($data);
        return redirect()->route('hotels.index');

    }

    
}
