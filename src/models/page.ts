export interface Page {
    _id: string
    name: string
    slug: string
    content: string
    isTop: boolean
    isBottom: boolean
    created_at: Date
}