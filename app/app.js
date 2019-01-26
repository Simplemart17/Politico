import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/app.route';

const app = express();

const port = (process.env.PORT || 8000);

app.set('appVersion', '/api/v1');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.get('appVersion'), router);


app.get('*', (req, res) => {
  res.status(404).json({ error: 'The page cannot be found!' });
});


app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;