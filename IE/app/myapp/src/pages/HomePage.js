import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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

    return (
        <div>
            <TopBar onLogout={handleLogout} />
            <div style={styles.container}>
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
};

export default HomePage;
