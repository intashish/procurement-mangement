const jwt = require('jsonwebtoken');
const colors = require('colors');

function tokenAuth(req, res, next) {
	const token = req.headers.token;
	console.log(token.yellow);
	jwt.verify(token, process.env.JWTKEY, (err, verifiedJwt) => {
		if (err) {
			let response = {
				status: 'failed',
				message: 'authentication failed',
			};
			res.status(401).json(response);
		} else {
			req.userDetails = verifiedJwt;
			next();
		}
	});
}

module.exports = tokenAuth;
