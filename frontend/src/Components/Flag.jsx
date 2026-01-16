import { useState, useEffect } from 'react';
import { Trophy, Lock, Unlock, CheckCircle, XCircle, Target, Brain, Code, Shield } from 'lucide-react';
import '../styles/Flag.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Flag = ({ flags, points, score }) => {
  const delay = (t) =>
    new Promise(resolve => setTimeout(resolve, t * 1000));
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState({})
  const [inputValues, setInputValues] = useState({});
  const [solvedChallenges, setSolvedChallenges] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // Initialize solved state from props
  useEffect(() => {
    if (flags && Array.isArray(flags)) {
      const solved = {};
      flags.forEach((flagId) => {
        if (flagId !== undefined && flagId !== null) {
          solved[flagId] = true;
        }
      });
      setSolvedChallenges(solved);
    }
  }, [flags]);

  // SECURITY: Flags are NOT stored here - only challenge metadata
  const challenges = [
    {
      id: 0,
      title: "Basic Level - The Hidden Message",
      category: "Cryptography",
      difficulty: "Easy",
      points: 100,
      icon: Code,
      description: "A classified document has been intercepted containing an encoded message. Your mission is to decode it and retrieve the hidden flag.",
      hint: "This encoding uses exactly 64 characters. Think Base...",
      color: "cyan-blue",
      file: "challenge1_secret.txt"
    },
    {
      id: 1,
      title: "SQL Injection Master",
      category: "Web Security",
      difficulty: "Medium",
      points: 500,
      icon: Shield,
      description: "SecureBank's employee portal has a vulnerability. Bypass the authentication to gain admin access and retrieve the flag.",
      hint: "What if the username field doesn't properly sanitize quotes?",
      color: "purple-pink",
      file: "challenge2_login.html"
    },
    {
      id: 2,
      title: "Reverse Engineering",
      category: "Binary",
      difficulty: "Hard",
      points: 300,
      icon: Brain,
      description: "A license validation program has been captured. Analyze the source code to find the hidden license key (flag) embedded in the hex data.",
      hint: "Each hex value represents an ASCII character. 0x43='C', 0x54='T'... Use chr() in Python!",
      color: "orange-red",
      file: "challenge3_crackme.py"
    },
    {
      id: 3,
      title: "Network Forensics",
      category: "Forensics",
      difficulty: "Expert",
      points: 450,
      icon: Target,
      description: "We intercepted suspicious network traffic. The message appears to be encrypted using a simple cipher. Decrypt it to find the flag.",
      hint: "Really? U want hint at this level?",
      color: "green-emerald",
      file: "challenge4_forensics.txt"
    }
  ];

  // SECURITY: Server-side flag validation
  const handleSubmit = async (challengeId) => {
    const userInput = inputValues[challengeId] || '';

    if (!userInput.trim()) {
      setErrorMessages(prev => ({ ...prev, [challengeId]: "Please enter a flag" }));
      return;
    }

    setSubmitting(prev => ({ ...prev, [challengeId]: true }));
    setErrorMessages(prev => ({ ...prev, [challengeId]: null }));

    try {
      const res = await fetch(`${config.API_BASE_URL}/solve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include",
        body: JSON.stringify({
          id: challengeId,
          flag: userInput.trim()
        })
      });

      const response = await res.json();

      if (response.success) {
        setSolvedChallenges(prev => ({ ...prev, [challengeId]: true }));
        setSubmissions(prev => ({ ...prev, [challengeId]: 'correct' }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        await delay(2);
        navigate(0); // Refresh to update scores
      } else {
        setSubmissions(prev => ({ ...prev, [challengeId]: 'incorrect' }));
        setErrorMessages(prev => ({ ...prev, [challengeId]: response.message || "Incorrect flag" }));
        setTimeout(() => {
          setSubmissions(prev => ({ ...prev, [challengeId]: null }));
        }, 2000);
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setErrorMessages(prev => ({ ...prev, [challengeId]: "Network error. Please try again." }));
    } finally {
      setSubmitting(prev => ({ ...prev, [challengeId]: false }));
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty.toLowerCase()}`;
  };


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
        if (response.success == true) {
          navigate('/flags')
        }
        else {
          navigate('/login')
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }
    checklogin()
  }, [])


  return (
    <div className="ctf-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="content-wrapper">
        {/* Header */}


        {/* Main Content */}
        <main className="main-content">
          {/* Stats Bar */}
          <div className="stats-grid">
            <div className="stat-card stat-blue">
              <div className="stat-value">{challenges.length}</div>
              <div className="stat-label">Total Challenges</div>
            </div>
            <div className="stat-card stat-green">
              <div className="stat-value">{challenges.filter(c => solvedChallenges[c.id]).length}</div>
              <div className="stat-label">Solved</div>
            </div>
            <div className="stat-card stat-purple">
              <div className="stat-value">{challenges.length - challenges.filter(c => solvedChallenges[c.id]).length}</div>
              <div className="stat-label">Remaining</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-value">
                {challenges.length > 0 ? Math.round((challenges.filter(c => solvedChallenges[c.id]).length / challenges.length) * 100) : 0}%
              </div>
              <div className="stat-label">Completion</div>
            </div>
          </div>
          <br />
          {/* Challenges Grid */}
          <div className="challenges-grid">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              const isSolved = solvedChallenges[challenge.id];
              const submission = submissions[challenge.id];
              // Challenge is unlocked if it's the first one (id=0) or if previous challenge is solved
              const isUnlocked = challenge.id === 0 || solvedChallenges[challenge.id - 1];

              return (
                <div key={challenge.id} className={`challenge-card ${!isUnlocked ? 'challenge-locked' : ''}`}>
                  {/* Challenge Header */}
                  <div className={`challenge-header ${challenge.color}`}>
                    <div className="challenge-header-overlay"></div>
                    <div className="challenge-header-content">
                      <div className="challenge-info">
                        <div className="challenge-icon-wrapper">
                          <Icon className="challenge-icon" />
                        </div>
                        <div className="challenge-title-section">
                          <h3 className="challenge-title">{challenge.title}</h3>
                          <div className="challenge-meta">
                            <span className="challenge-category">{challenge.category}</span>
                            <span className={`challenge-difficulty ${getDifficultyClass(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isSolved ? (
                        <CheckCircle className="status-icon status-solved" />
                      ) : isUnlocked ? (
                        <Unlock className="status-icon status-unlocked" />
                      ) : (
                        <Lock className="status-icon status-locked" />
                      )}
                    </div>
                  </div>

                  {/* Challenge Content */}
                  <div className="challenge-body">
                    <div className="challenge-section">
                      <h4 className="section-title">DESCRIPTION</h4>
                      <p className="section-text">{challenge.description}</p>
                    </div>

                    <div className="hint-box">
                      <h4 className="section-title">RESOURCES</h4>
                      <button
                        className="download-button"
                        style={{
                          position: 'relative',
                          zIndex: 50,
                          width: '100%',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `${config.API_BASE_URL}/download/${challenge.file}`;
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Challenge File
                      </button>

                      <h4 className="section-title">HINT</h4>
                      <code className="hint-code">{challenge.hint}</code>
                    </div>

                    {/* Submit Form */}
                    <div className="submit-section">
                      {!isUnlocked ? (
                        <div className="locked-message">
                          <Lock className="locked-icon" />
                          <span>Complete the previous challenge to unlock</span>
                        </div>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Enter flag here..."
                            value={inputValues[challenge.id] || ''}
                            onChange={(e) => setInputValues(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                            disabled={isSolved || submitting[challenge.id]}
                            className="flag-input"
                          />

                          <button
                            onClick={() => handleSubmit(challenge.id)}
                            disabled={isSolved || submitting[challenge.id]}
                            className={`submit-button ${isSolved ? 'submit-button-solved' : 'submit-button-active'}`}
                          >
                            {isSolved ? (
                              <span className="button-content">
                                <CheckCircle className="button-icon" />
                                Solved - {challenge.points} Points
                              </span>
                            ) : submitting[challenge.id] ? (
                              'Checking...'
                            ) : (
                              `Submit Flag (+${challenge.points} pts)`
                            )}
                          </button>

                          {submission === 'correct' && (
                            <div className="feedback-box feedback-correct">
                              <CheckCircle className="feedback-icon" />
                              <span className="feedback-text">Correct! +{challenge.points} points</span>
                            </div>
                          )}

                          {submission === 'incorrect' && (
                            <div className="feedback-box feedback-incorrect">
                              <XCircle className="feedback-icon" />
                              <span className="feedback-text">{errorMessages[challenge.id] || "Incorrect flag. Try again!"}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Message */}
          {Object.keys(solvedChallenges).length === challenges.length && (
            <div className="completion-card">
              <Trophy className="completion-trophy" />
              <h2 className="completion-title">Congratulations!</h2>
              <p className="completion-text">
                You've completed all challenges and earned <span className="completion-score">Prize</span>!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Flag;