const express = require('express');
const cors = require('cors')

const{dbConnection}=require('./database/database')
const studentRoute = require('./routes/student')
const mentorRoute = require('./routes/mentor')
const assignMentortoStudent = require('./routes/assignmentortostudent')

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
dbConnection();
app.get('/',(req,res)=>{
    try {
       res.status(200).send({
        message:"working"
       }) 

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})
app.use('/student',studentRoute)
app.use('/mentor',mentorRoute)
app.use('/assignmentor',assignMentortoStudent)
app.listen(PORT,()=>console.log("app is running successfully"))