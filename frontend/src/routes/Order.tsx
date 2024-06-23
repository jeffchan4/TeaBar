import Header from '../components/Header'
import { itemToLinkDict, menuItems, MenuItem, menuOptionsDict } from "../utils/menu-data"
import tempTea from "../imgs/temp-tea.png"
import { Modal } from '../components/Modal'
import { useState } from 'react'

function Order() {
    const handleAddCart = (item: MenuItem) => {
        console.log(item)
    }

    const [showItemSelectModal, setItemSelectModal] = useState(false);
    const [itemSelectChildren, setItemSelectChildren] = useState(<div></div>)
    const itemSelectModal = () => {
        return <>
            <Modal onClick={() => { }} children={itemSelectChildren} />
        </>
    }

    // bring up a model for options for given item
    const handleItemSelect = (item: MenuItem, itemType: string) => {
        console.log(`selected ${item.item}`)
        const optionsDict = menuOptionsDict[itemType] ?? {};

        const optionsElement = () => {
            return <>
                {
                    Object.keys(optionsDict).map(option => {
                        const values = optionsDict[option];

                        // append the option to the "receipt" data struct
                        // and gray out the other options
                        // IT'S A MULTI SELECT FUCK
                        // TODO: make a receipt data struct
                        const handleSelectOption = (option: string, val: string) => {
                            console.log(`selected ${val} for ${option} type`);

                        }

                        return <div className="flex justify-between">
                            {
                                values.map(val => {
                                    return <button onClick={() => handleSelectOption(option, val)}>
                                        {val}
                                    </button>
                                })
                            }
                        </div>
                    })
                }
            </>
        }

        setItemSelectChildren(optionsElement());
        setItemSelectModal(true);

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
                            <div className="hover:border-2 hover:border-black rounded-lg overflow-hidden p-6 cursor-pointer"
                                onClick={() => handleItemSelect(d1, d)}>
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
                            <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-10">
                                {itemElements}
                            </div>
                        </div>
                    </>
                })
            }

            {
                showItemSelectModal && itemSelectModal()
            }
        </>
    )
}

export default Order