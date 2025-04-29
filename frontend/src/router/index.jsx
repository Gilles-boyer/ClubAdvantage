import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../views/Home";
import Profil from "../views/Profil";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="profil" element={<Profil />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;