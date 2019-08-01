import express from 'express';
import routes from './routes';
import db from './config/db';
import {config} from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import formData from 'express-form-data';
import bodyParser from 'body-parser'
const app = express();
const port = process.env.PORT || 5000;
db();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(formData.parse());
config();
app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/media', express.static('media'));
routes(app);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.listen(port, () => {
	console.log("Server is running on port : " + port + '...');
});


