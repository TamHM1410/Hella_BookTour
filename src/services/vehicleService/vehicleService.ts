import { PrismaClient } from "@prisma/client";

class VehicleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getVehicle = async () => {
    try {
      const allVehicle = await this.prisma.city.findMany();
      return allVehicle;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  };

  createNewVehicle = async (vehicleData: {
    vehicleName: string;
    status: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }) => {
    try {
      console.log("vehicle", vehicleData.vehicleName);
      const existVehicle = await this.prisma.city.findFirst({
        where: {
          cityName: vehicleData.vehicleName,
        },
      });
      if (existVehicle) {
        return {
          status: "Error",
          message: "Vehicle already Exist",
          data: "null",
        };
      }
      const newVehicle = await this.prisma.vehicle.create({
        data: {
          vehicleName: vehicleData?.vehicleName,
          status: vehicleData?.status,
          createAt: vehicleData?.createAt,
          updateAt: vehicleData?.updateAt,
          deleteAt: vehicleData?.deleteAt,
        },
      });
      return {
        status: "Success",
        message: "Create new vehicle success !",
        data: newVehicle,
      };
    } catch (error) {
      console.log(error);
    }
  };

  getCurrentVehicle = async (vehicleId: number) => {
    try {
      const currentVehicle = await this.prisma.city.findUnique({
        where: {
          id: vehicleId,
        },
      });
      return currentVehicle;
    } catch (error) {
      console.log(error);
    }
  };

  editVehicle = async (currentData: {
    id: number;
    vehicleName: string;
    status: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }) => {
    try {
      await this.prisma.vehicle.update({
        where: {
          id: currentData.id,
        },
        data: {
          vehicleName: currentData.vehicleName,
          status: currentData.status,
          updateAt: new Date(),
        },
      });
      return {
        status: "Success",
        message: "Update successfully!",
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update vehicle");
    }
  };

  deleteVehicle = async (vehicleId: number) => {
    try {
      await this.prisma.vehicle.delete({
        where: {
          id: vehicleId,
        },
      });
      return {
        status: "Success",
        message: "Delete successfully!",
      };
    } catch (error) {
      console.log(error);
    }
  };
}

export const vehicleService = new VehicleService();
