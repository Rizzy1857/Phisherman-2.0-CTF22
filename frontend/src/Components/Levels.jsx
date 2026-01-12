import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Trophy, Star, Zap, Shield, Terminal, Code, Network } from 'lucide-react';
import '../styles/Levels.css';

const Levels = ({ leveling }) => {
  const navigate=useNavigate()
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Binary Exploitation 101",
      category: "pwn",
      difficulty: "Easy",
      points: 100,
      locked: false,
      completed: false,
      description: "Find the buffer overflow vulnerability and exploit it to get the flag.",
      icon: Terminal,
    },
    {
      id: 2,
      title: "Reverse Engineering Master",
      category: "reverse",
      difficulty: "Hard",
      points: 500,
      locked: !leveling[0],
      completed: false,
      description: "Analyze the binary and find the license key generation algorithm.",
      icon: Zap,
    },
    {
      id: 3,
      title: "Network Forensics",
      category: "forensics",
      difficulty: "Medium",
      points: 300,
      locked: !leveling[1],
      completed: false,
      description: "Analyze the packet capture and find the exfiltrated data.",
      icon: Network,
    },
    {
      id: 4,
      title: "SQL Injection Pro",
      category: "web",
      difficulty: "Hard",
      points: 450,
      locked: !leveling[2],
      completed: false,
      description: "Bypass advanced SQL filters and extract sensitive database information.",
      icon: Code,
    }
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [flagInput, setFlagInput] = useState('');

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      pwn: 'category-pwn',
      web: 'category-web',
      crypto: 'category-crypto',
      reverse: 'category-reverse',
      forensics: 'category-forensics'
    };
    return colors[category] || '';
  };

  const handleChallengeClick = (challenge) => {
    if (!challenge.locked) {
      setSelectedChallenge(challenge);
      setFlagInput('');
    }
  };

  const handleSubmitFlag = () => {
    if (flagInput.trim()) {
      alert(`Flag submitted for ${selectedChallenge.title}: ${flagInput}`);
      setFlagInput('');
    }
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
          navigate('/')
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
      <div className="ctf-background">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* Main Content */}
      <main className="ctf-main">
        <div className="challenges-grid">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            return (
              <div
                key={challenge.id}
                className={`challenge-card ${challenge.locked ? 'locked' : ''} ${challenge.completed ? 'completed' : ''}`}
                onClick={() => handleChallengeClick(challenge)}
              >
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Icon className="challenge-icon" />
                  </div>
                  <div className="lock-status">
                    {challenge.locked ? (
                      <Lock className="lock-icon" />
                    ) : challenge.completed ? (
                      <Unlock className="unlock-icon completed-icon" />
                    ) : (
                      <Unlock className="unlock-icon" />
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="challenge-title">{challenge.title}</h3>
                  <p className="challenge-description">{challenge.description}</p>

                  <div className="challenge-meta">
                    <span className={`category-badge ${getCategoryColor(challenge.category)}`}>
                      {challenge.category.toUpperCase()}
                    </span>
                    <span className={`difficulty-badge ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>

                  <div className="card-footer">
                    <span className="points">{challenge.points} pts</span>
                  </div>
                </div>

                {challenge.locked && (
                  <div className="locked-overlay">
                    <Lock className="locked-icon-large" />
                    <span className="locked-text">Complete previous challenges</span>
                  </div>
                )}

                {challenge.completed && (
                  <div className="completed-badge">
                    <Trophy className="trophy-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <div className="modal-overlay" onClick={() => setSelectedChallenge(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedChallenge.title}</h2>
              <button className="close-btn" onClick={() => setSelectedChallenge(null)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedChallenge.description}</p>

              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className={`category-badge ${getCategoryColor(selectedChallenge.category)}`}>
                    {selectedChallenge.category.toUpperCase()}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Difficulty:</span>
                  <span className={`difficulty-badge ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Points:</span>
                  <span className="points-value">{selectedChallenge.points}</span>
                </div>
              </div>

              <div className="flag-submit">
                <button className="submit-btn" onClick={handleSubmitFlag}>
                  Start Machine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Levels;