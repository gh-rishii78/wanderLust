const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
    .then((res) => {
        console.log("connection established with DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: '658d800bd6567f95121da040',
    }));
    Listing.insertMany(initData.data)
    .then((res) => {
        console.log("Data was re-initialised");
    }).catch((err) => {
        console.log(err.errors);
    });
};

initDB();