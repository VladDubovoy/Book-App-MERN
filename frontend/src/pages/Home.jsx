import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import Search from "../components/Search.jsx";

function Home() {
    const [books, setBooks] = useState([]);
    const [filteredIds, setFilteredIds] = useState([]);
    const [query, setQuery] = useState(localStorage.getItem('query') || '');
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState(localStorage.getItem('type') || 'table');

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_API}/books`)
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    function toggleType( e ) {
        const type = e.target.dataset.type;
        setShowType( type );
        localStorage.setItem('type', type);
    }

    function filterBooks( books = [] ) {
        if ( query.trim() === '' ) {
            return books;
        }
        return books.filter( book => filteredIds.includes( book._id) );
    }

    return (
        <div className='p-4'>
            <h1 className='text-2xl'>Основи Візуального Програмування</h1>
            <h2 className='text-1xl'>Cтудент: ЗПІ-ЗП-21 Дубовий Владислав</h2>
            <hr/>
            <Search setFilteredIds={setFilteredIds} setLoading={setLoading} query={query} setQuery={setQuery}/>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    data-type='table'
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={toggleType}
                >
                    Table
                </button>
                <button
                    data-type='card'
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={toggleType}
                >
                    Card
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <h3 className='text-3xl my-8'>Книги</h3>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl'/>
                </Link>
            </div>
            { loading && <Spinner/> }
            { !loading && showType === 'table' && <BooksTable books={ filterBooks( books ) } /> }
            { !loading && showType === 'card' && <BooksCard books={ filterBooks( books ) } /> }
        </div>
    );
}

export default Home;
