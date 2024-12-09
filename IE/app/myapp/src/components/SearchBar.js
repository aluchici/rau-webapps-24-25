import React from 'react';

const SearchBar = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search projects..."
            style={styles.input}
        />
    );
};

const styles = {
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
};

export default SearchBar;
