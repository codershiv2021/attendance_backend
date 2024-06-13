const Report = require("../models/Report")
const router = require("express").Router()

//created database

router.post("/record",async(req,res)=>{
      const newrecord = new Report(req.body)
      try{
            const user = await newrecord.save()
            res.status(200).json(user)
      }
      catch(err){
            res.status(500).json(err)
      }
});

//get me whole report of attendance

//asynchandler can use if not want to use try catch
router.get("/",async(req,res)=>{
      try{
            const Rapport = await Report.find({});
            res.json({
                  Report : Rapport
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

            res.json(records);
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
  