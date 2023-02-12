const express = require("express");
const app = express();
const mainRoutes = require("./routes/main");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

//Server Running
app.listen(process.env.PORT || `0.0.0.0:$PORT`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
