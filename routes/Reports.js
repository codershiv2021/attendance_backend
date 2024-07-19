const Report = require("../models/Report")
const router = require("express").Router()

//get me whole report of attendance

//asynchandler can use if not want to use try catch
router.get("/",async(req,res)=>{
      const page = parseInt(req.query.page)||1; //Axios sends object as string ..convert string to int as page is int and || is if not hua convert to take as 1 .. the page vaha pe was query parameter 
      const limit = parseInt(req.query.limit)||5;
      const skip = (page-1)*limit;
      try{  
            const reports = await Report.find().skip(skip).limit(limit);
            const totalReports = await Report.countDocuments(); //- mongoose ..to count number of doucments
            res.json({
                  reports,
                  totalReports,
                  totalpages: Math.ceil(totalReports/limit),
                  currentPage: page
            })

//Report is a new variable that client will be easy for him .. 
//and sending him the Rapport .. Report is the key and Rapport is value/data
//Report will have the all Report of all attendance
      
}
      catch(err){
            res.status(500).json(err)
      }
});

//start date se end tak

const WORK_START_TIME = "10:00";
const WORK_END_TIME = "18:00";

 
router.get('/records', async(req,res)=>{
      try{
        const {startDate,endDate} = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);
        console.log('Parsed start date:', start);
        console.log('Parsed end date:', end);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

            const records = await Report.find({
            Date: {
                $gte: start,
                $lte: end
            }
        }).sort({ Date: 1 });

      const lateArrivals = records.filter(record => record.In_time > WORK_START_TIME);
        const earlyDepartures = records.filter(record => record.Out_time < WORK_END_TIME);
        res.json({records,lateArrivals,earlyDepartures});

      }catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
      
});

module.exports = router;

// {
//       "Emp_id": 12342,
//       "Name" : "Surendra Nath",
//       "Date" : "2023-05-19",
//       "In_time" : "11:20",
//       "Out_time" : "17:20"
//   }
  