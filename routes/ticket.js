'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  
   res.status(402).end();

});

module.exports = router;