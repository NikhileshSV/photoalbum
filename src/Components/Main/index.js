import React, { useState, useEffect, useReducer } from "react";
import Header from "../Header";
import axios from "axios";
import Photos from "../Photos";
import NoContentFound from "../../UI/NoContentFound";
import ErrorMessage from "../../UI/ErrorMessage";

export const PhotoContext = React.createContext();
const PIXABAY_API = "https://pixabay.com/api/";

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_CONTENT":
            return {
                ...state,
                searchContent: action.value,
                photos: [],
                currentPage: 1
            }
        case "CHANGE_PAGE":
            return {
                ...state,
                currentPage: action.value
            }
        case "CLEAR_SEARCH":
            return {
                ...state,
                searchContent: "",
                photos: [],
                currentPage: 1
            }
        case "SET_PHOTOS":
            return {
                ...state,
                photos: action.value
            }
        default:
            return state
    }
}

const Main = () => {
    const initialState = {
        searchContent: "",
        currentPage: 1,
        photos: []
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingContent, setLoadingContent] = useState(true);
    const [showSearches, setShowSearches] = useState(false);
    const [searches, setSearches] = useState(JSON.parse(localStorage.getItem("searchList")) || [])

    useEffect(() => {
        loadPhotos()
    }, [state.searchContent, state.currentPage])

    const loadPhotos = () => {
        const params = {
            key: process.env.REACT_APP_HOME_KEY,
            page: state.currentPage,
            q: state.searchContent
        }
        axios({
            method: "GET",
            url: PIXABAY_API,
            params
        })
            .then((response) => {
                const hits = response.data.hits.map((hit) => {
                    return {
                        ...hit,
                        height: 200 + Math.ceil(Math.random() * 300)
                    }
                })
                dispatch({ type: "SET_PHOTOS", value: [...state.photos, ...hits] })
                setLoadingContent(!(state.photos.length >= response.data.totalHits))
            })
            .catch((error) => {
                setErrorMsg(error.message || "Something went Wrong!")
            });
    };


    let photoList = <Photos
        photos={state.photos}
        loadingContent={loadingContent}
    />
    let errorMessage = "";

    if (!loadingContent && !state.photos.length && !errorMsg) {
        photoList = <NoContentFound />
    }

    if (errorMsg) {
        photoList = "";
        errorMessage = <ErrorMessage message={errorMsg} />
    }

    return (
        <PhotoContext.Provider value={{
            searches,
            setSearches,
            showSearches,
            setShowSearches,
            state,
            dispatch
        }}>
            <Header />
            {photoList}
            {errorMessage}
        </PhotoContext.Provider>
    )

}

export default Main;
