const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
const {Op} = require("sequelize");


router.get("/booksLibrary/:id" , (req, res) => {
    const idLibrary = req.params.id
    let listeLivres = []
    sequelize.BookLibrary.findAll({where:{libraryId:{[Op.eq]:idLibrary}}}).then(async results => {
        for (let libraryLivre of results) {
            await sequelize.Book.findByPk(libraryLivre.bookId).then(result => {
                listeLivres.push(result)
            })
        }
        res.json(listeLivres)
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

router.delete('/bookLibrarys/:id/:idLib', (req, res) => {
    const bookId = req.params.id
    const idLib = req.params.idLib
    sequelize.BookLibrary.destroy({
        where: {
            [Op.and]:[
                {bookId:bookId},
                {libraryId:idLib}
            ]
        }
    }).then(() => {
        res.status(204).json({ message: "Deleted successfully " })
    }).catch(() => {
        res.json({ message: "Error !!" })
    })
})

module.exports = router
