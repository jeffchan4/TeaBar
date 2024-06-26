import { MenuItem } from "./menu-data"

export type CartType = {
    item: MenuItem,
    options: string[],
    copies: number
}[]