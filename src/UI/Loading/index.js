import React from 'react';
import styles from './styles.module.css';

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loading;
