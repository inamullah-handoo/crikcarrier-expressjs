const express = require('express');
const router = express.Router();

// home
router.get('/', (req,res) => {
    res.json({success: true, msg:'Home page'});
});

module.exports = router;