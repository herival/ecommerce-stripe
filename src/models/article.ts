import { Product } from "./product"

export interface Article {
    product: Product
    quantity: number
    sub_total: number
}