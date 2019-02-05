import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import router from './routes/app.route';
import userRouter from './routes/users.route';
import docs from '../swagger.json';
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig';
import { multerUploads, dataUri } from './middleware/multer';

dotenv.config();

const app = express();
const port = (process.env.PORT || 8000);


app.use(cors());

app.set('appVersion', '/api/v1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('*', cloudinaryConfig);

// eslint-disable-next-line consistent-return
app.post('/upload', multerUploads, (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then((result) => {
      const image = result.url;
      return res.status(200).json({
        messge: 'Your image has been uploded successfully to cloudinary',
        data: {
          image,
        },
      });
    }).catch(err => res.status(400).json({
      messge: 'someting went wrong while processing your request',
      data: {
        err,
      },
    }));
  }
});

app.use(app.get('appVersion'), router);
app.use(app.get('appVersion'), userRouter);

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'Welcome to politico',
  });
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

app.get('*', (req, res) => {
  res.status(404).json({ error: 'The page cannot be found!' });
});


app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;
