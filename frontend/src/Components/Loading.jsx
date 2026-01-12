import '../styles/Loading.css'
import { Shield, Lock, Unlock, Zap, Terminal, Code, Database, Server } from 'lucide-react';
import { useState,useEffect } from 'react';


const Loading=()=> {
    const [progress, setProgress] = useState(0);
    const [loadingStage, setLoadingStage] = useState(0);
    const [dots, setDots] = useState('');

    const loadingStages = [
        { text: 'Initializing secure connection', icon: Lock, color: '#6366f1' },
        { text: 'Establishing encrypted tunnel', icon: Shield, color: '#8b5cf6' },
        { text: 'Loading challenge database', icon: Database, color: '#ec4899' },
        { text: 'Syncing server nodes', icon: Server, color: '#f59e0b' },
        { text: 'Verifying authentication', icon: Unlock, color: '#10b981' },
        { text: 'Preparing CTF environment', icon: Terminal, color: '#06b6d4' },
        { text: 'Almost ready', icon: Zap, color: '#fbbf24' }
    ];

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 80);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        // Loading stages
        const stageInterval = setInterval(() => {
            setLoadingStage(prev => {
                if (prev >= loadingStages.length - 1) {
                    clearInterval(stageInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);

        return () => clearInterval(stageInterval);
    }, []);

    useEffect(() => {
        // Animated dots
        const dotInterval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 400);

        return () => clearInterval(dotInterval);
    }, []);

    const CurrentIcon = loadingStages[loadingStage].icon;

    return (
        <div className="loader-container">
            {/* Animated Background */}
            <div className="loader-background">
                <div className="grid-overlay-loader"></div>
                <div className="scan-lines"></div>

                {/* Rotating Hexagons */}
                <div className="hex-container">
                    <div className="hexagon hex-1"></div>
                    <div className="hexagon hex-2"></div>
                    <div className="hexagon hex-3"></div>
                </div>

                {/* Floating Particles */}
                <div className="particles-loader">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="particle-loader"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Orbiting Rings */}
                <div className="orbit-container">
                    <div className="orbit orbit-1">
                        <div className="orbit-dot"></div>
                    </div>
                    <div className="orbit orbit-2">
                        <div className="orbit-dot"></div>
                    </div>
                    <div className="orbit orbit-3">
                        <div className="orbit-dot"></div>
                    </div>
                </div>

                {/* Glow Orbs */}
                <div className="glow-orb-loader orb-loader-1"></div>
                <div className="glow-orb-loader orb-loader-2"></div>
                <div className="glow-orb-loader orb-loader-3"></div>
            </div>

            {/* Main Loader Content */}
            <div className="loader-content">
                {/* Logo Section */}
                <div className="loader-logo">
                    <div className="logo-spinner">
                        <div className="spinner-ring ring-1"></div>
                        <div className="spinner-ring ring-2"></div>
                        <div className="spinner-ring ring-3"></div>
                        <div className="spinner-ring ring-4"></div>
                        <div className="spinner-center">
                            <Shield className="spinner-icon" />
                        </div>
                    </div>

                    {/* Pulse Rings */}
                    <div className="pulse-ring pulse-1"></div>
                    <div className="pulse-ring pulse-2"></div>
                    <div className="pulse-ring pulse-3"></div>
                </div>

                {/* Title */}
                <h1 className="loader-title">
                    <span className="title-strike">Phisherman</span>
                    <span className="title-ctf">2.0</span>
                </h1>

                {/* Loading Stage */}
                <div className="loading-stage">
                    <div
                        className="stage-icon-wrapper"
                        style={{
                            background: `${loadingStages[loadingStage].color}20`,
                            borderColor: `${loadingStages[loadingStage].color}40`
                        }}
                    >
                        <CurrentIcon
                            className="stage-icon"
                            style={{ color: loadingStages[loadingStage].color }}
                        />
                    </div>
                    <p className="stage-text">
                        {loadingStages[loadingStage].text}
                        <span className="loading-dots">{dots}</span>
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="progress-shine"></div>
                        </div>
                        <div className="progress-glow"></div>
                    </div>
                    <div className="progress-percentage">{progress}%</div>
                </div>

                {/* Binary Code Stream */}
                <div className="binary-stream">
                    {[...Array(20)].map((_, i) => (
                        <span
                            key={i}
                            className="binary-digit"
                            style={{
                                animationDelay: `${i * 0.1}s`
                            }}
                        >
                            {Math.random() > 0.5 ? '1' : '0'}
                        </span>
                    ))}
                </div>

                {/* Loading Bars */}
                <div className="loading-bars">
                    <div className="loading-bar bar-1"></div>
                    <div className="loading-bar bar-2"></div>
                    <div className="loading-bar bar-3"></div>
                    <div className="loading-bar bar-4"></div>
                    <div className="loading-bar bar-5"></div>
                </div>

                {/* Status Messages */}
                <div className="status-messages">
                    <div className="status-line">
                        <span className="status-bracket">[</span>
                        <span className="status-ok">OK</span>
                        <span className="status-bracket">]</span>
                        <span className="status-msg">System check passed</span>
                    </div>
                    <div className="status-line">
                        <span className="status-bracket">[</span>
                        <span className="status-ok">OK</span>
                        <span className="status-bracket">]</span>
                        <span className="status-msg">Security protocols active</span>
                    </div>
                    <div className="status-line">
                        <span className="status-bracket">[</span>
                        <span className="status-loading">...</span>
                        <span className="status-bracket">]</span>
                        <span className="status-msg">Establishing connection</span>
                    </div>
                </div>
            </div>

            {/* Corner Decorations */}
            <div className="corner-decoration corner-tl"></div>
            <div className="corner-decoration corner-tr"></div>
            <div className="corner-decoration corner-bl"></div>
            <div className="corner-decoration corner-br"></div>
        </div>
    );
}

export default Loading;
