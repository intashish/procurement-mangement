const { Checklist, Question, OptionValue } = require('../dao/checklist');

async function getChecklist(id) {
	try {
		let result = await Checklist.findOne({
			where: {
				id: id,
			},
			include: {
				model: Question,
				include: {
					model: OptionValue,
					attributes: ['value'],
				},
				attributes: ['id', 'question'],
			},
		});

		if (result) {
			return { status: 'success', data: result };
		} else {
			return { status: 'success', message: 'No data Found' };
		}
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

module.exports = { getChecklist };
