import React from 'react';


const ProjectCard = ({ project, onClick }) => {
    return (
        <div style={styles.card} onClick={() => onClick(project.id)}>
            <h3>{project.name}</h3>
            <p>Last updated: {project.lastUpdated}</p>
            <p>
                {project.labelledExamples} / {project.totalExamples} examples labeled
            </p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        padding: '20px',
        margin: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '0.3s',
    },
    cardHover: {
        backgroundColor: '#f9f9f9',
    },
};

export default ProjectCard;
