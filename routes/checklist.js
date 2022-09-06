const express = require('express');
const router = express.Router();
const { getChecklist } = require('../controllers/checklist');

//get checklist
router.route('/checklist/:id').get(getChecklist);

module.exports = router;
