import React from "react";
import Search from "../../UI/Search";
import CameraImage from "../../static/images/camera.png"
import styles from "./styles.module.css";

const Header = () => {
    return (
        <div
            className={[styles.headingContainer, "d-flex flex-column justify-content-center align-items-center"].join(" ")}
        >
            <h5 className={[styles.heading, "text-uppercase d-flex align-items-center"].join(" ")}>
                <img src={CameraImage} className={styles.cameraIcon} alt="camera"/>
                photo album
            </h5>
            <Search />
        </div>
    );
};

export default Header;
