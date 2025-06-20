import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getCarFilters() {
    try {
         const makes = await db.car.findMany({
          where: { status: "AVAILABLE" },
          select: { make: true },
          distinct: ["make"],
          orderBy: { make: "asc" },
         });

         const bodyTypes = await db.car.findMany({
            where: { status: "AVAILABLE" },
            select: { bodyType: true },
            distinct: ["bodyType"],
            orderBy: { bodyType: "asc" },
          });

          const fuelTypes = await db.car.findMany({
              where: { status: "AVAILABLE" },
              select: { fuelType: true },
              distinct: ["fuelType"],
              orderBy: { fuelType: "asc" },
          });

          const transmissions = await db.car.findMany({
                where: { status: "AVAILABLE" },
                select: { transmission: true },
                distinct: ["transmission"],
                orderBy: { transmission: "asc" },
          });

          const priceAggregations = await db.car.aggregate({
                 where: { status: "AVAILABLE" },
                 _min: { price: true },
                 _max: { price: true },
          });

          return {
            success: true,
            data: {
              makes: makes.map((item) => item.make),
              bodyTypes: bodyTypes.map((item) => item.bodyType),
              fuelTypes: fuelTypes.map((item) => item.fuelType),
              transmissions: transmissions.map((item) => item.transmission),
              priceRange: {
                min: priceAggregations._min.price
                  ? parseFloat(priceAggregations._min.price.toString())
                  : 0,
                max: priceAggregations._max.price
                  ? parseFloat(priceAggregations._max.price.toString())
                  : 100000,
              },
            },
          };
    } catch (error) {
        throw new Error("Error fetching car filters:" + error.message);
    }
}

export async function getCars ({
  search = "",
  make = "",
  bodyType = "",
  fuelType = "",
  transmission = "",
  minPrice = 0,
  maxPrice = Number.MAX_SAFE_INTEGER,
  sortBy = "newest", 
  page = 1,
  limit = 6,
}) {
    try {
        const { userId } = await auth();
    let dbUser = null;

    if (userId) {
      dbUser = await db.user.findUnique({
        where: { clerkUserId: userId },
      });
    }
    } catch (error) {
        
    }
}