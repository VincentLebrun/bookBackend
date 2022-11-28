const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
// Book List
router.post('/book' , (req, res) => {
   req.body.type = req.body.type.join()
   sequelize.Book.create(req.body).then(result => {
      res.json({arguments: "Created successfully " , result})
   }).catch(() => {
      res.json({arguments: "Error !"})
   })
})
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
module.exports = router
