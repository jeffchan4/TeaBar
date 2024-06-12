import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import Order from './Order';
import Menu from './Menu';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu/:itemType?" element={<Menu />} />
            <Route path="/order" element={<Order />} />
        </Routes>
    );
}

export default App;
