const express = require("express"); 
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const ReportsRouter = require("./routes/Reports")

app.use(cors())

dotenv.config()

mongoose.connect('mongodb+srv://Shivam:Shivam2021@attendance.fltt6mw.mongodb.net/?retryWrites=true&w=majority&appName=attendance');
const connect = mongoose.connection;
connect.on('error',console.error.bind(console, 'MongoDB connection error:'));
connect.once ('open', () => {
console.log( 'Connected to MongoDB');
});

app.use(express.json());
app.use("/api/report",ReportsRouter);

app.listen(process.env.PORT || 3001, ()=>{
      console.log("port is listening")
}) 

