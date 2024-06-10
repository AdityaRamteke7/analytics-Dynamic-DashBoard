import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();


const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://adityaramteke1999:XrOgAZ2YE0kxxjhT@clusterdashboard.aio9w3p.mongodb.net/DashBoard_data",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

//  MongoDB Schema and Model
const DataSchema = new mongoose.Schema({
  // Define schema fields according to the JSON data structure
  intensity: "String",
  likelihood: "String",
  relevance: "String",
  country: "String",
});

const DataModel = mongoose.model("Data", DataSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());


//API Routes
app.get("/api/data", async (req, res) => {
  try {
    const data = await DataModel.find({});
    // console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//POST
// app.post("/api/data", async (req, res) => {
//   const data = new DataModel({
//     intensity: "String",
//     likelihood: "String",
//     relevance: "String",
//     country: "String",
//   });
//   try {
//     await data.save();
//     res.status(201).send(data);
//   } catch (e) {
//     res.status(400).send(e);
//   }
//   // const data = await DataModel.find({});
//   // console.log(data);
//   // res.json(data);
// });

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
