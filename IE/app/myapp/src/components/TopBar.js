import React from 'react';

const TopBar = ({ onLogout }) => {
    return (
        <div style={styles.topBar}>
            <div style={styles.logo}>Logo</div>
            <div style={styles.menu}>
                <span style={styles.menuItem}>Projects</span>
                <span style={styles.menuItem} onClick={onLogout}>Logout</span>
            </div>
        </div>
    );
};

const styles = {
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff'
    },
    logo: { fontSize: '20px', fontWeight: 'bold' },
    menu: { display: 'flex', gap: '15px' },
    menuItem: {
        cursor: 'pointer',
        fontSize: '16px',
        textDecoration: 'underline'
    }
};

export default TopBar;
