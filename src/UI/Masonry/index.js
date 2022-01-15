import React, { useState, useEffect, useCallback } from "react";

const useWindowWidth = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    const handleResize = useCallback(() => {
        if (!hasMounted) return
        setWidth(window.innerWidth)
    }, [hasMounted])

    useEffect(() => {
        if (hasMounted) {
            window.addEventListener("resize", handleResize)
            handleResize()
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [hasMounted, handleResize])

    return width
}

const MasonryLayout = ({ children }) => {
    let columnWrapper = {};
    let result = [];
    let columns = 4
    let windowWidth = useWindowWidth()

    switch (true) {
        case windowWidth <= 700: columns = 1; break;
        case windowWidth <= 900: columns = 2; break;
        default: columns = 4
    }

    for (let i = 0; i < children.length; i++) {
        const columnIndex = i % columns;
        columnWrapper = {
            ...columnWrapper,
            [`column${columnIndex}`]: [
                columnWrapper[`column${columnIndex}`],
                <div
                    key={`${i}-${Math.round(Math.random(1, 1000) * 100)}`}
                    className="mb-2 flex-grow-1 flex-shrink-1"
                >
                    {children[i]}
                </div>
            ]
        }
    }

    for (let i = 0; i < columns; i++) {
        result.push(
            <div
                key={i}
                className={i < columns-1 ? "me-2" : ""}
            >
                {columnWrapper[`column${i}`]}
            </div>
        );
    }

    return (
        <section className="d-flex">
            {result}
        </section>
    );
}

export default MasonryLayout;
