import { useState, useEffect } from 'react';
import { Trophy, Lock, CheckCircle, XCircle, Target, Brain, Code, Shield } from 'lucide-react';
import '../styles/Flag.css';
import { useNavigate } from 'react-router-dom';

const Flag = ({ flags, points,score }) => {
  const delay = (t) =>
    new Promise(resolve => setTimeout(resolve, t * 1000));
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState(flags)
  const [inputValues, setInputValues] = useState(flags);
  const [solvedChallenges, setSolvedChallenges] = useState(flags);

  const [showConfetti, setShowConfetti] = useState(false);

  const challenges = [
    {
      id: 0,
      title: "The Hidden Message",
      category: "Cryptography",
      difficulty: "Easy",
      points: 100,
      icon: Code,
      description: "Decode this Base64 encoded message to find the flag.",
      hint: "The message is: SGVsbG9fQ1RGX1BsYXllcnsxbV9hX2JBczY0X2V4cDNydH0=",
      flag: "Hello_CTF_Player{1m_a_bAs64_exp3rt}",
      color: "cyan-blue"
    },
    {
      id: 1,
      title: "SQL Injection Master",
      category: "Web Security",
      difficulty: "Medium",
      points: 500,
      icon: Shield,
      description: "Bypass the authentication by finding the correct SQL injection payload.",
      hint: "Username: admin' OR '1'='1' --",
      flag: "CTF{sql_1nj3ct10n_m4st3r_2024}",
      color: "purple-pink"
    },
    {
      id: 2,
      title: "Reverse Engineering",
      category: "Binary",
      difficulty: "Hard",
      points: 300,
      icon: Brain,
      description: "The password is hidden in plain sight. Look at the hex values: 0x43 0x54 0x46 0x7B 0x72 0x33 0x76 0x33 0x72 0x73 0x33 0x5F 0x6D 0x61 0x73 0x74 0x33 0x72 0x7D",
      hint: "Convert hex to ASCII characters",
      flag: "CTF{r3v3rs3_mast3r}",
      color: "orange-red"
    },
    {
      id: 3,
      title: "Network Forensics",
      category: "Forensics",
      difficulty: "Expert",
      points: 450,
      icon: Target,
      description: "Analyze this packet: The flag is ROT13 encrypted. Encrypted: PGS{argjbex_sberfavpf_ceb}",
      hint: "ROT13 shifts each letter by 13 positions",
      flag: "CTF{network_forensics_pro}",
      color: "green-emerald"
    }
  ];

  const handleSubmit = async (challengeId, flag) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const userInput = inputValues[challengeId] || '';

    if (userInput.trim() === challenge.flag) {
      if (!solvedChallenges[challengeId]) {
        setSolvedChallenges(prev => ({ ...prev, [challengeId]: true }));
        setSubmissions(prev => ({ ...prev, [challengeId]: 'correct' }));
        setShowConfetti(true);
        const res = await fetch("http://localhost:3000/solve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ id: challengeId, flag: challenges[challengeId].flag, points: points,current_score:score,new_score:challenges[challengeId].points })
        })
        const response = await res.json()
        setTimeout(() => setShowConfetti(false), 3000);
        await delay(4)
        if (response.success == true) {
          navigate(0)
        }


      }
    } else {
      setSubmissions(prev => ({ ...prev, [challengeId]: 'incorrect' }));
      setTimeout(() => {
        setSubmissions(prev => ({ ...prev, [challengeId]: null }));
      }, 2000);
    }
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty.toLowerCase()}`;
  };


  useEffect(() => {
    async function checklogin() {

      try {
        const res = await fetch("http://localhost:3000/checklogin", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
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
              <div className="stat-value">{Object.keys(solvedChallenges).length}</div>
              <div className="stat-label">Solved</div>
            </div>
            <div className="stat-card stat-purple">
              <div className="stat-value">{challenges.length - Object.keys(solvedChallenges).length}</div>
              <div className="stat-label">Remaining</div>
            </div>
            <div className="stat-card stat-yellow">
              <div className="stat-value">
                {challenges.length > 0 ? Math.round((Object.keys(solvedChallenges).length / challenges.length) * 100) : 0}%
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

              return (
                <div key={challenge.id} className="challenge-card">
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
                      <h4 className="section-title">HINT</h4>
                      <code className="hint-code">{challenge.hint}</code>
                    </div>

                    {/* Submit Form */}
                    <div className="submit-section">
                      <input
                        type="text"
                        placeholder="Enter flag here..."
                        value={inputValues[challenge.id] || ''}
                        onChange={(e) => setInputValues(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                        disabled={isSolved}
                        className="flag-input"
                      />

                      <button
                        onClick={() => handleSubmit(challenge.id, challenge.flag)}
                        disabled={isSolved}
                        className={`submit-button ${isSolved ? 'submit-button-solved' : 'submit-button-active'}`}
                      >
                        {isSolved ? (
                          <span className="button-content">
                            <CheckCircle className="button-icon" />
                            Solved - {challenge.points} Points
                          </span>
                        ) : (
                          `Submit Flag (+${challenge.points} pts)`
                        )}
                      </button>

                      {submission === 'correct' && !isSolved && (
                        <div className="feedback-box feedback-correct">
                          <CheckCircle className="feedback-icon" />
                          <span className="feedback-text">Correct! +{challenge.points} points</span>
                        </div>
                      )}

                      {submission === 'incorrect' && (
                        <div className="feedback-box feedback-incorrect">
                          <XCircle className="feedback-icon" />
                          <span className="feedback-text">Incorrect flag. Try again!</span>
                        </div>
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