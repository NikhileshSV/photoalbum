import React from 'react';
import NoImageFound from "../../static/images/no_image_found.png";
import styles from "./styles.module.css";

const NoContentFound = () => {
    return (
        <div className={["d-flex align-items-center justify-content-center flex-column", styles.noPhotos].join(" ")}>
            <img src={NoImageFound} className="mb-2" alt="no-photos" />
            <h4 className="text-uppercase">no photos available</h4>
        </div>
    )
}

export default NoContentFound;
