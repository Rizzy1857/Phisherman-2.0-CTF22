import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Users, Target, Zap, Award, ChevronDown, ChevronUp, Clock, Flag } from 'lucide-react';
import '../styles/Score.css';
import { useNavigate } from 'react-router-dom'
import config from '../config';


const Score = () => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([]);
  const [total_solves, setsolve] = useState(0)
  const [activePlayers, setplayers] = useState(0)
  async function peoples() {
    const res = await fetch(`${config.API_BASE_URL}/scoreboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const response = await res.json()
    if (response.success == true) {
      setTeams(response.collections)
      setplayers(response.players)
      setsolve(response.total_solves)
    }
  }





  const getRankBadge = (rank) => {
    if (rank === 1) return <Crown className="rank-crown" />;
    if (rank === 2) return <Medal className="rank-silver" />;
    if (rank === 3) return <Medal className="rank-bronze" />;
    return null;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-first';
    if (rank === 2) return 'rank-second';
    if (rank === 3) return 'rank-third';
    return '';
  };

  useEffect(() => {
    async function people() {
      await peoples()
    }
    people()
  }, [])



  return (
    <div className="scoreboard-container">
      {/* Animated Background */}
      <div className="scoreboard-background">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="scoreboard-header">
        <div className="header-content">
          <div className="title-section">
            <Trophy className="header-icon" />
            <div>
              <h1 className="scoreboard-title">Scoreboard</h1>
              <p className="scoreboard-subtitle">Phsiherman 2.0 CTF 2026</p>
            </div>
          </div>

        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <Target className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{activePlayers}</span>
              <span className="stat-label">Players</span>
            </div>
          </div>
          <div className="stat-card">
            <Flag className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{total_solves}</span>
              <span className="stat-label">Total Solves</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="scoreboard-main">
        {/* Podium for Top 3 */}
        <div className="podium-section">
          <div className="podium-wrapper">
            {/* Second Place */}
            <div className="podium-place podium-second">
              <div className="podium-team">
                <div className="team-avatar avatar-silver">{teams[1]?.avatar}</div>
                <Medal className="podium-medal medal-silver" />
                <h3 className="podium-name">{teams[1]?.name}</h3>
                <div className="podium-score">{teams[1]?.score} pts</div>
                <div className="podium-solves">{teams[1]?.solves} solves</div>
              </div>
              <div className="podium-stand stand-second">
                <span className="podium-rank">2</span>
              </div>
            </div>

            {/* First Place */}
            <div className="podium-place podium-first">
              <div className="podium-team">
                <div className="team-avatar avatar-gold">{teams[0]?.avatar}</div>
                <Crown className="podium-crown" />
                <h3 className="podium-name">{teams[0]?.name}</h3>
                <div className="podium-score">{teams[0]?.score} pts</div>
                <div className="podium-solves">{teams[0]?.solves} solves</div>
              </div>
              <div className="podium-stand stand-first">
                <span className="podium-rank">1</span>
              </div>
            </div>

            {/* Third Place */}
            <div className="podium-place podium-third">
              <div className="podium-team">
                <div className="team-avatar avatar-bronze">{teams[2]?.avatar}</div>
                <Medal className="podium-medal medal-bronze" />
                <h3 className="podium-name">{teams[2]?.name}</h3>
                <div className="podium-score">{teams[2]?.score} pts</div>
                <div className="podium-solves">{teams[2]?.solves} solves</div>
              </div>
              <div className="podium-stand stand-third">
                <span className="podium-rank">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="rankings-section">
          <div className="rankings-header">
            <h2 className="rankings-title">Full Rankings</h2>
          </div>

          <div className="rankings-table">
            <div className="table-header">
              <div className="col-rank">Rank</div>
              <div className="col-name">Name</div>
              <div className="col-score">Score</div>
              <div className="col-solves">Solves</div>
            </div>

            <div className="table-body">
              {teams?.map((team) => (
                <div key={team.id} className={`table-row ${getRankClass(team.rank)}`}>
                  <div className="col-rank">
                    <div className="rank-wrapper">
                      {getRankBadge(team.rank)}
                      <span className="rank-number">{team.rank}</span>
                    </div>
                  </div>

                  <div className="col-name">
                    <h3>{team.name}</h3>
                  </div>

                  <div className="col-score">
                    <div className="score-wrapper">
                      <Award className="score-icon" />
                      <span className="score-value">{team.score}</span>
                    </div>
                  </div>

                  <div className="col-solves">
                    <div className="solves-badge">
                      <Flag className="solve-icon" />
                      {team.solves}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Score;