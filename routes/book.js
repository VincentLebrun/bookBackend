const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')

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

//create book
router.post('/book' , (req, res) => {
   req.body.type = req.body.type.join()
   sequelize.Book.create(req.body).then(result => {
      res.json({arguments: "Created successfully " , result})
   }).catch(() => {
      res.json({arguments: "Error !"})
   })
})

// edit book
router.put("/book/:id" , (req , res) =>{
   const bookId = req.params.id
   req.body.type = req.body.type.join()
   sequelize.Book.update(req.body,
       {
        where : { id : bookId}
       }).then(() => {
          sequelize.Book.findByPk(bookId).then(results => {
             res.json({ message: "Modified successfully ", results })
          }).catch(() => {
             res.json({ message: "Error !!" })
          })
   }).catch(() => {
      res.json({ message: "Error !!" })
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
