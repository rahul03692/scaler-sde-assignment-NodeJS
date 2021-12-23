const mongoose=require("mongoose");

const schema=mongoose.Schema;

const scheduleSchema= new schema({
    interviewer:{
        type:String,
        required:[true,"Email Field is Required"],
    },
    interviewee:{
        type:String,
        required:[true,"Email Field is Required"],
    },
    startDate:{
        type:String,
        required:[true,"startDate is Required"],
    },
    endDate:{
        type:String,
        required:[true,"endDate is Required"],
    },
    startTime:{
        type:String,
        required:[true,"startTime is Required"],
    },
    endTime:{
        type:String,
        required:[true,"endTime Field is Required"],
    },
    

});

const db=mongoose.model("schedules",scheduleSchema);

module.exports=db;