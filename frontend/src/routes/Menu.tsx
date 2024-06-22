import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import tempTea from "../imgs/temp-tea.png"
import { itemToLinkDict, menuItems } from "../utils/menu-data"

function Menu() {


    const itemType = useParams().itemType;
    console.log(itemType);
    const renderItems = (itemType: string | undefined) => {
        if (itemType !== undefined && !Object.keys(menuItems).includes(itemType)) {
            return <div>
                Invalid menu item type
            </div>
        }

        if (itemType === undefined) {
            return Object.entries(itemToLinkDict).map(([k, v], i) => {
                const bgColor = "";
                return <>
                    <a key={i} className={bgColor + " " + "p-10 text-center hover:bg-yellow-tea cursor-pointer"}
                        href={`/menu/${v}`}>
                        {k}
                    </a>
                </>
            })
        }

        return menuItems[itemType].map((d, i) => {
            const tempImgURL = tempTea;
            return <>
                <div key={i} className="flex flex-col items-center py-2 my-2">
                    <img src={d.url || tempImgURL} className="w-1/2 h-auto" />
                    <p>
                        {d.item}

                    </p>
                    <p>
                        {d.costInPeso}
                    </p>
                </div>
            </>
        })
    }

    return (
        <>
            <Header />
            {/* <div>Menu menu menu</div> */}
            <div className="text-center text-3xl my-8"> {itemType} </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-dense">
                {
                    renderItems(itemType)
                }
            </div >
        </>
    )
}

export default Menu