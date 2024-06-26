import { useState } from "react"
import { useLocalStorage } from "../utils/useLocalStorage"
import Header from "../components/Header"
import { CartType } from "../utils/extraTypes"
import { MenuItem } from "../utils/menu-data"
function Cart() {
    const [cart, setCart] = useLocalStorage<CartType>("teabar-cart", [])
    const handleDeleteItem = (item: MenuItem, options: string[]) => {
        return;
    }
    
    return (
        <>
            <Header/>
            <div>
                {
                    cart.map(({item, options, copies}) => {
                        return <>
                            <div className="">
                                <div className="flex bold">
                                    <p> {item.item} </p>
                                    <p> {item.costInPeso} </p>
                                </div>
                                <div>
                                    {options}
                                </div>
                                <div>
                                    {copies}
                                </div>
                                <button onClick={() => handleDeleteItem(item, options)}>
                                    Delete
                                </button>
                            </div>
                        </>
                    })
                }
            </div>
        </>
    )
}

export default Cart
