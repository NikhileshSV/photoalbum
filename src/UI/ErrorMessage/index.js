import React from 'react'
import styles from "./styles.module.css";

const ErrorMessage = ({message}) => {
    return (
        <div className={[styles.error,"d-flex justify-content-center align-items-center"].join(" ")}>
            {message}
        </div>
    )
}

export default ErrorMessage;
