import { useTerminal } from '../context/useTerminalContext'
import { orderRequest } from '../datas/order.api'
import { createOrder } from './order.api'

export function CreateOrderComponent() {
    const { setActiveOrder } = useTerminal()

    const payWithTerminal = async () => {
        const response = await createOrder(orderRequest)
        if (response.data) {
            setActiveOrder(response.data)
        }
    }

    const totalAmount = orderRequest.items.reduce((accumulator, item) => {
        return accumulator + item.price * item.quantity
    }, 0)

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                🛒 POS Checkout
            </h1>

            <div className="space-y-4 mb-8">
                {orderRequest.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold text-gray-700">
                                Batch: {item.batchId.slice(-4)}
                            </p>
                            <p className="text-sm text-gray-400">
                                {item.quantity} x £{item.price}
                            </p>
                        </div>
                        <p className="font-black text-gray-900">
                            £{(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center text-xl font-black mb-6">
                <p>Total Amount</p>
                <p id="display-total">{totalAmount}</p>
            </div>

            <div
                id="status-box"
                className="hidden p-3 rounded mb-4 text-center font-medium"
            ></div>

            <button
                id="pay-button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition duration-200"
                onClick={payWithTerminal}
            >
                Pay with Terminal
            </button>
        </div>
    )
}
