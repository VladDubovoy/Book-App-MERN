import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            { books.length === 0
                ? <h2 className='px-4'>No books found</h2>
                : books.map((item) => (
                <BookSingleCard key={item._id} book={item} />
            ))}
        </div>
    );
};

export default BooksCard;
