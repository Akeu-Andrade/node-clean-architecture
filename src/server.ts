import './infrastructure/config/di-container';
import express from 'express';
import routes from './infrastructure/routes/routes';

const app = express();
app.use(express.json());

const port = 3000;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});