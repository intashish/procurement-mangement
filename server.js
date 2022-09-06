const express = require('express');
// const createError = require('http-errors');
const bodyParser = require('body-parser');

const routing = require('./routes');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './config/config.env' });
// app.use(express.json);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routing);

// Handling Errors
// app.use((err, req, res, next) => {
// 	console.log(err);
// 	err.statusCode = err.statusCode || 500;
// 	err.message = err.message || 'Internal Server Error';
// 	res.status(err.statusCode).json({
// 		message: err.message,
// 	});
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
