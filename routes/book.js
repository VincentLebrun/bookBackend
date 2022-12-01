const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
const {Op} = require("sequelize");

// Book List
router.get("/books" , (req, res) => {
   sequelize.Book.findAll().then(results => {
      results.forEach(element => {
         element.type = element.type.split(',')
      })
      res.json(results)
   }).catch(() => {
      res.json({arguments : "Error !! "})
      console.log("toto")
   })
})
router.get("/book/:id" , (req , res) => {
   const bookId = req.params.id
   sequelize.Book.findByPk(bookId ,  {
          where : { id : {[Op.eq] : bookId}}
       }
   ).then( resultat =>{
      res.json(resultat)
   }
   ).catch(()=> {
      res.json({ message: "Error !!" })}
   )
})
router.post('/book' , (req, res) => {

   sequelize.Book.create(req.body).then(result => {
      res.json({arguments: "Created successfully " , result})
   }).catch(() => {
      res.json({arguments: "Error !"})
   })
})


router.put("/book/:id" , (req , res) =>{
   const bookId = req.params.id
   console.log(req.body.type)

   sequelize.Book.update(req.body,
       {
        where : { id : {[Op.eq]:bookId}}
       }).then(() => {
          sequelize.Book.findByPk(bookId).then(results => {
             res.json({ message: "Modified successfully ", results })
          }).catch(() => {
             console.log(req.body)
             res.json({ message: "Error !!" })
          })
   }).catch(() => {
      console.log(req.body)
      res.json({ message: "Error" })
   })
})

router.delete('/book/:id', (req, res) => {
   const bookId = req.params.id
   sequelize.Book.destroy({
      where: {id : bookId}
   }).then(() => {
      res.status(204).json({ message: "Deleted successfully " })
   }).catch(() => {
      res.json({ message: "Error !!" })
   })
})

module.exports = router
