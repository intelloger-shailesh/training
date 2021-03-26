const express = require('express')
const router = express.Router()
const user = require('../models/user')


router.get('/', async(req,res) => {
    try{
           const users = await user.find()
           res.json(users)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const u = await user.findById(req.params.id)
           res.json(u)
    }catch(err){
        res.send('ID is not in DB ' + err)
    }
})


router.post('/', async(req,res) => {
    const u = new user({
        name: req.body.name,
        age: req.body.age
        
    })

    try{
        const a1 =  await u.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const u = await user.findById(req.params.id) 
        u.name = req.body.name
        u.age = req.body.age
        const a1 = await u.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.delete('/:id',async(req,res) =>{
    try{
        const u = await user.findById(req.params.id)
        const a1 = await u.remove()
        res.send('Data Removed')

    }catch(err){
        res.send('Error')
    }

})

module.exports = router