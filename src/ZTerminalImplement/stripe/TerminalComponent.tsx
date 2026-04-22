import { useState } from 'react'
import { connectReader } from './connectReader'
import { useTerminal } from '../context/useTerminalContext'

export function TerminalComponent() {
    const { setTerminal } = useTerminal()
    const [message, setMessage] = useState('')

    const connectToReader = async () => {
        const terminal = await connectReader()
        if (!terminal) {
            console.error('Failed to connect to reader')
            setMessage('Failed to connect to reader')
            return
        }

        setTerminal(terminal)
        setMessage('Reader connected successfully ✅')
    }

    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="terminal-title">Terminal</span>
            </div>
            <div className="terminal-body">
                <div className="terminal-output">
                    <p>Welcome to the stripe terminal!</p>
                    {message && <p>{message}</p>}
                </div>
                <button onClick={connectToReader}> Connect Reader</button>
            </div>
        </div>
    )
}
