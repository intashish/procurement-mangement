const express = require('express');
// const createError = require('http-errors');
const bodyParser = require('body-parser');

const routing = require('./routes');
const dotenv = require('dotenv');

const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	definition: {
		openapi: '3.0.3',
		info: {
			title: 'Procurement management',
			version: '0.1.0',
			description: 'This API is of for procurement management',
			contact: {
				name: 'Ashish Singh',
				url: 'https://ashish.com',
				email: 'ashish@email.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:3000/api',
			},
		],
	},
	apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
