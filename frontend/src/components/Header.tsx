import { ReactElement } from "react"
import logo from "../imgs/logo-small.png"
import { slide as BurgerMenu } from 'react-burger-menu'
import "./burger-styles.css"

function Header({
    children
}:{
    children?: ReactElement
}) {
    return (
        <header className="m-0 grid">
            <BurgerMenu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="menu" className="menu-item" href="/menu">Menu</a>
                <a id="order" className="menu-item" href="/order">Order</a>
            </BurgerMenu>
            <a href="/" className="inline-block justify-self-center m-2">
                <img src={logo} />
            </a>
            {children}
        </header>
    )
}

export default Header