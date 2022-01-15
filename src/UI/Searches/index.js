import React, { useRef, useEffect, useContext } from "react";
import { PhotoContext } from "../../Components/Main";
import styles from "./styles.module.css";

const Searches = () => {
    const ctx = useContext(PhotoContext);
    const modalRef = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!modalRef.current?.contains(event.target)) {
                ctx.setShowSearches(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const searchContent = (keyword) => {
        ctx.setShowSearches(false);
        ctx.dispatch({type: "SEARCH_CONTENT", value: keyword})
    }

    const clearKeyword = (searchedkeyword) => {
        const searches = ctx.searches.filter((keyword) => keyword !== searchedkeyword);
        localStorage.setItem("searchList", JSON.stringify(searches));
        ctx.setSearches(searches);
    }

    const clearSearches = () => {
        localStorage.removeItem("searchList");
        ctx.setSearches([]);
        ctx.setShowSearches(false);
    };

    return (
        <ul className={["dropdown-menu show", styles.dropdownMenu].join(" ")}>
            {ctx.searches.map((keyword, index) => {
                return (
                    <li
                        className={["dropdown-item d-flex justify-content-between", styles.dropdownItem].join(" ")}
                        key={keyword + index}
                    >
                        <span className={styles.keywords} onClick={() => searchContent(keyword)}>{keyword}</span>
                        <span className="btn-close" onClick={() => clearKeyword(keyword)}></span>
                    </li>
                );
            })}
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li>
                <div
                    className={["float-end btn btn-danger text-uppercase", styles.clearBtn].join(" ")}
                    onClick={clearSearches}
                >
                    clear
                </div>
            </li>
        </ul>
    );
};

export default Searches;
