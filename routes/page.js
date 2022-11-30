const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')
const { Op } = require("sequelize");

router.get("/pages/:id" , (req, res) => {
    const livreId = req.params.id
    sequelize.Page.findAll({
        where: {
            bookId: {
                [Op.eq]: livreId
            }
        }
    }).catch(() => {
        res.json({arguments: "Error !! "})
        console.log("toto")
    })
})

//create book
router.post('/page' , (req, res) => {
    sequelize.Page.create(req.body).then(result => {
        res.json({arguments: "Created successfully " , result})
    }).catch(() => {
        res.json({arguments: "Error !"})
    })
})

// edit book
router.put("/page/:id" , (req , res) =>{
    const pageId = req.params.id
    req.body.type = req.body.type.join()
    sequelize.Page.update(req.body,
        {
            where : { id : pageId}
        }).then(() => {
        sequelize.Book.findByPk(pageId).then(results => {
            res.json({ message: "Modified successfully ", results })
        }).catch(() => {
            res.json({ message: "Error !!" })
        })
    }).catch(() => {
        res.json({ message: "Error !!" })
    })
})

router.delete('/page/:id', (req, res) => {
    const pageId = req.params.id
    sequelize.Page.destroy({
        where: {id : pageId}
    }).then(() => {
        res.status(204).json({ message: "Deleted successfully " })
    }).catch(() => {
        res.json({ message: "Error !!" })
    })
})

module.exports = router
