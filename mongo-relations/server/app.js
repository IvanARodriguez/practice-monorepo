import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';

const { PORT = 6000 } = process.env;

const app = express();

app.use(express.json());

const dbUri = 'mongodb://127.0.0.1:27017/Practice';

await mongoose
	.connect(dbUri)
	.then(() => {
		console.log('Database connected!');
	})
	.catch((e) => console.log(`Something bad happened!, ${e}`));

const router = express.Router();

router.get('/healthcheck', (_, res) => {
	const response = { status: 'Running!' };
	console.log(response);
	res.send(response);
});

app.use('/api', router);

app.listen(PORT, () => {
	console.log(`Application connected to port ${PORT}`);
});
