const express = require('express')
const PORT = process.env.PORT || 3000
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.json())
const { Student, Teacher, Classroom } = require('./models')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.get('/', (req,res)=> {
    res.send("this is root")
})
app.get('/teachers', async(req,res)=>{
    const teachers = await Teacher.findAll()
    res.json(teachers)
})
app.get('/teachers/:id/students', async(req, res)=> {
    const teacher = await Teacher.findAll({
        where: {id: req.params.id},
        
        include:[{
            model:Student,
            
        
        }]
    })

    res.send({teacher})
})
app.get('/students/:id/teachers', async(req, res)=> {
    const student = await Student.findAll({
        where: {id: req.params.id},
        
        include:[{
            model:Teacher,
            
        
        }]
    })

    res.send({student})
})


app.get('/students',async(req,res)=>{
    const students = await Student.findAll()
    res.send(students)
})
app.post('/teachers/:id/students', async(req, res)=>{
    console.log(req.body)
    const teacher = await Teacher.findAll({
        where:{id: req.params.id}
    })
    
    const student = await Student.create(req.body)
    const classroom = await Classroom.create({teacher_id:req.params.id, student_id:student.id})
    res.send({student:student, classroom:classroom})
})