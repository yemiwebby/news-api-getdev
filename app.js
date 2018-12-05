import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './src/routes/index';


const app = express();

// PORT 
const port = process.env.PORT || 3000;
app.set('port', port);

// logger
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Middleware
const enableCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
}
app.use(enableCrossDomain);
app.use(express.static("public"));

// Routes
routes(app);

// Wildcard route
app.get('/*', (req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    })
})

// Listen on a port
app.listen(port);

export default app;