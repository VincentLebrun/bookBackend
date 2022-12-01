const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
const bcrypt = require('bcrypt')

//Login
router.post('/login', async (req, res) => {
    const userFound = await sequelize.User.findOne({ where : { username: req.body.username }})
    if(userFound == null){
        return res.status(401).send('Undefined user')
    }
    try {
        if( await bcrypt.compare(req.body.password, userFound.password)){
            res.json(userFound)
        } else {
            res.end('Bad password')
        }
    } catch {
        res.status(500).send()
    }
})

router.post('/register',(req,res)=>{
     bcrypt.hash(req.body.password,10).then(resultat =>{
         req.body.password = resultat
         console.log("tu es ici")
         try{
             sequelize.Library.create().then(result=>{
                 req.body.idLibrary = result.id
                 sequelize.User.create(req.body).then(result=>{
                     res.json({Message:"User created", User:result})
                 })
             })
         }
         catch (e){
             res.json(e)
         }
     })
})

module.exports = router
