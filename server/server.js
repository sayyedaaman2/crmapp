const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const ticketRoutes = require("./routes/ticket.route");
const {sendMail} = require('./utils/notificationClient')
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
  console.log("Connected to mongoDB");
  init();
});

async function init() {
  try {
    //drop the collections
    // await User.collection.drop();

    const user = await User.create({
      name: "admin",
      userId: "admin",
      password: bcrypt.hashSync("Admin$1234", 8),
      email: "admin123@gmail.com",
      userType: "ADMIN",
    });

    console.log(user);
  } catch (err) {
    console.log("err in db initialization , " + err.message);
  }
}

app.get("/", (req, res) => {
  res.status(200).send({
    message: "testing api...",
  });
});
// app.get('/email',(req,res)=>{
//   sendMail('Hey Buddy 😉<sayyedaaman2@gmail.com>','sayyedaaman9@gmail.com','nodemailer check','testing of nodeMailer','<b>testing of nodeMailer</b>').then((data)=>{
//     // console.log(data)
//     res.send(data);
//   }).catch((error)=>{
//     console.log(`error while the ${error}`)
//     res.send({
//       message : error
//     })
//   })
// })

app.use("/crm/api/auth", authRoutes);
app.use("/crm/api/ticket", ticketRoutes);
app.use("/crm/api/user", userRoutes);
/**
 * So this can be used for the intergation Testing
 */
module.exports = app.listen(serverConfig.PORT, () => {
  console.log("Started the server on the PORT number : ", serverConfig.PORT);
});
