const express = require('express')
const router = express.Router()
const path = require('path')

router
    .route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'new', 'new.html'));
    })
    .post((req, res) => {
        console.log(req.body)
        res.redirect('/')
    })

module.exports = router