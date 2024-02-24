import BarbershopItem from "../(home)/_components/barbershop-item"
import Search from "../(home)/_components/search"
import { db } from "../_lib/prisma"
import { redirect } from "next/navigation"

interface BarbershopsPageProps{
    searchParams: {
        search ?: string
    }
}

const BarbershopsPage = async ({searchParams} : BarbershopsPageProps) => {

    
    if(!searchParams.search) return redirect('/')

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive',
            }
        }
    })
    return (
        <div className="md:container mx-auto">
            <div className="px-5 py-6 flex flex-col justify-center items-center  gap-6">
                <div className="min-w-[70%]">
                    <Search defaultValues={{
                        search: searchParams.search
                    }}/>
                </div>
                <h1 className="text-gray-400 font-bold text-xl uppercase"> Results to &quot;{searchParams.search}&quot;</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
                    {
                        barbershops.map((barbershop) => (
                            <div className="w-full" key={barbershop.id}>
                                <BarbershopItem  barbershop={barbershop} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BarbershopsPage