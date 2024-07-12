const mongoose = require("mongoose");

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("connected to database with success"))
    .catch((err: Error) =>
      console.log("failled to connected to database", err)
    );
};
