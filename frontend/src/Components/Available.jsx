import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Clock, Terminal, Zap, RefreshCw, Mail, Twitter, Github, Lock } from 'lucide-react';
import '../styles/Available.css';

const Available = () => {
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const [glitchText, setGlitchText] = useState('CURRENTLY UNAVAILABLE');
  const [terminalLines, setTerminalLines] = useState([
    '> System Status: MAINTENANCE MODE',
    '> Connection Status: INTERRUPTED',
    '> Error Code: 503_SERVICE_UNAVAILABLE',
    '> Estimated Uptime: 2d 14h 32m',
    '> Reason: Scheduled Maintenance',
    '> All challenges temporarily offline...',
  ]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const original = 'CURRENTLY UNAVAILABLE';
      const glitchChars = '!@#$%^&*()_+{}[]|:;<>?';
      const glitched = original.split('').map(char => {
        if (Math.random() > 0.9) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
      
      setGlitchText(glitched);
      
      setTimeout(() => {
        setGlitchText(original);
      }, 50);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="unavailable-container">
      {/* Animated Background */}
      <div className="unavailable-background">
        <div className="grid-overlay"></div>
        <div className="warning-stripes"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        
        {/* Floating Error Codes */}
        <div className="error-codes">
          {['503', 'ERR', '404', 'OFFLINE', 'MAINT'].map((code, i) => (
            <div
              key={i}
              className="error-code-float"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 5}s`
              }}
            >
              {code}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="unavailable-content">
        {/* Logo Section */}
        <div className="unavailable-header">
          <div className="logo-wrapper">
            <div className="logo-shield-unavailable">
              <Shield className="logo-icon-unavailable" />
              <Lock className="lock-overlay" />
            </div>
            <div className="warning-pulse"></div>
          </div>
          <h1 className="site-title">Phisherman 2.0</h1>
        </div>

        {/* Main Alert Box */}
        <div className="alert-box">
          <div className="alert-icon-wrapper">
            <AlertTriangle className="alert-icon" />
          </div>
          
          <h2 className="glitch-title" data-text={glitchText}>
            {glitchText}
          </h2>
          
          <p className="alert-message">
            Our CTF platform is currently undergoing scheduled maintenance to bring you enhanced security features and new challenges. We'll be back online soon!
          </p>

        </div>

        {/* Terminal Window */}
        <div className="terminal-container">
          <div className="terminal-header-bar">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title-bar">
              <Terminal className="terminal-title-icon" />
              <span>system_status.log</span>
            </div>
          </div>
          <div className="terminal-content">
            {terminalLines.map((line, index) => (
              <div key={index} className="terminal-output-line">
                <span className="terminal-bracket">[</span>
                <span className="terminal-timestamp">
                  {new Date().toLocaleTimeString()}
                </span>
                <span className="terminal-bracket">]</span>
                <span className="terminal-line-text">{line}</span>
              </div>
            ))}
            <div className="terminal-output-line">
              <span className="terminal-bracket">[</span>
              <span className="terminal-timestamp">
                {new Date().toLocaleTimeString()}
              </span>
              <span className="terminal-bracket">]</span>
              <span className="terminal-cursor-blink">_</span>
            </div>
          </div>
        </div>


    
      </div>
    </div>
  );
};

export default Available;