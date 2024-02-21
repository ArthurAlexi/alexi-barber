'use client'

import BookingItem from '@/app/_components/booking-item'
import { SheetContent, SheetHeader, SheetTrigger } from '@/app/_components/ui/sheet'
import { Booking, Prisma } from '@prisma/client'
import { Sheet } from 'lucide-react'

interface BookingListProps{
    bookings : Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }> []
}

const BookingList = ({bookings} : BookingListProps) => {
    return(
        <div className='flex gap-3'>
            {
                bookings.map((booking) => (
                    <BookingItem booking={booking} key={booking.id}/>
                ))
            }
        </div>
    )
}

export default BookingList