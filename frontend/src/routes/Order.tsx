import Header from '../components/Header'
import { itemToLinkDict, menuItems, MenuItem, menuOptionsDict } from "../utils/menu-data"
import tempTea from "../imgs/temp-tea.png"
import { Modal } from '../components/Modal'
import { useCallback, useEffect, useState } from 'react'

function Order() {
    const handleAddCart = (item: MenuItem) => {
        console.log(item)
    }

    const [showItemSelectModal, setItemSelectModal] = useState(false);
    const [itemSelectChildren, setItemSelectChildren] = useState(<div></div>)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    // const itemSelectModal = () => {
    //     return <>
    //         <Modal onClick={() => { setItemSelectModal(false) }} children={itemSelectChildren} />
    //     </>
    // }

    useEffect(() => {
        console.log(selectedOptions);
    }, [selectedOptions])

    // bring up a model for options for given item
    const handleItemSelect = (item: MenuItem, itemType: string) => {
        console.log(`selected ${item.item} of type ${itemType}`)
        const optionsDict = menuOptionsDict[itemType] ?? {};
        console.log(optionsDict)

        const addToCart = (item: MenuItem, options: string[]) => {
            // TODO: keep a "receipt" data struct in local storage?
            return
        }


        const optionsElement = () => {
            return <div className="p-2">
                {
                    Object.keys(optionsDict).map(option => {
                        const values = optionsDict[option];
                        console.log(`option ${option} with values ${values}`)

                        // append the option to the "receipt" data struct
                        // and gray out the other options
                        // IT'S A MULTI SELECT FUCK
                        // TODO: make a receipt data struct
                        const handleSelectOption = (option: string, val: string, dataToAdd: string) => {
                            // console.log(`selected ${val} for ${option} type`);

                            // const newValue = `${option}-${val}`
                            setSelectedOptions(selectedOptions => {
                                const temp = selectedOptions.filter(d => !d.includes(option))
                                return [...temp, dataToAdd]
                            });
                        }

                        return <div className="flex justify-between my-2">
                            <span> {option} </span>
                            <span className="inline-flex justify-between w-1/2">
                                {
                                    values.map(val => {
                                        const dataToAdd = `${option}-${val}`;
                                        const selected = selectedOptions.includes(dataToAdd);
                                        console.log(selectedOptions);
                                        const bgColor = selected ? "bg-green-500" : "bg-gray-400";
                                        return <>
                                            <button className={`btn-std ${bgColor}`}
                                                onClick={() => handleSelectOption(option, val, dataToAdd)}>
                                                {val}
                                            </button>
                                        </>
                                    })
                                }
                            </span>
                        </div>
                    })
                }
                <button className="btn-std bg-yellow-tea"
                    onClick={() => addToCart(item, selectedOptions)}>
                    Add to cart
                </button>
            </div>
        }

        console.log(optionsElement());
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
                showItemSelectModal && <Modal onClick={() => { setItemSelectModal(false) }} children={itemSelectChildren} />
            }
        </>
    )
}

export default Order