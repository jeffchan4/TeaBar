import Header from '../components/Header'
import { itemToLinkDict, menuItems, MenuItem } from "../utils/menu-data"
import tempTea from "../imgs/temp-tea.png"

function Order() {
    const handleAddCart = (item: MenuItem) => {
        console.log(item)
    }
    return (
        <>
            <Header />
            {
                Object.values(itemToLinkDict).map(d => {
                    const itemsInGroup = menuItems[d];
                    //TODO: captalize the category name correctly
                    const itemElements = itemsInGroup.map(d1 => {
                        return <>
                            <div>
                                <img className="" src={d1.url || tempTea} alt={d1.description || d1.item} />
                                <p className="font-bold"> {d1.item}</p>
                                <p className=""> {d1.costInPeso} </p>
                                {/* <button className="btn-std" onClick={() => handleAddCart(d1)}> Add to cart </button> */}
                            </div>
                        </>
                    })
                    return <>
                        <div className="px-9 my-9">
                            <h3 className="text-3xl my-8"> {d} </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-4">
                                {itemElements}
                            </div>
                        </div>
                    </>
                })
            }
        </>
    )
}

export default Order