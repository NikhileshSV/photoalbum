import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.module.css";

const ErrorMessage = ({message}) => {
    return (
        <div className={[styles.error,"d-flex justify-content-center align-items-center"].join(" ")}>
            {message}
        </div>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
}

export default ErrorMessage;
