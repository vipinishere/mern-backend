const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
// const morgan = require('morgan')
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('./public'))
// app.use(morgan('tiny'))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected successfully!");
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("running successfully at port ", process.env.PORT);
      }
    });
  })
  .catch((err) => {
    console.log("error", err);
  });

// app.use("/api/users",userRoute);
app.use(userRoute);
