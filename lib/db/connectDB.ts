//export mongodb connection  function

import { MongoClient } from "mongodb";

export const connectDB = new MongoClient(process.env.MONGODB_URI as string);
