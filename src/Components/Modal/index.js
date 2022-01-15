import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import styles from "./styles.module.css";

const Modal = ({ imageContent, setTogglePopup }) => {
    const modalImage = useRef();
    const [showDownload, setShowDownload] = useState(false);

    useEffect(() => {
        const img = modalImage.current;
        if (img && img.complete) {
            handleImageLoaded();
        }
    }, []);

    const handleImageLoaded = () => {
        setShowDownload(true);
    };

    const downloadImage = () => {
        axios({
            url: imageContent,
            method: "GET",
            responseType: "blob",
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            const imageName = response.config.url.split("/");
            link.setAttribute("download", imageName[imageName.length - 1]);
            document.body.appendChild(link);
            link.click();
        });
    };

    return (
        <div className={["modal", styles.modal].join(" ")}>
            <div className={["modal-close float-end", styles.modalClose].join(" ")} onClick={() => setTogglePopup(false)}>
                <span className={["btn-close", styles.closeIcon].join(" ")}></span>
            </div>
            <div className={["modal-dialog", styles.modalDialog].join(" ")}>
                <figure>
                    <img
                        className={["modal-image", styles.modalImage].join(" ")}
                        ref={modalImage}
                        onLoad={handleImageLoaded}
                        alt="expanded-view"
                        src={imageContent}
                    />
                    {showDownload === true && (
                        <figcaption
                            onClick={downloadImage}
                            className={[styles.figureCaption, "d-flex jusitfy-content-center align-items-center"].join(" ")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-download"
                                viewBox="0 0 16 16"
                            >
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                        </figcaption>
                    )}
                </figure>
            </div>
        </div>
    );
};

Modal.propTypes = {
    imageContent: PropTypes.string.isRequired,
    setTogglePopup: PropTypes.func.isRequired
}

export default Modal;
