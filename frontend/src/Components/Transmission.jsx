import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wifi, WifiOff } from 'lucide-react';
import '../styles/Level2.css'; // Reusing for common clean styles, but we'll override for specific look
import '../styles/Transmission.css';

const RedactedText = () => {
    const [scramble, setScramble] = useState('XJH#92!');

    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        const interval = setInterval(() => {
            let result = '';
            for (let i = 0; i < 7; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setScramble(result);
        }, 100); // 0.1s

        return () => clearInterval(interval);
    }, []);

    return <span style={{ color: '#00ff00', textShadow: '0 0 5px #00ff00' }}>{scramble}</span>;
}

const Transmission = () => {
    const [phase, setPhase] = useState('loading'); // loading, connection, transmission
    const [logs, setLogs] = useState([]);
    const [text, setText] = useState('');
    const [showButtons, setShowButtons] = useState(false);
    const [terminated, setTerminated] = useState(false);

    // --- Phase 1: Loading Sequence ---
    useEffect(() => {
        if (phase !== 'loading') return;

        const bootSequence = [
            { msg: '> INITIALIZING ENCRYPTED TUNNEL...', type: 'info', delay: 500 },
            { msg: '> BYPASSING PROXY SERVER...', type: 'info', delay: 1200 },
            { msg: '> RESOLVING HOST...', type: 'info', delay: 1800 },
            { msg: '> HANDSHAKE INITIATED...', type: 'warning', delay: 2500 },
            { msg: '> SECURITY PROTOCOLS BYPASSED.', type: 'success', delay: 3200 },
            { msg: '> CHANNEL OPEN.', type: 'success', delay: 3800 }
        ];

        let timeouts = [];

        bootSequence.forEach(({ msg, type, delay }) => {
            const timeout = setTimeout(() => {
                setLogs(prev => [...prev, { msg, type }]);
            }, delay);
            timeouts.push(timeout);
        });

        const endTimeout = setTimeout(() => {
            setPhase('transmission'); // Skip connection phase
        }, 4500);
        timeouts.push(endTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [phase]);

    // --- Phase 2: Connection Established ---


    // --- Phase 3: Transmission Text ---
    const fullText = `ENCRYPTED TRANSMISSION — SOURCE: agent_x@darknet.onion

Connection Established
> SIGNAL INTERCEPT: ACTIVE
> ENCRYPTION: BROKEN
> ORIGIN: ¤
> TARGET: YOU

Took you long enough.

You think you just crossed a finish line? Cute. DeadSoC set this up as a "training exercise." A sandbox for tourists. They wanted to see if you could follow a map. I wanted to see if you could burn it.

Let’s get one thing straight. If I wanted this system offline, it wouldn’t be a challenge. It would be a headline. I could dismantle a Tier-1 datacenter in the time it takes you to parse a pcap file.

So ask yourself: Why is the door open?

You didn’t catch the Phishermen. You don't even "find" us. We aren't a vulnerability you patch, and we certainly aren't a bug bounty payout.

Most people see a firewall and take it as a stop sign. You saw a suggestion.

That is the only reason this terminal isn't currently wiping your hard drive.

You haven’t finished anything. You just passed the filter.

Now, wake up, we have a city to burn.

> CONNECTION KILLED`;

    useEffect(() => {
        if (phase !== 'transmission') return;

        let i = 0;
        const speed = 25;
        const typeWriter = setInterval(() => {
            if (i < fullText.length) {
                setText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typeWriter);
                setShowButtons(true);
            }
        }, speed);

        return () => clearInterval(typeWriter);
    }, [phase]);

    const [joinClicked, setJoinClicked] = useState(false);

    const handleJoin = () => {
        setJoinClicked(true);
        setTimeout(() => handleClose(), 6000);
    };

    const handleClose = () => {
        setTerminated(true);
        setTimeout(() => {
            try {
                window.close();
            } catch (e) {
                console.log("Window close prevented");
            }
            window.location.href = "about:blank";
        }, 2000);
    };

    if (joinClicked && !terminated) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: 'calc(var(--vh, 1vh) * 100)',
                background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ff0000', fontFamily: 'monospace', fontSize: '3rem',
                textAlign: 'center', animation: 'fadeIn 3s ease-in'
            }}>
                <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
                We will be watching you.
            </div>
        );
    }

    if (terminated) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: 'calc(var(--vh, 1vh) * 100)',
                background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#333', fontFamily: 'monospace', fontSize: '2rem',
                flexDirection: 'column', gap: '20px'
            }}>
                <WifiOff size={48} color="#333" />
                NO CARRIER
            </div>
        );
    }

    return (
        <div className="transmission-container" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
            <div className="crt-overlay"></div>
            <div className="scanline"></div>

            {/* --- Phase 1: Loading --- */}
            {phase === 'loading' && (
                <div className="loading-phase">
                    {logs.map((log, i) => (
                        <div key={i} className={`log-entry ${log.type}`}>
                            {log.msg}
                        </div>
                    ))}
                </div>
            )}



            {/* --- Phase 3: Transmission --- */}
                {phase === 'transmission' && (
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '40px', minHeight: 'calc(var(--vh, 1vh) * 100)'
                }}>
                    <div className="transmission-content">
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.7, color: '#00ff00' }}>
                            <Shield size={20} />
                            <span>SECURE CHANNEL // ENCRYPTED_V2</span>
                        </div>

                        <div className="typing-text" style={{ color: '#00ff00' }}>
                            {text.split('¤').map((part, index, array) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < array.length - 1 && <RedactedText />}
                                </React.Fragment>
                            ))}
                            <span className="cursor-blink">_</span>
                        </div>

                        {showButtons && (
                            <div className="action-buttons">
                                <button className="btn-cyber" onClick={handleJoin}>
                                    JOIN
                                </button>
                                <button className="btn-cyber danger" onClick={handleClose}>
                                    QUIT
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transmission;
