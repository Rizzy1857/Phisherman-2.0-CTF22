import { useState, useEffect } from 'react';
import { Trophy, Lock, Unlock, CheckCircle, XCircle, Terminal, Download, FileCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Level2.css'; // Reusing Level 2 styles for consistent theme
import config from '../config';

const Level3 = ({ userInfo, level3Solved }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [submission, setSubmission] = useState(null);
    const [isSolved, setIsSolved] = useState(level3Solved || false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const challenge = {
        title: "Reverse Engineering - License Validator",
        category: "Binary Analysis",
        difficulty: "Hard",
        points: 200,
        description: "Our intelligence team has intercepted a classified verification module used by the Phishermen syndicate. Your mission: Analyze the script, reverse-engineer the validation logic, and forge a valid license key (flag).",
    };

    useEffect(() => {
        setIsSolved(level3Solved || false);
    }, [level3Solved]);

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
        window.location.href = `${config.API_BASE_URL}/download/level3`;
    };

    const handleSubmit = async () => {
        if (!inputValue.trim()) {
            setErrorMessage("Please enter a license key");
            return;
        }

        setSubmitting(true);
        setErrorMessage('');

        try {
            const res = await fetch(`${config.API_BASE_URL}/solve-level3`, {
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
                setTimeout(() => navigate(0), 2000);
            } else {
                setSubmission('incorrect');
                setErrorMessage(response.message || "Invalid License Key");
                setTimeout(() => setSubmission(null), 2000);
            }
        } catch (err) {
            console.error("Submit failed:", err);
            setErrorMessage("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="level2-container" style={{ background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' }}>
            <div className="background-animation">
                <div className="bg-circle bg-circle-1" style={{ background: 'rgba(0, 255, 0, 0.1)' }}></div>
                <div className="bg-circle bg-circle-2" style={{ background: 'rgba(0, 255, 0, 0.05)' }}></div>
            </div>

            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(50)].map((_, i) => (
                        <div key={i} className="confetti-piece" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: '#00ff00' }}></div>
                    ))}
                </div>
            )}

            <div className="content-wrapper">
                <div className="level2-header">
                    <h1 className="level2-title" style={{ color: '#00ff00', textShadow: '0 0 10px rgba(0,255,0,0.5)' }}>
                        <Terminal className="title-icon" color="#00ff00" />
                        Level 3: Secure Validator
                    </h1>
                    <div className="points-display" style={{ borderColor: '#00ff00', color: '#00ff00' }}>
                        <Trophy className="points-icon" color="#00ff00" />
                        <span>{challenge.points} Points</span>
                    </div>
                </div>

                <div className="challenge-card" style={{ border: '1px solid #00ff00', boxShadow: '0 0 20px rgba(0,255,0,0.1)' }}>
                    <div className="challenge-header" style={{ background: 'rgba(0, 50, 0, 0.9)', borderBottom: '1px solid #00ff00' }}>
                        <div className="challenge-header-content">
                            <div className="challenge-info">
                                <div className="challenge-icon-wrapper" style={{ background: 'rgba(0,255,0,0.2)' }}>
                                    <FileCode className="challenge-icon" color="#00ff00" />
                                </div>
                                <div className="challenge-title-section">
                                    <h3 className="challenge-title" style={{ color: '#fff' }}>{challenge.title}</h3>
                                    <div className="challenge-meta">
                                        <span className="challenge-category" style={{ background: 'rgba(0,255,0,0.2)', color: '#00ff00' }}>{challenge.category}</span>
                                        <span className="challenge-difficulty" style={{ background: '#ff4444', color: '#fff' }}>{challenge.difficulty}</span>
                                    </div>
                                </div>
                            </div>
                            {isSolved ? <CheckCircle className="status-icon" color="#00ff00" /> : <Unlock className="status-icon" color="#fff" />}
                        </div>
                    </div>

                    <div className="challenge-body">
                        <div className="challenge-section">
                            <h4 className="section-title" style={{ color: '#00ff00' }}>MISSION BRIEFING</h4>
                            <p className="section-text" style={{ fontFamily: 'monospace', color: '#ccc' }}>{challenge.description}</p>
                        </div>

                        <div className="target-section">
                            <h4 className="section-title" style={{ color: '#00ff00' }}>EVIDENCE</h4>
                            <button onClick={handleDownload} className="submit-button" style={{ background: 'rgba(0,255,0,0.2)', border: '1px solid #00ff00', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Download size={20} />
                                <span>Download secure_validator.py</span>
                            </button>
                        </div>

                        <div className="submit-section">
                            <input
                                type="text"
                                placeholder="Enter Valid License Key..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isSolved || submitting}
                                className="flag-input"
                                style={{ borderColor: '#00ff00', color: '#fff', fontFamily: 'monospace' }}
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            />
                            <button onClick={handleSubmit} disabled={isSolved || submitting} className="submit-button" style={{ background: isSolved ? '#00ff00' : '#00aa00', color: '#000', fontWeight: 'bold' }}>
                                {isSolved ? "Access Granted" : submitting ? "Verifying..." : "Validate Key"}
                            </button>
                            {submission === 'incorrect' && <div className="feedback-box" style={{ background: 'rgba(255,0,0,0.2)', color: '#ff4444', border: '1px solid #ff4444', padding: '10px', marginTop: '10px' }}>{errorMessage}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Level3;
