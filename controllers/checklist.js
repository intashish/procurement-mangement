const checklistBl = require('../bl/checklistBl');

//@desc      Get checklist question
//@route     GET /api/checklist/:id
exports.getChecklist = async (req, res) => {
	let checklistId = req.params.id;
	const response = await checklistBl.getChecklist(checklistId);
	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(500).json(response);
	}
};

//@desc      Create new checklist
//@route     POST /api/checklist/:id
exports.createChecklist = async () => {};

//@desc      Submit checklist question answer
//@route     POST /api/checklist/:id
exports.submitChecklist = async (req, res) => {};
