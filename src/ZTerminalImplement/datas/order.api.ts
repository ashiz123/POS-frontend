interface OrderItem {
    _id: string
    productId: string
    batchId: string
    quantity: number
    price: number
}

interface Order {
    _id: string
    orderId: string
    status: string
    items: OrderItem[]
    total: number
    createdAt: string
    updatedAt: string
    __v: number
}

interface OrderResponseData {
    order: Order
    amount: number
}

interface OrderResponse {
    success: boolean
    data: OrderResponseData
    message: string
}

// Now create the object
export const orderResponse: OrderResponse = {
    success: true,
    data: {
        order: {
            orderId: '101',
            status: 'pending',
            items: [
                {
                    productId: '6991fc35a11189d5ceb8ca1d',
                    batchId: '69934d76cb32b0333a21f10e',
                    quantity: 1,
                    price: 99.99,
                    _id: '699c46e8d61e6357d59d5fa5',
                },
                {
                    productId: '6991fc35a11189d5ceb8ca1d',
                    batchId: '69934856f661d8cce962bd81',
                    quantity: 2,
                    price: 49.99,
                    _id: '699c46e8d61e6357d59d5fa6',
                },
            ],
            total: 199.97,
            _id: '699c46e8d61e6357d59d5fa4',
            createdAt: '2026-02-23T12:24:08.716Z',
            updatedAt: '2026-02-23T12:24:08.716Z',
            __v: 0,
        },
        amount: 199.97,
    },
    message: 'Ready to complete the order',
}

export const orderRequest = {
    items: [
        {
            productId: '698b5e7b010d6b4d4371e4e3',
            batchId: '6991fbd3a11189d5ceb8ca1b',
            quantity: 5,
            price: 99.99,
        },
    ],
}

export const completeOrder = {
    success: true,
    data: {
        id: 'pi_3TEYHB06AeLJE1ma06uPLziN',
        client_secret:
            'pi_3TEYHB06AeLJE1ma06uPLziN_secret_wYNrEaeuOZYBY486MtoGbPNY9',
        amount: 49995,
        currency: 'gbp',
        status: 'requires_payment_method',
        metadata: {
            orderId: '69c2c295e910c093fdf32a97',
            businessId: '698db24101683ab4bb6196ce',
        },
    },
    message: 'Order processing',
}
