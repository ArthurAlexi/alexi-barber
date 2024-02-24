import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"
import BookingList from "./_components/booking-list"
import BookingItem from "../_components/booking-item"
import { authOptions } from "../_lib/auth"


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

        <div className="px-5 py-6 md:container mx-auto">
            <h1 className="text-xl font-bold mb-6">Schedules</h1>
            {
                confirmedBookings.length > 0 &&
                <>
                    <h2 className="font-bold text-gray-400 uppercase text-sm mb-3">confirmed</h2>
                    <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                        {
                            confirmedBookings.map((booking) => (
                                <div key={booking.id} className="md:w-[380px] xl:w-[520px]">
                                    <BookingItem booking={booking} />
                                </div>
                            ))
                        }
                    </div>
                </>
            }

            {
                finishededBookings.length > 0 &&
                <>
                    <h2 className="font-bold text-gray-400 uppercase text-sm mt-6 mb-3">Finished</h2>
                    <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                        {
                            finishededBookings.map((booking) => (
                                <div key={booking.id} className="md:w-[380px] xl:w-[520px]">
                                    <BookingItem booking={booking} />
                                </div>
                            ))
                        }
                    </div>
                </>
            }

        </div>

    )
}

export default Bookings