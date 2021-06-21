const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

//get all marioChar
app.get('/mario',async(req,res)=>{
    const marioChar = await marioModel.find();
    res.send(marioChar)
})

//getting character details with id
app.get('/mario/:id', async(req,res)=>{
    try{
        const mariChar = await marioModel.findById(req.params.id);
        res.send(mariChar);
    }
    catch(error){
        res.status(400 ).send({message:error.message})
    }
})

//posting data
app.post('/mario', async(req,res)=>{
    if(!req.body.name || !req.body.weight){
        res.status(400).send({message: 'either name or weight is missing'})
    }
    let marioChar = new marioModel({
        name:req.body.name,
        weight:req.body.weight
    })
    let result = await marioChar.save();
    res.status(201).send(result);
})

//updating the data
app.patch('/mario/:id',async(req,res)=>{
    
    try{
        const mariChar = await marioModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!mariChar){
            res.status(400).send({message:"Invalid Id"});
        }
        res.send(mariChar)
    }  
    catch(error){
        res.status(400).send({message: error.message})
    }  
})

//Deleting the data
app.delete('/mario/:id',async(req,res)=>{
    try{
        const mariChar = await marioModel.findByIdAndDelete(req.params.id)
        res.send({message: 'character deleted'})
    }
    catch(error){
        res.status(400).send({message: error.message})
    }
})


module.exports = app;