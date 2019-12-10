const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()
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
        through:Classroom,
        include:[{
            model:Student,
            
            
        }]
    })

    res.send({teacher})
})