const mongoose = require("mongoose");

const connection = {};

const connecToDb = async () => {
  try {
    console.log("chay ham connect db");
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.DATABASE);
    connection.isConnected = db.connection.readyState;
    console.log(db.connection.readyState);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connecToDb };
