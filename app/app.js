import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import router from './routes/app.route';
import userRouter from './routes/users.route';
import docs from '../swagger.json';

dotenv.config();

const app = express();
const port = (process.env.PORT || 8000);


app.use(cors());

app.set('appVersion', '/api/v1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.get('appVersion'), router);
app.use(app.get('appVersion'), userRouter);

app.get('/api/v1', (req, res) => { res.status(200).json({ message: 'Welcome to politico' }); });

app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.get('*', (req, res) => { res.status(404).json({ error: 'The page cannot be found!' }); });


app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;
