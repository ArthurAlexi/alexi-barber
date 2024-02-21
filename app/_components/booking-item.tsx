
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Booking, Prisma } from "@prisma/client"
import { format, isPast } from "date-fns"

interface BookingItemProps{
    booking : Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }>
}

const BookingItem = ({booking} : BookingItemProps) => {

    const isBookingFineshed = isPast(booking.date)

    return (
        <Card className="min-w-full">
            <CardContent className="py-0 flex  px-0">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge className="w-fit" variant={isBookingFineshed ? 'secondary' : 'default'}>{ isBookingFineshed ? 'Finished' : 'confirmed'}</Badge>
                    <h2 className="font-bold"> {booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={booking.barbershop.imageUrl} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>

                <div className=" flex flex-col flex-1 items-center justify-center border-l border-solid border-secondary">
                    <p className="text-sm capitalize">{format(booking.date, 'MMMM')} </p>
                    <p className="text-2xl">{format(booking.date, 'do')}</p>
                    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BookingItem