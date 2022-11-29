const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')


router.get("/booksLibrary" , (req, res) => {
    sequelize.BookLibrary.findAll().then(results => {
        results.forEach(element => {
            element.read = element.read.split(',')
        })
        res.json(results)
    }).catch(() => {
        res.json({arguments : "Error !! "})
        console.log("toto")
    })
})

router.post('/bookLibrary' , (req, res) => {

    sequelize.BookLibrary.create(req.body).then(result => {
        res.json({arguments: "Created successfully " , result})
    }).catch((err) => {

        res.json({arguments: err})
    })
})

router.put("/booksLibrary/:id" , (req , res) =>{
    const bookId = req.params.id

    sequelize.BookLibrary.update(req.body,
        {
            where : { id : bookId}
        }).then(() => {
        sequelize.BookLibrary.findByPk(bookId).then(results => {
            res.json({ message: "Modified successfully ", results })
        }).catch(() => {
            res.json({ message: "Error !!" })
        })
    }).catch(() => {
        res.json({ message: "Error !!" })
    })
})

router.delete('/bookLibrarys/:id', (req, res) => {
    const bookId = req.params.id
    sequelize.BookLibrary.destroy({
        where: {id : bookId}
    }).then(() => {
        res.status(204).json({ message: "Deleted successfully " })
    }).catch(() => {
        res.json({ message: "Error !!" })
    })
})

module.exports = router