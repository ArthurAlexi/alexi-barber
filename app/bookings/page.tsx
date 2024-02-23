import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"
import BookingList from "./_components/booking-list"
import { isFuture, isPast } from "date-fns"
import BookingItem from "../_components/booking-item"


const Bookings = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return redirect('/')
    }

    // const confirmedBookings = bookings.filter(booking => { isFuture(booking.date) })
    // const finishededBookings = bookings.filter(booking => { isPast(booking.date) })

    const [confirmedBookings, finishededBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        })
    ])

    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <h1 className="text-xl font-bold">Schedules</h1>
                {
                    confirmedBookings.length > 0 && <h2 className="font-bold text-gray-400 uppercase text-sm mt-6 mb-3">confirmed</h2>
                }
                <div className="flex flex-col gap-3">
                    {
                        confirmedBookings.map((booking) => (
                            <BookingItem booking={booking} key={booking.id} />
                        ))
                    }
                </div>
                {
                    finishededBookings.length > 0 && <h2 className="font-bold text-gray-400 uppercase text-sm mt-6 mb-3">Finished</h2>
                }
                <div className="flex flex-col gap-3">
                    {
                        finishededBookings.map((booking) => (
                            <BookingItem booking={booking} key={booking.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Bookings