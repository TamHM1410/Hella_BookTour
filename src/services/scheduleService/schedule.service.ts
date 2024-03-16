import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ScheduleService {
  getSchedule = async (tourGuideId: string) => {
    try {
      await prisma.$connect;
      const dataPayment = await prisma.payment.findMany();
      const validPayments = Array.from(
        new Set(dataPayment.map((payment) => payment.status))
      );
      if (validPayments.includes(true)) {
        const bookingIds = Array.from(
          new Set(dataPayment.map((payment) => payment.bookingId))
        );
        const bookings = await prisma.booking.findMany({
          where: {
            id: {
              in: bookingIds,
            },
          },
        });
        const tripIds = Array.from(
          new Set(bookings.map((booking) => booking.tripId))
        );
        const trips = await prisma.trip.findMany({
          where: {
            id: {
              in: tripIds,
            },
          },
        });
        const filteredTrips = trips.filter(
          (trip) => trip.tourGuideId === tourGuideId
        );
        return {
          status: "Success!",
          statusCode: 201,
          data: filteredTrips,
        };
      } else {
        return { message: "No valid payments found.", statusCode: 404 };
      }
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
      };
    }
  };
}

export const scheduleService = new ScheduleService();
