import { loadStripeTerminal, type StripeTerminal } from '@stripe/terminal-js'
import {
    fetchConnectionToken,
    unexpectedDisconnect,
    discoverReaderHandler,
} from './configureStripe'

export const connectReader = async () => {
    const stripeTerminal: StripeTerminal | null = await loadStripeTerminal()

    if (!stripeTerminal) {
        console.error('Failed to load Stripe Terminal')
        return
    }

    const terminal = stripeTerminal.create({
        onFetchConnectionToken: fetchConnectionToken,
        onUnexpectedReaderDisconnect: unexpectedDisconnect,
    })

    const reader = await discoverReaderHandler(terminal)
    const result = await terminal.connectReader(reader) //reader connect

    if ('error' in result) {
        console.error('Failed to connect reader:', result.error)
    } else {
        console.log('Reader connected successfully ✅')
    }

    return terminal
}
