//TODO: enforce types on menu items???
// BUT if we just keep everything tidy and in this file it's ok?

// enum MenuGroupDR {
//     BebidasRegular,
//     Especialidades,
//     BoloBao,
//     PuffPuff,
//     FusionOrientalSandwich
// }

// type MenuGroupDRStrings = keyof typeof MenuGroupDR

// export const itemToLinkDict1: { [key in MenuGroupDRStrings]: string } = {
//     "BebidasRegular": "beverages",
//     "Especialidades": "specials",
//     "BoloBao": "bolobao",
//     "PuffPuff": "puffpuff",
//     "FusionOrientalSandwich": "sandwich"
// }


export const itemToLinkDict = {
    "Bebidas Regular": "beverages",
    "Especialidades": "specials",
    "Bolo Bao": "bolobao",
    "Puff Puff": "puffpuff",
    "Fusion Oriental Sandwich": "sandwich"
}

export type MenuItem = {
    item: string,
    costInPeso: number,
    url?: string,
    description?: string,
    menuOptions?: {
        [optionName: string]: string[]
    },
    // itemType: "beverages" | "specials" | "bolobao" | "puffpuff" | "sandwich"
}

export const menuOptionsDict: { [key: string]: { [optionType: string]: string[] } } = {
    "beverages": {
        "size": ["S", "M", "L"],
        "ice": ["less", "regular", "more"],
        "sugar": ["less", "regular", "more"]
    }
}

export type MenuGroup = { [groupName: string]: MenuItem[] }

export const menuItems: MenuGroup = {
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
