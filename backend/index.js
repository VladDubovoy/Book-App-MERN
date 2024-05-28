import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import { PORT, MONGO_DB_URL } from './config.js';
import booksRouter from "./routes/bookRoute.js";

const app = express();

app.use( express.json() );
app.use( cors() );
app.get( '/', ( request, response) => {
    return response.status(200).send('Welcome to a Book App');
} );
app.use( '/books', booksRouter );

app.listen( PORT, () => {
    console.log(`App is listening on port: ${ PORT }`)
} );

mongoose
    .connect( MONGO_DB_URL )
    .then( () => {
        console.log('app is connected to the database')
    } )
    .catch( (error) => {
        console.log(error);
    } );

