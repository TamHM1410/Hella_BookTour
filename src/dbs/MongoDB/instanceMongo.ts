import mongoose from "mongoose";
import { config } from "../../config/Mongo/configMongo";

const url: string = `mongodb+srv://${config.db.user_name}:${config.db.password}@${config.db.url}.mongodb.net/${config.db.name}`;
export const instanceMongo = () => {
  mongoose.connect(url).then(() => console.log("connect database success!"));
};
