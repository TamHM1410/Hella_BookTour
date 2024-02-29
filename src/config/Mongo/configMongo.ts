import "dotenv/config";
export const config = {
  app: {},
  db: {
    user_name: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    url: process.env.MONGO_DBURL,
    name: process.env.MONGO_DBNAME,
  },
};
