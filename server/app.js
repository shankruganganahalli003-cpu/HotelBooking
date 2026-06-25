const express = require("express");
const app= express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const authrouter = require("./routes/authroute");
const roomrouter = require("./routes/roomroute");
const bookrouter = require("./routes/bookroute");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: "https://hotelbooking-g7sq.onrender.com",
    credentials: true
}));


app.use("/api/auth",authrouter);
app.use("/api/room",roomrouter);
app.use("/api/book",bookrouter);


const port = process.env.PORT;
app.listen(port,()=>{
    connectDB();
    console.log(`server is running ${port}`);
});








