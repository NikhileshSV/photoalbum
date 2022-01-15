import React, { useState, useContext, useEffect } from 'react';
import Searches from "../Searches";
import { PhotoContext } from "../../Components/Main";
import styles from "./styles.module.css";

const Search = () => {
    const ctx = useContext(PhotoContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(ctx.state.searchContent)
    }, [ctx.state.searchContent])

    const clearSearch = () => {
        setSearch("")
        ctx.dispatch({ type: "CLEAR_SEARCH" })
    }

    const searchResults = () => {
        if (!search.trim()) return;
        let getSearches = [...ctx.searches];
        if (!getSearches.map(e => e.toLocaleLowerCase()).includes(search.toLocaleLowerCase())) {
            if (getSearches.length > 5) {
                getSearches.shift();
            }
            getSearches.push(search);
            localStorage.setItem("searchList", JSON.stringify(getSearches));
            ctx.setSearches(getSearches);
        }
        ctx.setShowSearches(false);
        ctx.dispatch({type: "SEARCH_CONTENT", value: search})
    };

    const clearButton = search && <div className={[styles.btnClose, "btn-close"].join(" ")} onClick={clearSearch}></div>

    return (
        <div className={["dropdown mt-2", styles.dropdown].join(" ")}>
            <div className={["input-group", styles.searchBar].join(" ")}>
                <input
                    type="text"
                    value={search}
                    className={["form-control", styles.searchContent].join(" ")}
                    placeholder="search"
                    aria-describedby="button-addon2"
                    onClick={() => ctx.setShowSearches(true)}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyPress={(event) => event.key === "Enter" && searchResults()}
                />
                {clearButton}
                <div
                    className={["d-flex align-items-center justify-content-center", styles.searchIcon].join(" ")}
                    id="button-addon2"
                    onClick={searchResults}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
            </div>
            {ctx.showSearches === true && ctx.searches.length > 0 && <Searches />}
        </div>
    )
}

export default Search;
