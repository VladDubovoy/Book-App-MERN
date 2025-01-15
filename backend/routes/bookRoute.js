import express from "express";
import { Book } from '../models/BookModel.js';

const router = express.Router();

// Route for Search books by title
router.get('/search', async ( request, response) => {
    try {
        const { title } = request.query;
        if ( !title ) {
            const books = await Book.find( {} );
            return response.status( 200 ).json( {
                count: books.length,
                data: books
            } );
        }
        const books = await Book.find({ title: new RegExp( title, 'i' ) }); // 'i' makes the search case-insensitive
        if (books.length === 0) {
            return response.status(404).send({ message: `No books found with title containing: ${title}` });
        }
        return response.status(200).json({ count: books.length, data: books });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get all books
router.get('/', async ( request, response ) => {
    try {
        const books = await Book.find( {} );
        return response.status( 200 ).json( {
            count: books.length,
            data: books
        } );
    } catch (error ) {
        console.log(error);
        response.status(500).send( { message: error.message } );
    }
} );

// Route for Get 1 book by ID
router.get('/:id', async ( request, response ) => {
    try {
        const { id } = request.params;
        const book = await Book.findById( id );
        if( !book ) {
            return response.status( 404 ).send( { message: `Nothing found by id: ${ id }`} );
        }
        return response.status( 200 ).json( book );
    } catch (error ) {
        console.log(error);
        response.status(500).send( { message: error.message } );
    }
} );

// Route for Create a book
router.post('/', async ( request, response ) => {
    try {
        if ( !request.body.title || !request.body.author || !request.body.publishYear ) {
            response.status(400).send({ message: 'Send all required fields: title, author, publishYear' } );
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create( newBook );
        return response.status( 201 ).send( book )

    } catch (error) {
        console.log( error.message );
        response.status(500).send({ message: error.message } );
    }
} );

// Route for Update a book by ID
router.put('/:id', async ( request, response ) => {
    try {
        if ( !request.body.title || !request.body.author || !request.body.publishYear ) {
            response.status(400).send({ message: 'Send all required fields: title, author, publishYear' } );
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate( id, request.body );
        if( !result ) {
            return response.status( 404 ).json( { message: `Nothing found by id: ${ id }`} );
        }
        return response.status( 200 ).send( { message: "Book has been updated successfully." } );
    } catch (error ) {
        console.log(error);
        response.status(500).send( { message: error.message } );
    }
} );

// Route for Delete a book by ID
router.delete('/:id', async ( request, response ) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete( id );
        if( !result ) {
            return response.status( 404 ).json( { message: `Nothing found by id: ${ id }`} );
        }
        return response.status( 200 ).json( { message: `Book has been successfully deleted`} );
    } catch (error ) {
        console.log(error);
        response.status(500).send( { message: error.message } );
    }
} );


export default router;
