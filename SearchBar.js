import React, { useState } from 'react';
import axios from 'axios';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5000/search?query=${query}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResults(response.data);
        } catch (error) {
            alert('Error fetching search results.');
        }
    };

    return (
        <div>
            <h1>Search Users</h1>
            <input
                type="text"
                placeholder="Search by name, skills, etc."
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.study_program}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
