import Header from '../components/Header'
import { itemToLinkDict, menuItems, MenuItem, menuOptionsDict } from "../utils/menu-data"
import tempTea from "../imgs/temp-tea.png"
import { Modal } from '../components/Modal'
import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

function Order() {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [selectedItemtype, setSelectedItemType] = useState("")
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [optionsModalContent, setOptionsModalContent] = useState(<></>)

    const [cart, setCart] = useLocalStorage("cart", [])
    // bring up a model for options for given item
    const handleItemSelect = (item: MenuItem, itemType: string) => {
        setSelectedItem(item);
        setSelectedItemType(itemType);
    }

    useEffect(() => { console.log(cart) }, [cart])

    // update the modal content on change of selectedItem
    useEffect(() => {
        if (selectedItem === null) {
            // handleDeselectItem(); // might inf loop
            return;
        };

        const makeOptionsModalContent = (item: MenuItem,) => {
            const itemType = selectedItemtype;
            console.log(`selected \`${item.item}\` of type \`${itemType}\``)
            const optionsDict = menuOptionsDict[itemType] ?? {};
            console.log(`options available: ${JSON.stringify(optionsDict)}`)

            const addToCart = () => {
                const finalItem = [
                    selectedItem,
                    selectedOptions
                ];
                setCart((cart: any) => [...cart, finalItem]);

                // TODO: visual indicator that item has been added to cart
                handleDeselectItem();
                return
            }

            // console.log(`option ${option} with values ${values}`)
            const makeOptionsElement = () => {
                return <div className="p-2">
                    {
                        Object.keys(optionsDict).map(option => {
                            const values = optionsDict[option];

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
                                            // console.log(selectedOptions);
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
                        onClick={() => addToCart()}>
                        Add to cart
                    </button>
                </div>
            }
            // return optionsElement();
            setOptionsModalContent(makeOptionsElement())
        }

        makeOptionsModalContent(selectedItem)
    }, [selectedItem, selectedOptions, selectedItemtype, setCart])

    const handleDeselectItem = () => {
        setSelectedItem(null);
        setSelectedOptions([]);
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
                selectedItem &&
                <Modal onClick={() => { handleDeselectItem() }}
                    children={optionsModalContent}
                />
            }
        </>
    )
}

export default Order