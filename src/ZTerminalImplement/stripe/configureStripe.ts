import type { PaymentIntent } from './types'

export async function fetchConnectionToken(): Promise<string> {
    return fetch('http://localhost:3000/stripe/connection_token', {
        method: 'POST',
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            return data.secret
        })
}

export function unexpectedDisconnect() {
    console.log('Disconnected from reader')
}

export async function discoverReaderHandler(terminal) {
    const config = { simulated: true }

    const discoverResult = await terminal.discoverReaders(config)

    if (discoverResult.error) {
        console.log('Failed to discover')
        return
    }

    const readers = discoverResult.discoveredReaders || []
    if (!readers.length) {
        console.log('No available readers.')
        return
    }

    return readers[0]
}

//if i want to
export async function fetchPaymentIntent(
    amount: number,
    currency: string = 'usd'
): Promise<PaymentIntent> {
    return fetch('http://localhost:3000/stripe/create_payment_intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
    }).then(function (response) {
        return response.json()
    })
}

// export async function notifyBackend(orderId,  PaymentIntent) {

// }
