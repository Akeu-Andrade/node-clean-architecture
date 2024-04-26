import express from 'express';
import routes from './infrastructure/routes/routes';
import './infrastructure/databases/mongo';

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});