import React from 'react'
import Header from '../components/Header'
import { getAllJSDocTagsOfKind } from 'typescript'
function Menu() {
    const menuItems = [
        "Bebidas Regular",
        "Especialidades",
        "Bolo Bao",
        "Puff Puff",
        "Fusion Oriental Sandwich",

        // "Bebidas Regular",
        // "Especialidades",
        // "Bolo Bao",
        // "Puff Puff",
        // "Fusion Oriental Sandwich",
        // "Bebidas Regular",
        // "Especialidades",
        // "Bolo Bao",
        // "Puff Puff",
        // "Fusion Oriental Sandwich",
        // "the fuck"
    ]
    return (
        <>
            <Header />
            <div>Menu menu menu</div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-dense 
                ">
                {
                    menuItems.map((d, i) => {
                        const odd = i % 2 === 0;
                        // const bgColor = odd ? "bg-yellow-tea" : "bg-white";
                        // const bgColor = "[&>*:nth-child(odd)]: bg-yellow-tea"
                        const bgColor = "";
                        return <>
                            <div key={i} className={bgColor + " " + "p-10 text-center hover:bg-yellow-tea cursor-pointer"}>
                                {d}
                            </div>
                        </>
                    })
                }
            </div >
        </>
    )
}

export default Menu