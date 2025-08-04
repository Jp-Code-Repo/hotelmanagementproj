


import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Users, Bed, CalendarCheck2, Building2, UserCog } from 'lucide-react';
import React, { useState } from 'react';

interface Room {
    room_id: number;
    room_number: string;
    type: string;
    price_per_night: string;
    status: string;
}

interface Hotel {
    tenant_id: number;
    hotel_name: string;
    address: string;
    contact_number: string;
    rooms: Room[];
}

export default function Dashboard() {
    const { isAdmin, hotels, hotel, guestsCount, roomsCount, bookingsCount, totalHotels, totalRooms, totalManagers, totalGuests, auth } = usePage().props as unknown as any;
    const user = auth?.user;
    if (user?.role === 'manager' && !user?.tenant_id) {
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
                <Head title="Dashboard" />
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-xl font-bold text-gray-600">
                        You are not a manager of any hotel yet.
                    </h1></div></AppLayout>);
    }

    const [open, setOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

    const handleHotelClick = (hotel: Hotel) => {
        setSelectedHotel(hotel);
        setOpen(true);
    };

    if (isAdmin) {
        const safeHotels: Hotel[] = Array.isArray(hotels) ? hotels : [];
        return (
            <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
                <Head title="Admin Dashboard" />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">All Hotels Overview</h1>{/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="p-6 text-center bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                            <Building2 className="mx-auto mb-2 text-blue-500" size={32} />
                            <div className="text-lg font-semibold mb-2">Total Hotels</div><div className="text-3xl font-bold">{totalHotels ?? 0}</div></Card><Card className="p-6 text-center bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                            <Bed className="mx-auto mb-2 text-green-500" size={32} />
                            <div className="text-lg font-semibold mb-2">Total Rooms</div><div className="text-3xl font-bold">{totalRooms ?? 0}</div></Card><Card className="p-6 text-center bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                            <UserCog className="mx-auto mb-2 text-purple-500" size={32} />
                            <div className="text-lg font-semibold mb-2">Total Managers</div><div className="text-3xl font-bold">{totalManagers ?? 0}</div></Card><Card className="p-6 text-center bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                            <Users className="mx-auto mb-2 text-yellow-500" size={32} />
                            <div className="text-lg font-semibold mb-2">Total Guests</div><div className="text-3xl font-bold">{totalGuests ?? 0}</div></Card></div>{/* Hotels Table/Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {safeHotels.map((hotel: Hotel) => (
                            <button key = {hotel.tenant_id}
                        className="text-left w-full focus:outline-none"
                        onClick={() => handleHotelClick(hotel)}
                        type="button"
                    >
                        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="flex items-center mb-2">
                                <Building2 className="mr-2 text-blue-500" />
                                <span className="text-lg font-semibold">{hotel.hotel_name}</span></div></Card></button>
                        ))}
                </div>{/* Hotel Details Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedHotel?.hotel_name}</DialogTitle><DialogDescription>
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Address: {selectedHotel?.address}</div><div className="mb-2 text-sm text-gray-600 dark:text-gray-300">Contact: {selectedHotel?.contact_number}</div><div className="font-medium mb-1">Rooms:</div><ul className="ml-4 list-disc">
                                    {selectedHotel?.rooms && selectedHotel.rooms.length > 0 ? (
                                        selectedHotel.rooms.map((room: Room) => (
                                            <li key={room.room_id} className="flex items-center text-sm mb-1">
                                                <Bed className="mr-1 text-green-500" size={16} />
                                                Room {room.room_number} - {room.type} - {room.status} - ${room.price_per_night}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-xs text-gray-400">No rooms</li>)}
                                </ul>
                            </DialogDescription></DialogHeader><DialogClose />
                    </DialogContent></Dialog></div>
</AppLayout >
        );
    }

    const safeHotel: Hotel | undefined = hotel;
    const safeGuestsCount = guestsCount || 0;
    const safeRoomsCount = roomsCount || 0;
    const safeBookingsCount = bookingsCount || 0;
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">{safeHotel && safeHotel.hotel_name ? safeHotel.hotel_name : 'Hotel Dashboard'}</h1><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center">
                        <Users className="mx-auto mb-2 text-blue-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Guests</div><div className="text-3xl font-bold">{safeGuestsCount}</div></Card><Card className="p-6 text-center">
                        <Bed className="mx-auto mb-2 text-green-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Rooms</div><div className="text-3xl font-bold">{safeRoomsCount}</div></Card><Card className="p-6 text-center">
                        <CalendarCheck2 className="mx-auto mb-2 text-purple-500" size={32} />
                        <div className="text-lg font-semibold mb-2">Total Bookings</div><div className="text-3xl font-bold">{safeBookingsCount}</div></Card></div></div></AppLayout>);
}



 