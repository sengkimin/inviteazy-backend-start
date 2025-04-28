// import mongoose from "mongoose";

// let isConnected = false;

// export const connectMongoDB = async () => {
//   if (isConnected) {
//     console.log("🔁 Reusing existing MongoDB connection.");
//     return;
//   }

//   try {
//     const URI = "mongodb+srv://inseng:kimin12345@cluster0.jcvhu.mongodb.net/Inviteazy?retryWrites=true&w=majority";
//     const connOptions = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions;

//     const conn = await mongoose.connect(URI, connOptions);
//     isConnected = true;

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(`MongoDB Error: ${error.message}`);
//     } else {
//       console.error(`MongoDB Unknown Error: ${error}`);
//     }
//     process.exit(1);
//   }
// };

import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log("🔁 Reusing existing MongoDB connection.");
    return;
  }

  try {
    const URI = process.env.MONGODB_URI as string;
    const connOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    const conn = await mongoose.connect(URI, connOptions);
    isConnected = true;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`MongoDB Error: ${error.message}`);
    } else {
      console.error(`MongoDB Unknown Error: ${error}`);
    }
    process.exit(1);
  }
};
