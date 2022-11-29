const express = require('express');
const router = express.Router();
const sequelize = require('../controllers/db/sequelize')

router.post('/library' , (req, res) => {
    sequelize.Library.create(req.body).then(result => {
        res.json({arguments: "Created successfully " , result})
    }).catch(() => {
        res.json({arguments: "Error !"})
    })
})

module.exports = router