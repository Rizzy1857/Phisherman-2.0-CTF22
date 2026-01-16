import { useState, useEffect } from 'react';
import { Trophy, Lock, Unlock, CheckCircle, XCircle, Terminal, Download, FileCode, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Level2.css'; // Reusing Level 2 styles for consistent theme
import config from '../config';

const Level4 = ({ userInfo, level4Solved }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [submission, setSubmission] = useState(null);
    const [isSolved, setIsSolved] = useState(level4Solved || false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const challenge = {
        title: "Level 4 - The Source",
        category: "Web Security",
        difficulty: "Expert",
        points: 500,
        description: "This is the end of the line. We have intercepted a final transmission pointing to the location of the Phishermen's secrets. It seems to be hidden in plain sight.",
    };

    useEffect(() => {
        setIsSolved(level4Solved || false);
    }, [level4Solved]);

    useEffect(() => {
        async function checklogin() {
            try {
                const res = await fetch(`${config.API_BASE_URL}/checklogin`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const response = await res.json();
                if (!response.success) {
                    navigate('/login');
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            }
        }
        checklogin();
    }, [navigate]);

    const handleDownload = () => {
        window.location.href = `${config.API_BASE_URL}/download/level4_transmission.txt`;
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            setErrorMessage("Please enter a flag");
            return;
        }

        setSubmitting(true);
        setErrorMessage('');

        try {
            const res = await fetch(`${config.API_BASE_URL}/solve-level4`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                credentials: "include",
                body: JSON.stringify({
                    flag: inputValue.trim()
                })
            });

            const response = await res.json();

            if (response.success) {
                setIsSolved(true);
                setSubmission('correct');
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
                setTimeout(() => navigate('/transmission'), 2000);
            } else {
                setSubmission('incorrect');
                setErrorMessage(response.message || "Incorrect flag");
                setTimeout(() => setSubmission(null), 2000);
            }
        } catch (err) {
            console.error("Submit failed:", err);
            setErrorMessage("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // Styling: Red/Dark Theme for "DedSoC" vibe (Structure identical to Level 3, just color swaps)
    return (
        <div className="level2-container" style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' }}>
            <div className="background-animation">
                <div className="bg-circle bg-circle-1" style={{ background: 'rgba(255, 0, 0, 0.1)' }}></div>
                <div className="bg-circle bg-circle-2" style={{ background: 'rgba(255, 0, 0, 0.05)' }}></div>
            </div>

            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: '#ff4444' }}></div>
                    ))}
                </div>
            )}

            <div className="content-wrapper">
                <div className="level2-header">
                    <h1 className="level2-title" style={{ color: '#ff4444', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
                        <Shield className="title-icon" color="#ff4444" />
                        Level 4: Operation DedSoC
                    </h1>
                    <div className="points-display" style={{ borderColor: '#ff4444', color: '#ff4444' }}>
                        <Trophy className="points-icon" color="#ff4444" />
                        <span>{challenge.points} Points</span>
                    </div>
                </div>

                <div className="challenge-card" style={{ border: '1px solid #ff4444', boxShadow: '0 0 20px rgba(255,0,0,0.1)' }}>
                    <div className="challenge-header" style={{ background: 'rgba(50, 0, 0, 0.9)', borderBottom: '1px solid #ff4444' }}>
                        <div className="challenge-header-content">
                            <div className="challenge-info">
                                <div className="challenge-icon-wrapper" style={{ background: 'rgba(255,0,0,0.2)' }}>
                                    <FileCode className="challenge-icon" color="#ff4444" />
                                </div>
                                <div className="challenge-title-section">
                                    <h3 className="challenge-title" style={{ color: '#fff' }}>{challenge.title}</h3>
                                    <div className="challenge-meta">
                                        <span className="challenge-category" style={{ background: 'rgba(255,0,0,0.2)', color: '#ff4444' }}>{challenge.category}</span>
                                        <span className="challenge-difficulty" style={{ background: '#ff4444', color: '#fff' }}>
                                            {isSolved ? "COMPLETED" : "EXPERT"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {isSolved ? <CheckCircle className="status-icon" color="#ff4444" /> : <Unlock className="status-icon" color="#fff" />}
                        </div>
                    </div>

                    <div className="challenge-body">
                        <div className="challenge-section">
                            <h4 className="section-title" style={{ color: '#ff4444' }}>FINAL MISSION</h4>
                            <p className="section-text" style={{ fontFamily: 'monospace', color: '#ccc' }}>{challenge.description}</p>
                        </div>

                        <div className="target-section">
                            <h4 className="section-title" style={{ color: '#ff4444' }}>INTERCEPTED INTEL</h4>
                            <button onClick={handleDownload} className="submit-button" style={{ background: 'rgba(255,0,0,0.2)', border: '1px solid #ff4444', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Download size={20} />
                                <span>Download Transmission</span>
                            </button>
                        </div>

                        <div className="submit-section">
                            <input
                                type="text"
                                placeholder="Enter Final Flag..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isSolved || submitting}
                                className="flag-input"
                                style={{ borderColor: '#ff4444', color: '#fff', fontFamily: 'monospace' }}
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            />
                            <button onClick={handleSubmit} disabled={isSolved || submitting} className="submit-button" style={{ background: isSolved ? '#ff4444' : '#aa0000', color: '#fff', fontWeight: 'bold' }}>
                                {isSolved ? "Mission Accomplished" : submitting ? "Verifying..." : "Submit Final Flag"}
                            </button>
                            {submission === 'incorrect' && <div className="feedback-box" style={{ background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid #ff4444', padding: '10px', marginTop: '10px' }}>{errorMessage}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Level4;
