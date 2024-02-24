import { db } from "@/app/_lib/prisma"
import BarbershopInfo from "./_components/barbershop-info"
import ServiceItem from "./_components/service-item"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"



interface BarbershopDetailsPageProps {
    params: any
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions)
    if (!params.id) {
        // TODO:
        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            Service: true
        }
    })

    if (!barbershop) {
        // TODO:
        return null
    }

    return (
        <div className="md:container mx-auto ">
            <BarbershopInfo barbershop={barbershop} />
            <div className="px-5 flex flex-col gap-4 py-6 md:grid md:grid-cols-2">
                {
                    barbershop.Service.map((service) => 
                        <div key={service.id} className="md:w-[380px] xl:w-[520px]">
                            <ServiceItem  barbershop={barbershop} service={service} isAuthenticated={!!session?.user}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BarbershopDetailsPage