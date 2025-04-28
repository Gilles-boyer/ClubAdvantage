import React from "react";
import Navigation from "../Navigation/navigation.jsx"
import Section from "../section/section.jsx";

function Main() {
    return (
        <>
        <main className="flex flex-1">
            <Navigation />
            <Section />
        </main>
        </>
    );
}

export default Main;