"use client"

import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Booking, Prisma } from "@prisma/client"
import { format, isPast } from "date-fns"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import { cancelBooking } from "../_actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { AlertDialog, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true
        }
    }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)
    const isBookingFineshed = isPast(booking.date)
    const handleCancelClick = async () => {
        setIsDeleteLoading(true)
        try {
            await cancelBooking(booking.id)
            toast.success('Book canceled successfully!')
        } catch (err) {
            console.error(err)
        } finally {
            setIsDeleteLoading(false)
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full">
                    <CardContent className="py-0 flex  px-0">
                        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                            <Badge className="w-fit" variant={isBookingFineshed ? 'secondary' : 'default'}>{isBookingFineshed ? 'Finished' : 'confirmed'}</Badge>
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
            </SheetTrigger>
            <SheetContent className="px-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle>Booking information</SheetTitle>
                </SheetHeader>
                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src={'/barbershop-map'} alt="barbershop location" fill />
                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card className="">
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl} alt={booking.barbershop.name} />
                                    </Avatar>
                                    <div className="">
                                        <h2 className="font-bold">{booking.barbershop.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Badge className="w-fit my-3" variant={isBookingFineshed ? 'secondary' : 'default'}>
                        {isBookingFineshed ? 'Finished' : 'confirmed'}
                    </Badge>
                    <Card>
                        <CardContent className="p-3 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <h2 className="font-bold">{booking.service.name}</h2>
                                <h3 className="font-bold text-sm">
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(Number(booking.service.price))}
                                </h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400">Date</h3>
                                <h4 className="text-sm capitalize">{format(booking.date, "do',' MMMM")}</h4>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400">Hour</h3>
                                <h4 className="text-sm capitalize">{format(booking.date, 'hh:mm')}</h4>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-400">Barbershop</h3>
                                <h4 className="text-sm capitalize">{booking.barbershop.name}</h4>
                            </div>
                            <div className="flex justify-between"></div>
                        </CardContent>
                    </Card>
                    <SheetFooter className="flex-row w-full gap-3 mt-6">
                        <SheetClose asChild>
                            <Button className="w-full" variant='secondary'> Back </Button>
                        </SheetClose>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full" variant='destructive' disabled={isBookingFineshed || isDeleteLoading}>
                                    cancel booking
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%]">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>are you sure you want to cancel?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Once cancelled, you will not be able to cancel this action
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3">
                                    <AlertDialogAction className="w-full" onClick={handleCancelClick}>
                                        {
                                            isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        }
                                        Confirm
                                    </AlertDialogAction>
                                    <AlertDialogCancel className="w-full mt-0">Back</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BookingItem