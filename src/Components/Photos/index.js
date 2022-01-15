import React, { useState, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import { PhotoContext } from "../Main";
import PropTypes from 'prop-types';
import MasonryLayout from "../../UI/Masonry";
import Loading from "../../UI/Loading";
import styles from "./styles.module.css";
import Modal from "../Modal";

const Photos = ({ loadingContent }) => {
    const ctx = useContext(PhotoContext);
    const [imageContent, setImageContent] = useState({});
    const [togglePopup, setTogglePopup] = useState(false);

    const openPhotoModal = (content = {}) => {
        setImageContent(content);
        setTogglePopup(true);
    };

    const onScroll = (event) => {
        setTimeout(() => {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            if (scrollTop + clientHeight === scrollHeight) {
                ctx.dispatch({
                    type: "CHANGE_PAGE",
                    value: ctx.state.currentPage + 1
                });
            }
        }, 2000)
    }

    const photoList = useMemo(() => {
        return ctx.state.photos.map((element, index) => {
            return (
                <figure key={index} className={styles.figureTag} style={{ height: `${element.height}px` }}>
                    <img
                        className={styles.photoImages}
                        alt={element.user}
                        onClick={() => openPhotoModal(element.largeImageURL)}
                        src={element.webformatURL}
                    />
                    <figcaption className={[styles.figureCaption, "d-flex justify-content-center align-items-center"].join(" ")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className={["bi", "bi-eye", styles.eye].join(" ")}
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                        {element.views}
                    </figcaption>
                </figure>
            );
        })
    }, [ctx.state.photos])

    const loading = loadingContent === true && <Loading />;

    const modal = togglePopup === true && ReactDOM.createPortal(
        <Modal
            imageContent={imageContent}
            setTogglePopup={setTogglePopup}
        />,
        document.getElementById('modal-container'))

    return (
        <>
            <section className={styles.photoSection} onScroll={onScroll}>
                <MasonryLayout>
                    {photoList}
                </MasonryLayout>
                {loading}
            </section>
            {modal}
        </>
    )
};

Photos.propTypes = {
    loadingContent: PropTypes.bool.isRequired
}

export default Photos;
