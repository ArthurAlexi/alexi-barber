'use client'

import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/app/_components/ui/sheet"
import { Barbershop, Service } from "@prisma/client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { generateDayTimeList } from "../_helpers/hours"
import { format } from "date-fns"

interface ServiceItemProps {
    barbershop: Barbershop
    service: Service
    isAuthenticated: boolean
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>()
    const [hour, setHour] = useState<String | undefined>()

    const handleBookingClick = () => {
        if (isAuthenticated) {

        } else {
            return signIn('google')
        }
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    };

    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date])

    return (
        <Card>
            <CardContent className="p-3 w-full">
                <div className="flex gap-4 items-center w-full">
                    <div className="relative min-w-[110px] min-h-[110px] max-w-[110px] max-h-[110px]">
                        <Image src={service.imageUrl} alt={service.name} fill style={{ objectFit: 'contain' }}
                            className="rounded-lg " />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="tex-sm text-gray-400">{service.description}</p>
                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price))}
                            </p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="text-primary" variant='secondary' onClick={handleBookingClick}>reserve</Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        make a reservation
                                    </SheetHeader>
                                    <div className="px-5 py-6">
                                        {/* react dayPicker */}
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize"
                                                }
                                            }}
                                        />
                                    </div>
                                    {date && (
                                        <div className="flex gap-3 px-5 py-6 border-t border-solid border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                            {
                                                timeList.map((time) => <Button
                                                    key={time}
                                                    variant={
                                                        hour === time ? 'default' : 'outline'
                                                    }
                                                    className="rounded-full"
                                                    onClick={() => handleHourClick(time)}>
                                                    {time}</Button>)
                                            }
                                        </div>
                                    )}

                                    <div className="py-6 px-5 border-solid border-secondary">
                                        <Card>
                                            <CardContent className="p-3 flex flex-col gap-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="font-bold text-sm">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(Number(service.price))}
                                                    </h3>
                                                </div>
                                                {
                                                    date && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400">Date</h3>
                                                            <h4 className="text-sm capitalize">{format(date, "do',' MMMM")}</h4>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    hour && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400">Hour</h3>
                                                            <h4 className="text-sm capitalize">{hour}</h4>
                                                        </div>
                                                    )
                                                }
                                                <div className="flex justify-between">
                                                            <h3 className="text-gray-400">Barbershop</h3>
                                                            <h4 className="text-sm capitalize">{barbershop.name}</h4>
                                                        </div>
                                                <div className="flex justify-between"></div>
                                            </CardContent>
                                        </Card>              
                                    </div>
                                    <SheetFooter className="px-5">
                                                <Button disabled={!hour || !date}>Confirm</Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem