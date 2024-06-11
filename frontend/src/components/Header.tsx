import React from 'react'
import logo from "../imgs/logo-small.png"
import { slide as Menu } from 'react-burger-menu'
import "./burger-styles.css"

function Header() {
    return (
        <header className="m-0 grid">
            <Menu right>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="menu" className="menu-item" href="/menu">Menu</a>
                <a id="order" className="menu-item" href="/order">Order</a>
            </Menu>
            <a href="/" className="inline-block justify-self-center m-2">
                <img src={logo} />
            </a>
        </header>
    )
}

export default Header