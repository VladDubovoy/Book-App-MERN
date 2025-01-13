import React, { useState, useEffect } from 'react';
import axios from "axios";

const Search = ( props ) => {
    const { setResults, query, setQuery, setLoading } = props;
    const [error, setError] = useState('');

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/books/search?title=${query}`);
                setResults(response.data.data);
            } catch (err) {
                if (err.response && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(fetchData, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="max-w-xl mx-auto p-4">
            <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    Search for Books
                </label>
                <input
                    type="text"
                    id="search"
                    placeholder="Type a book title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
        </div>
    );
};

export default Search;
