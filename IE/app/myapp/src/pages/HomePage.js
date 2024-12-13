import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
// import CreateNewProjectPopup from '../components/CreateNewProjectPopup';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const [newProjectName, setNewProjectName] = useState(''); // State for new project name
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id'); // Retrieve user_id from local storage

        if (!userId) {
            navigate('/signin'); // Redirect to sign-in page if user_id is missing
            return;
        }

        fetch(`http://localhost:5000/api/projects?user_id=${userId}`) // Replace with your API endpoint
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setFilteredProjects(data);
            });
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredProjects(
            projects.filter((project) =>
                project.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin'); // Redirect to sign-in page
    };

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    const handleCreateProject = () => {
        const userId = localStorage.getItem('user_id');
        if (!newProjectName.trim() || !userId) return;

        fetch('http://localhost:5000/api/projects', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newProjectName,
                user_id: userId,
            }),
        })
            .then((res) => res.json())
            .then((newProject) => {
                setProjects([...projects, newProject]);
                setFilteredProjects([...projects, newProject]);
                setNewProjectName('');
                setShowPopup(false);
            })
            .catch((err) => console.error('Error creating project:', err));
    };

    const handleCreateNewProject = () => {
        setShowPopup(true)
    }

    return (
        <div>
            <TopBar onLogout={handleLogout} />
            <div style={styles.container}>
                <button style={styles.createButton} onClick={handleCreateNewProject}>
                    New Project
                </button>
                <SearchBar value={searchQuery} onChange={handleSearch} />
                <div style={styles.cardContainer}>
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleProjectClick}
                        />
                    ))}
                </div>
            </div>
            {/* {showPopup && <CreateNewProjectPopup></CreateNewProjectPopup>} */}
            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h3>Create New Project</h3>
                        <input
                            type="text"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Project Name"
                            style={styles.input}
                        />
                        <div style={styles.popupActions}>
                            <button style={styles.createButton} onClick={handleCreateProject}>
                                Create
                            </button>
                            <button
                                style={styles.cancelButton}
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    createButton: {
        padding: '10px 20px',
        margin: '10px 0',
        cursor: 'pointer',
    },
    popupOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    popupActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cancelButton: {
        padding: '10px 20px',
        cursor: 'pointer',
    },
};

export default HomePage;
