import { format } from "date-fns"
import { ptBR, enUS } from "date-fns/locale";
import Search from "./_components/search";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import BookingList from "../bookings/_components/booking-list";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [recommendedBarbershops, barbershops, confimedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: 'asc',
      },
    }),
    session?.user ? await db.booking.findMany({
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
    }) : Promise.resolve([])
  ])

  return (
    <div className="md:container mx-auto">
      <div className="px-5 pt-5">
        
        <h2 className="text-xl font-bold"> Hello, {session?.user ?  session.user?.name.split(' ')[0] : 'welcome'} ! </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' MMMM do", {
            locale: enUS
          })}
        </p>
      </div>
      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        {
          confimedBookings.length > 0 &&
          <>
            <h2 className="pl-6 text-sm mb-3 uppercase text-gray-400 text-bold">Schedules</h2>
            <div className="px-5 flex  gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {
                confimedBookings.map((booking) => (
                  // <BookingItem booking={booking} key={booking.id} />
                  <div className="min-w-[350px] md:w-[420px]" key={booking.id}>
                    <BookingItem booking={booking}  />
                  </div>
                ))
              }
            </div>
          </>
        }
        {/* <BookingList bookings={confimedBookings} /> */}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-sm mb-3 uppercase text-gray-400 text-bold">recommended</h2>
        <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {
            recommendedBarbershops.map((barbershop) => 
            <div className="min-w-[167px] max-w-[167px]" key={barbershop.id}>
              <BarbershopItem  barbershop={barbershop} />
            </div>
            )
          }
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-sm mb-3 uppercase text-gray-400 text-bold">Popular</h2>
        <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop) => 
              <div className="min-w-[167px] max-w-[167px]" key={barbershop.id}>
                <BarbershopItem  barbershop={barbershop} />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
