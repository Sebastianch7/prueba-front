import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Accion from '../pages/Accion';

function RoutesApp({}) {
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Accion />} />
            <Route exact path="/edit/:id/" element={<Accion />} />
        </Routes>
    </BrowserRouter>
    );
}

export default RoutesApp;
