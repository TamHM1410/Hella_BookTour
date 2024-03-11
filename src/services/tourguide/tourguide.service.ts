import mongoose from "mongoose";
import tourguide from "../../models/Tourguild";
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo";
class TourguideService {
  createTourguide = async (currentData: { userId: string }) => {
    try {
      await instanceMongo();
      const createNewTourguide = await tourguide.create({
        userId: new mongoose.Types.ObjectId(currentData.userId),
      });
      return createNewTourguide
        ? {
            status: "Success",
            statusCode: 201,
            data: createNewTourguide,
          }
        : {
            status: "something missing",
            statusCode: 409,
          };
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
        EM: error,
      };
    }
  };
  getAllTourguide = async (page: number, pageSize: number) => {
    try {
      await instanceMongo();
      // const startIndex = (page - 1) * pageSize;
      const totalItems = await tourguide.countDocuments();
      const data = await tourguide
        .find()
        .populate("userId");
   
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
            page,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
            totalItems,
          }
        : {
            status: "Not found",
            statusCode: 404,
          };
    } catch (error) {
      console.log(error);
      return {
        status: "Internal server",
        statusCode: 500,
        EM: error,
      };
    }
  };
  getTourguideById = async (tourguideId: string) => {
    try {
      await instanceMongo();
      const data = await tourguide.findById({
        _id: new mongoose.Types.ObjectId(tourguideId),
      });
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
          }
        : {
            status: "Not found!",
            statusCode: 404,
          };
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
        EM: error,
      };
    }
  };
  updateTourguideById = async (
    status: boolean,
    id: string,
    language: string
  ) => {
    try {
      await instanceMongo();
      const findData = await tourguide.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      const checkLan = findData?.language.includes(language);
      console.log(checkLan);
      if (checkLan === true) {
        const data = await tourguide.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
          },
          {
            status: status,
          },
          { new: true }
        );
        return data
          ? {
              status: "Success",
              statusCode: 201,
              data: data,
            }
          : {
              status: "Not found!",
              statusCode: 404,
            };
      }
      if (checkLan === false) {
        const data = await tourguide.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(id),
          },
          { $set: { status: status }, $push: { language: language } },
          { new: true }
        );

        return data
          ? {
              status: "Success",
              statusCode: 201,
              data: data,
            }
          : {
              status: "Not found!",
              statusCode: 404,
            };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "Internal server",
        statusCode: 500,
        EM: error,
      };
    }
  };
  softDeleteTourguide = async (id: string) => {
    try {
      await instanceMongo();
      const data = await tourguide.findByIdAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(id),
        },
        {
          deleteAt: new Date(),
          status: false,
        },
        { new: true }
      );
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
          }
        : {
            status: "Not found!",
            statusCode: 404,
          };
    } catch (error) {
      return {
        status: "Internal server",
        statusCode: 500,
        EM: error,
      };
    }
  };
}
const tourguideService = new TourguideService();
export default tourguideService;
