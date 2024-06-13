const mongoose = require("mongoose");

const mongooseschema = mongoose.Schema({
      Emp_id:{
            type: Number,
            required: true
      },
      Name:{
            type: String,
            required: true
      },
      Date:{
            type: Date, //date type me store
            required: true
      },
      In_time:{
            type: String,
            required: true
      },
      Out_time:{
            type:String,
            required: true
      }
});
module.exports = mongoose.model("Report",mongooseschema);