import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock, Trophy, Star, Zap, Shield, Terminal, Code, Network, Database, Globe, FileSearch } from 'lucide-react';
import '../styles/Levels.css';
import config from '../config';

const Levels = ({ leveling }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [level1Complete, setLevel1Complete] = useState(false);
  const [level2Complete, setLevel2Complete] = useState(false);
  const [level3Complete, setLevel3Complete] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check admin status and level completion
  useEffect(() => {
    async function checkStatus() {
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
        if (response.success) {
          // Check if admin
          if (response.username === "Admin") {
            setIsAdmin(true);
          }
          setIsCheckingAuth(false);
        } else {
          navigate('/login');
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        // Fail safe: Redirect to login on error (e.g. 401, Network Error)
        navigate('/login');
      }
    }

    async function checkLevel2() {
      try {
        const res = await fetch(`${config.API_BASE_URL}/check-level2`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        const response = await res.json();
        if (response.success && response.solved) {
          setLevel2Complete(true);
        }
      } catch (err) {
        console.error("Check level 2 failed:", err);
      }
    }

    checkStatus();
    checkLevel2();
  }, [navigate]);

  // Check if all Level 1 challenges are complete
  useEffect(() => {
    if (leveling && leveling.length >= 4) {
      const allComplete = leveling[0] && leveling[1] && leveling[2] && leveling[3];
      setLevel1Complete(allComplete);

      // Index 4 is Level 2 (flag5)
      // Index 5 is Level 3 (flag6)
      if (leveling[5]) {
        setLevel3Complete(true);
      }
    }
  }, [leveling]);

  const levels = [
    {
      id: 1,
      title: "Level 1 - Foundations",
      category: "mixed",
      difficulty: "Easy-Medium",
      points: "100-250",
      totalChallenges: 4,
      locked: false,  // Level 1 always unlocked
      completed: level1Complete,
      description: "Start your CTF journey with 4 challenges covering cryptography, web exploitation, reverse engineering, and forensics.",
      icon: Terminal,
      route: '/flags'
    },
    {
      id: 2,
      title: "Level 2 - SQL Injection",
      category: "web",
      difficulty: "Medium",
      points: "300",
      totalChallenges: 1,
      locked: !level1Complete && !isAdmin,  // Unlocks after Level 1 OR if admin
      completed: level2Complete,
      description: "Master SQL injection techniques against a real-world vulnerable application. Find the hidden product!",
      icon: Database,
      route: '/level2'
    },
    {
      id: 3,
      title: "Level 3 - Reverse Engineering",
      category: "advanced",
      difficulty: "Hard",
      points: "400",
      totalChallenges: 1,
      locked: !level2Complete && !isAdmin, // Unlocks after Level 2
      completed: leveling[5] || false,     // Assuming solved[5] is flag6. Wait. 'leveling' logic.
      description: "Analyze a secure validator script and reverse-engineer the logic to forge a valid license key.",
      icon: Terminal,
      route: '/level3'
    },
    {
      id: 4,
      title: "Level 4 - The Source",
      category: "expert",
      difficulty: "Expert",
      points: "500",
      totalChallenges: 1,
      locked: !level3Complete && !isAdmin,
      completed: leveling[6] || false,
      description: "The ultimate test of your skills. Follow the trail to the source.",
      icon: Shield,
      route: '/level4'
    }
  ];

  const [selectedLevel, setSelectedLevel] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Easy-Medium': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      case 'Expert': return 'difficulty-hard';
      default: return '';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      mixed: 'category-crypto',
      web: 'category-web',
      advanced: 'category-reverse',
      expert: 'category-forensics'
    };
    return colors[category] || '';
  };

  const handleLevelClick = (level) => {
    if (!level.locked || isAdmin) {
      setSelectedLevel(level);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevel && selectedLevel.route) {
      navigate(selectedLevel.route);
    }
    setSelectedLevel(null);
  };

  if (isCheckingAuth) {
    return (
      <div className="ctf-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: '1rem', color: '#00ff41' }}>Verifying Credentials...</p>
      </div>
    );
  }

  return (
    <div className="ctf-container">
      {/* Animated Background */}
      <div className="ctf-background">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* Admin Badge */}
      {isAdmin && (
        <div className="admin-badge-container">
          <span className="admin-badge">🔓 Admin Mode - All Levels Unlocked</span>
        </div>
      )}

      {/* Main Content */}
      <main className="ctf-main">
        <div className="challenges-grid">
          {levels.map((level) => {
            const Icon = level.icon;
            const isAccessible = !level.locked || isAdmin;
            return (
              <div
                key={level.id}
                className={`challenge-card ${!isAccessible ? 'locked' : ''} ${level.completed ? 'completed' : ''}`}
                onClick={() => handleLevelClick(level)}
              >
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Icon className="challenge-icon" />
                  </div>
                  <div className="lock-status">
                    {!isAccessible ? (
                      <Lock className="lock-icon" />
                    ) : level.completed ? (
                      <Unlock className="unlock-icon completed-icon" />
                    ) : (
                      <Unlock className="unlock-icon" />
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="challenge-title">{level.title}</h3>
                  <p className="challenge-description">{level.description}</p>

                  <div className="challenge-meta">
                    <span className={`category-badge ${getCategoryColor(level.category)}`}>
                      {level.totalChallenges} {level.totalChallenges === 1 ? 'CHALLENGE' : 'CHALLENGES'}
                    </span>
                    <span className={`difficulty-badge ${getDifficultyColor(level.difficulty)}`}>
                      {level.difficulty}
                    </span>
                  </div>

                  <div className="card-footer">
                    <span className="points">{level.points} pts</span>
                  </div>
                </div>

                {!isAccessible && (
                  <div className="locked-overlay">
                    <Lock className="locked-icon-large" />
                    <span className="locked-text">Complete previous level</span>
                  </div>
                )}

                {level.completed && (
                  <div className="completed-badge">
                    <Trophy className="trophy-icon" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Level Modal */}
      {selectedLevel && (
        <div className="modal-overlay" onClick={() => setSelectedLevel(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedLevel.title}</h2>
              <button className="close-btn" onClick={() => setSelectedLevel(null)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedLevel.description}</p>

              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">Challenges:</span>
                  <span className="points-value">{selectedLevel.totalChallenges}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Difficulty:</span>
                  <span className={`difficulty-badge ${getDifficultyColor(selectedLevel.difficulty)}`}>
                    {selectedLevel.difficulty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Points:</span>
                  <span className="points-value">{selectedLevel.points}</span>
                </div>
              </div>

              <div className="flag-submit">
                {selectedLevel.route ? (
                  <button className="submit-btn" onClick={handleStartLevel}>
                    {selectedLevel.completed ? 'View Level' : 'Start Level'}
                  </button>
                ) : (
                  <button className="submit-btn disabled" disabled>
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Levels;