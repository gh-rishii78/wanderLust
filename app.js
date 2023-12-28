/**
 * npm i dotenv - refer to npm website
 */
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
/** help to create layouts and templates similar like includes or partials */
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const port = 8080;
// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderLust';
const dbUrl = process.env.ATLASDB_URL;

main()
    .then((res) => {
        console.log("connection established with DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}

// Using sessions
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};

// Root Route
// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

// flash and cookie middlewares
app.use(session(sessionOptions));
app.use(flash());

// Authentication part
// The Middleware that initializes passport
app.use(passport.initialize());
// A web application needs the ability to identify 
// users as they browse from page to page
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages and defining locals
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Fake user signup
// app.get("/demouser", async (req,res) => {
//     let fakeUser = new User({
//         email: "demo@email.com",
//         username: "demoUser"
//     });

//     let registeredUser = await User.register(fakeUser, "user1234");
//     res.send(registeredUser);
// });

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// Error Handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log(`Server is listening at Port : ${port}`);
});