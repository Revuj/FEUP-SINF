import React, { useState } from "react";
import '../styles/Search.css';

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (

    <div className="field-container">
        <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />  
    </div>
    
    );
};

export default Search;