const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//databse connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin : "https://localhost:3000",
        credentials : true,
    })
);

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp"
    })
)

//Cloudinary connection
cloudinaryConnect();

//Routes mounting
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/auth", courseRoutes);
app.use("/api/v1/auth", paymentRoutes);


//defauut route
app.get("/", (req, res) => {
    return res.json({
        success : true,
        message : "Your server running successFully"
    })
})

//Activate server

app.listen(PORT, () => {
    console.log(`App is running successfully on ${PORT}`);
})