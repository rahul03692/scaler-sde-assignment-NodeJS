const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const db = require("./models/model");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("DB successful"))
  .catch((err) => console.log(err));


const app = express();

app.enable("trust proxy");

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
//app.use("/api", routes);

app.set('view engine','ejs');

app.get("/", (req, res) => {

  db.find({}).then((data) => {
    
    res.render("index",{data:data});

  });
  
});

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

//get
app.get("/allSchedules", function (req, res, next) {
  
  db.find({}).then((data) => {
    res.json(data);
  });

});

//post
app.post("/", function (req, res, next) {
  
  const interviewer=req.body.interviewer;
  const interviewee=req.body.interviewee;
  const startDate=req.body.startDate;
  const endDate=req.body.endDate;
  const startTime=req.body.startTime;
  const endTime=req.body.endTime;

  const dateObj = new Date();
  const currentYear = dateObj.getFullYear();
  const today = dateObj.getDate();
  const currentMonth = dateObj.getMonth() + 1;
  const currentHour=dateObj.getHours();
  const currentMinutes=dateObj.getMinutes();
  const sDateArray = startDate.split("-");
  //const eDateArray = endDate.split("-");
  const sTimeArray=startTime.split(":");
  const eTimeArray=endTime.split(":");

  if(sDateArray[2]<today || sDateArray[1]<currentMonth || sDateArray[0]<currentYear){
    res.send("please select correct date");
  }
  
  if(startTime > endTime || (today == sDateArray[2] && sDateArray[1] == currentMonth && sDateArray[0] == currentYear && (sTimeArray[0] < currentHour || eTimeArray[0] < currentHour))){
    res.send("please select correct time");
    
  }

  if((sTimeArray[0] == currentHour && sTimeArray[1] < currentMinutes) || (eTimeArray[0] == currentHour && eTimeArray[1] < currentMinutes)){
    res.send("please check the time");
    
  }


  // db.find({interviewer : interviewer}).then((data) => {
    
  //   data.forEach((item) => {

  //     const sTimeItemArray = item.startTime.split(":");
  //     const eTimeItemArray = item.endTime.split(":");
  //     const sDateItemArray = item.startDate.split("-");

  //     if(sDateItemArray == sDateArray){
        
  //     }

  //   })

  // });

  db.create(req.body)
    .then(function (data) {
      res.redirect("/");
    })
    .catch(next);

});

app.post("/delete/:id", function (req, res, next) {

  var id=req.params["id"];
  db.findByIdAndDelete(id,function(err){
    res.redirect("/");
  })

})



// //put
// router.put("/:id", function (req, res, next) {
//   db.findByIdAndUpdate({ _id: req.params.id }, req.body)
//     .then(() => {
//       db.findById({ _id: req.params.id }).then((data) => {
//         res.send(data);
//       });
//     })
//     .catch(next);
// });

// //delete
// router.delete("/:id", function (req, res, next) {
//   db.findByIdAndRemove({ _id: req.params.id })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch(next);
// });


app.listen(process.env.PORT || 5000, function () {
  console.log("server is running on 5000");
});
