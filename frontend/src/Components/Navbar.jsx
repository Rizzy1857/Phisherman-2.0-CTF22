import '../styles/Navbar.css'
import { Flag, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Navbar = ({ points,username }) => {
    const point = points || 0
    const name=username || "Phisherman 2.0"
    const navigate=useNavigate()
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                    <div className="logo-container">
                        <div className="logo-icon">
                            <Flag className="flag-icon" />
                        </div>
                    </div>
                    <div className="header-text">
                        <h1 className="site-title">{name}</h1>
                        <p className="site-subtitle">Welcome to Phisherman 2.0</p>
                    </div>
                </div>
                <div className="header-middle">
                    <ul>
                        <li onClick={() => navigate('/')}>Levels</li>
                        <li onClick={() => navigate('/flags')}>Flag Submission</li>
                        <li onClick={() => navigate('/scoreboard')}>ScoreBoard</li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="score-card">
                        <div className="score-content">
                            <Trophy className="trophy-icon" />
                            <span className="score-value">{point}</span>
                            <span className="score-label">points</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
