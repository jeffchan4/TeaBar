import Header from '../components/Header'
import { useParams } from 'react-router-dom'
function Menu() {
    const itemToLinkDict = {
        "Bebidas Regular": "beverages",
        "Especialidades": "specials",
        "Bolo Bao": "bolobao",
        "Puff Puff": "puffpuff",
        "Fusion Oriental Sandwich": "sandwich"
    }

    type MenuItem = {
        item: string,
        costInPeso: number,
        url?: string
    }
    type MenuGroup = { [groupName: string]: MenuItem[] }
    const menuItems: MenuGroup = {
        "beverages": [
            {
                item: "Te Negro Latte",
                costInPeso: 200,
            },
            {
                item: "Te Verde Latte",
                costInPeso: 200,
            },
            {
                item: "Oolong Te Latte",
                costInPeso: 200,
            },
            {
                item: "Lychee Te Latte",
                costInPeso: 200,
            },
            {
                item: "Mango Te Latte",
                costInPeso: 200,
            },
            {
                item: "Chinola Te Latte",
                costInPeso: 200,
            },
            {
                item: "Durazno Te Latte",
                costInPeso: 200,
            },
            {
                item: "Manzana Te Latte",
                costInPeso: 200,
            }
        ],
        "specials": [
            {
                item: "Sol Citrico Te Verde",
                costInPeso: 280,
            },
            {
                item: "Fresco Limonada Te Verde",
                costInPeso: 250,
            },
            {
                item: "Fresca Fresa Te Verde",
                costInPeso: 250,
            },
            {
                item: "Matcha-Fresa Latte",
                costInPeso: 250,
            },
            {
                item: "Tiger Sugar Latte",
                costInPeso: 280,
            },
            {
                item: "Taro Queso Espuma Latte",
                costInPeso: 250,
            },
        ],
        "sandwich": [
            {
                item: "Pollo",
                costInPeso: 350
            },
            {
                item: "Cerdo",
                costInPeso: 400
            }
        ],
        "bolobao": [
            {
                item: "Queso crema",
                costInPeso: 80
            },
            {
                item: "Crema du Huevo",
                costInPeso: 80
            },
            {
                item: "Pina",
                costInPeso: 80
            },
            {
                item: "Coco Rallado",
                costInPeso: 80
            }
        ],
        "puffpuff": [
            {
                item: "Vanilla",
                costInPeso: 100
            },
            {
                item: "Chocolate",
                costInPeso: 120
            },
            {
                item: "Tiger Sugar",
                costInPeso: 130
            },
            {
                item: "Matcha",
                costInPeso: 130
            }
        ]
    }


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
            return <>
                <div key={i}>
                    <img src={d.url || "/"} />
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
            <div>Menu menu menu</div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-dense">
                {
                    renderItems(itemType)
                }
            </div >
        </>
    )
}

export default Menu