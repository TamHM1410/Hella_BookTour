import { PrismaClient } from "@prisma/client";
class PointOfInterestService {
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAll = async (page: number, pageSize: number) => {
    try {
      await this.prisma.$connect;
      const startIndex = (page - 1) * pageSize;
      const totalItems = await this.prisma.point_Of_Interest.count();
      const result = await this.prisma.point_Of_Interest.findMany({
        skip: startIndex,
        take: pageSize,
      });
      if (result) {
        return {
          status: "Success",
          statusCode: 200,
          data: result,
          page,
          pageSize,
          totalPages: Math.ceil(totalItems / pageSize),
          totalItems,
        };
      }
    } catch (error) {
      console.log(error);

      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  getById = async (id: number) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.point_Of_Interest.findFirst({
        where: {
          id: id,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
          data: data,
        };
      }
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  createNewPointOfInterest = async (currentData: {
    POIName: string;
    POIDescription: string;
    locationId: number;
    categoryPOI_ID: number;
    status: boolean;
  }) => {
    try {
      await this.prisma.$connect;
      const data = await this.prisma.point_Of_Interest.create({
        data: {
          POIName: currentData.POIName,
          POIDescription: currentData.POIDescription,
          locationId: currentData.locationId,
          categoryPOI_ID: currentData.categoryPOI_ID,
          status: currentData.status,
        },
      });
      if (data) {
        return {
          status: "Success",
          statusCode: 201,
          data: data,
        };
      }
    } catch (error) {
      console.log(error);

      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  updateById = async (currentData: {
    POIName: string;
    POIDescription: string;
    locationId: number;
    categoryPOI_ID: number;
    status: boolean;
    id: number;
  }) => {
    try {
      await this.prisma.$connect;
      const dataUpdate = await this.prisma.point_Of_Interest.update({
        where: {
          id: currentData.id,
        },
        data: {
          POIName: currentData.POIName,
          POIDescription: currentData.POIDescription,
          locationId: currentData.locationId,
          categoryPOI_ID: currentData.categoryPOI_ID,
          status: currentData.status,
        },
      });
      if (dataUpdate) {
        return {
          status: "Success!",
          statusCode: 201,
          data: dataUpdate,
        };
      }
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };

  deleteById = async (id: number) => {
    try {
      await this.prisma.$connect;
      await this.prisma.point_Of_Interest.delete({
        where: {
          id: id,
        },
      });
      return {
        status: "Delete success!",
        statusCode: 201,
      };
    } catch (error) {
      return {
        status: "Internal server error",
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect;
    }
  };
}
export const pointOfInterestService = new PointOfInterestService();
