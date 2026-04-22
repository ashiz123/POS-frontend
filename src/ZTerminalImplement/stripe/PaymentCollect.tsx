// import { useEffect, useState } from 'react'
// import { fetchPaymentIntent } from './configureStripe'
// import type { PaymentIntent } from './types'

import { useTerminal } from '../context/useTerminalContext'

export const PaymentCollect = () => {
    // const [intent, setIntent] = useState<PaymentIntent | null>(null)
    const { terminal, activeOrder } = useTerminal()
    console.log('payment collect', activeOrder)

    // useEffect(() => {
    //     const getPaymentIntent = async () => {
    //         try {
    //             const paymentIntent = await fetchPaymentIntent(110, 'gbp')
    //             setIntent(paymentIntent)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     getPaymentIntent()
    // }, [])

    const collectPayment = async () => {
        if (!activeOrder) {
            return
        }

        if (!terminal) {
            console.error('Terminal is not connected')
            return
        }

        if (!activeOrder.client_secret) {
            console.error('PaymentIntent or client_secret missing')
            return
        }

        const collectResult = await terminal.collectPaymentMethod(
            activeOrder.client_secret
        )

        if ('error' in collectResult) {
            console.error(
                'Failed to collect payment method',
                collectResult.error
            )
            return
        }

        const pIntent = collectResult.paymentIntent

        const processResult = await terminal.processPayment(pIntent)
        if ('error' in processResult) {
            console.error('Failed to process payment', processResult.error)
            return
        }

        console.log('payment successful', processResult.paymentIntent)
        return processResult.paymentIntent
    }

    return (
        <div>
            <button onClick={collectPayment}> Pay me </button>
        </div>
    )
}
