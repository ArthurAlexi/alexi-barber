'use client'

import BookingItem from '@/app/_components/booking-item'
import { Sheet,SheetContent, SheetHeader, SheetTrigger } from '@/app/_components/ui/sheet'
import { Booking, Prisma } from '@prisma/client'

interface BookingListProps{
    bookings : Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }> []
    axis ?: 'x' | 'y'
}

const BookingList = ({bookings, axis='x' } : BookingListProps) => {
    const variant = new Map();
    variant.set('x', 'flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden w-full')
    variant.set('y','flex flex-col gap-3')

    return(
        <div className={variant.get(axis)}>
            {
                bookings.map((booking) => (
                    <Sheet key={booking.id}>
                        <SheetTrigger asChild>
                            <button style={{all: 'unset'}}>
                                <BookingItem booking={booking} />
                            </button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>Booking information</SheetHeader>
                        </SheetContent>
                    </Sheet>
                ))
            }
        </div>
    )
}

export default BookingList