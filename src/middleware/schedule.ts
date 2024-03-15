import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Schedule {
  getSchedule = async (req: Request, res: Response) => {
    try {        
      await prisma.$connect;
      const dataPayment = await prisma.payment.findMany();
      const validPayments = Array.from(new Set(dataPayment.map(payment => payment.status)))  
      if (validPayments.includes(true)) {
        const bookingIds = Array.from(new Set(dataPayment.map(payment => payment.bookingId)));
        const bookings = await prisma.booking.findMany({
          where: {
            id: {
              in: bookingIds,
            },
          },
        });
        const tripIds = Array.from(new Set(bookings.map(booking => booking.tripId)));
        const trips = await prisma.trip.findMany({
            where: {
              id: {
                in: tripIds,
              },
            },
          });
        const { tourGuideId } = req.params;   
        const filteredTrips = trips.filter(trip => trip.tourGuideId === tourGuideId);
        res.json(filteredTrips);
      } else {
        res.status(404).json({
          message: "No valid payments found.",
          statusCode: 404
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "Internal server",
        statusCode: 500,
      });
    }
  };
}

export const schedule = new Schedule();
