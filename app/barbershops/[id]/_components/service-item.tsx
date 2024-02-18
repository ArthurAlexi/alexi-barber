'use client'

import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Service } from "@prisma/client"
import { signIn } from "next-auth/react"
import Image from "next/image"

interface ServiceItemProps {
    service: Service
    isAuthenticated : boolean
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
    
    const handleBookingClick = ()=> {
        if(isAuthenticated){

        }else{
            return signIn('google')
        }
    }
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
                            <Button className="text-primary" variant='secondary' onClick={handleBookingClick}>reserve</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceItem