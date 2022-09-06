const jwt = require('jsonwebtoken');

function tokenAuth(req, res, next) {
	const token = req.headers.token;
	console.log(token);
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
