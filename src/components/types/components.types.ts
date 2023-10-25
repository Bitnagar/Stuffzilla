export interface FakeStoreProducts {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string
    image: string,
    rating: { rate: number, count: number }
}

export interface Product {
    details: {
        category: string,
        description: string,
        id: number,
        image: string,
        price: number,
        rating: {
            count: number,
            rate: number
        },
        title: string
    }
    product_id: number,
    quantity: number
}