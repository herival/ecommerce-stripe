export interface Product {
    _id: string
    name: string
    slug: string
    description: string
    stock: number
    imageUrls: Array<string>
    solde_price: number
    regular_price: number
    relatedProducts: Product[]
    updated_at: Date
    created_at: Date
}