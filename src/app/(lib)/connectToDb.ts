import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

global.mongoose = {
    conn: null,
    promise: null,
}

export async function connectToDb() {
    if(global.mongoose && global.mongoose.conn) {
        console.log('connected from previous');
        return global.mongoose.conn;
    } else {
        const conString = process.env.MONGODB_URI;

        const promise = mongoose.connect(conString as string, {
            autoIndex: true,
        });

        global.mongoose = {
            conn: await promise,
            promise,
        };
        console.log('Newly connected');

        return await promise;
    }
}

// import { connect } from "http2";

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDb() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log("MongoDB connected successfully");
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectToDb;



// import dotenv from "dotenv";

// import mongoose from "mongoose";
// dotenv.config();

// const connectToDb = async () => {
//   if(mongoose.connections[0].readyState) {
//     return true;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI as string);
//     console.log('konnekted to kluster');
//     return true;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default connectToDb;

// ------------------------------------------------------------------------------------
// import dotenv from "dotenv";

// dotenv.config();

// declare global {
//   var mongoose: any; // This must be a `var` and not a `let / const`
// }

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local",
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDb() {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default connectToDb;

// -----------------------------------------------------------------------------------------------