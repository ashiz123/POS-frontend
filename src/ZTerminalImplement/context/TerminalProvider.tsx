import { useState } from 'react'
import { TerminalContext } from './TerminalContext'
import { type TerminalInstance } from './TerminalContext'

export interface ActiveOrder {
    client_secret: string
    metaData: { orderId: string; businessId: string }
    amount: number
    currency: string
}

export const TerminalProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [terminal, setTerminal] = useState<TerminalInstance | null>(null)
    const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null)

    // const startPayment = (data: ActiveOrder) => {
    //     setActiveOrder(data)
    //     localStorage.setItem('active_order', JSON.stringify(data))
    // }

    // const cancelPayment = () => {
    //     setActiveOrder(null)
    //     localStorage.removeItem('active_order')
    // }

    return (
        <TerminalContext.Provider
            value={{
                terminal,
                setTerminal,
                activeOrder,
                setActiveOrder,
            }}
        >
            {children}
        </TerminalContext.Provider>
    )
}
