import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const ProjectPage = () => {
    const { id } = useParams(); // Project ID from the URL
    const navigate = useNavigate();

    const [entries, setEntries] = useState([]);
    const [editedEntries, setEditedEntries] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the project entries from the API
        fetch(`http://localhost:5000/api/projects/${id}/entries`)
            .then((res) => res.json())
            .then((data) => {
                setEntries(data);
                setLoading(false);
            });
    }, [id]);

    const handleLabelChange = (rowId, newLabel) => {
        setEditedEntries((prev) => ({
            ...prev,
            [rowId]: newLabel,
        }));
    };

    const handleSave = () => {
        const changes = Object.entries(editedEntries).map(([rowId, label]) => ({
            id: rowId,
            label,
        }));

        fetch(`http://localhost:5000/api/projects/${id}/entries`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ changes }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert('Changes saved successfully!');
                    // Reset edited entries
                    setEditedEntries({});
                } else {
                    alert('Failed to save changes.');
                }
            });
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <TopBar onLogout={handleLogout} />
            <div style={styles.container}>
                <h2>Project Entries</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Text</th>
                            <th>Label</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.text}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={editedEntries[entry.id] || entry.label || ''}
                                        onChange={(e) =>
                                            handleLabelChange(entry.id, e.target.value)
                                        }
                                        style={styles.input}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleSave} style={styles.button}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '5px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ProjectPage;
