const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
const {Op} = require("sequelize");


router.get("/booksLibrary/:id" , (req, res) => {
    const idLibrary = req.params.id
    let listeLivres = []
    sequelize.BookLibrary.findAll({where:{libraryId:{[Op.eq]:idLibrary}},include:sequelize.Book}).then(async results => {
        // for (let libraryLivre of results) {
        //     await sequelize.Book.findByPk(libraryLivre.bookId).then(result => {
        //         result.read = libraryLivre.read
        //         listeLivres.push(result)
        //     })
        // }

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

router.put("/booksLibrary/:id/" , (req , res) =>{
    const pageId = req.params.id
    const libraryId = req.body.libraryId
    const bookId = req.body.bookId

    sequelize.BookLibrary.update(req.body,
        {
            where : { [Op.and] : [{bookId : bookId},{libraryId:libraryId}] }
        }).then(() => {
        sequelize.BookLibrary.findByPk(pageId).then(results => {
            res.json({ message: "Modified successfully ", results })
        }).catch(() => {
            res.json({ message: "Error 1 !!" })
        })
    }).catch(() => {
        res.json({ message: "Error 2 !!" })
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
