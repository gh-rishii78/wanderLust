/**
 * Authentication - is the process of verifying who someone is.
 * 
 * Authorization - is the process of verifying what specific applications, files, and, data a user has access to.
 */

/**
 * Storing Passwords - we never store the passwords as it is. We store their hashed form.
 * We use Hashing Function for converting password to hashed form.
 */

/**
 * Hashing - what we need to know?
 * 1. For every input, there is a fixed output
 * 2. They are one-way functions, we can't get input from output
 * 3. For a different input, there is a different output but of same length
 * Small changes in input should bring large changes in output
 */

/**
 * Salting - Password salting is a technique to protect passwords stored in databases by adding string of 32 or more characters and then hashing them.
 */

/**
 * Passport - a NPM library used for authentication and authorization.
 * "pbkdf2" hasing algo used in this
 * 
 * npm i passport
 * npm i passport-local
 * npm i passport-local-mongoose
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);