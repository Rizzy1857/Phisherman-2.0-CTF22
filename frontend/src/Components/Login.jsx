import React, { useState, useEffect } from 'react';
import { Shield, User, Mail, Lock, Terminal, Eye, EyeOff, ChevronRight, Sparkles, Code, Zap } from 'lucide-react';
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate()
  const [focusedField, setFocusedField] = useState(null);
  const [terminalLines, setTerminalLines] = useState([
    '> Initializing secure connection...',
    '> Encryption protocol: AES-256',
    '> Status: READY'
  ]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000)
    })
  }

  async function onsubmit(newdata) {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newdata)
    });
    const response = await res.json()
    await delay(2)
    if (response.success == true) {
      navigate('/')
    }
    else {
      setError("email", {
        type: "manual",
        message: "This gmail is didnt registered!",
      });
    }



  }


  useEffect(() => {
    const interval = setInterval(() => {
      const cursor = document.querySelector('.terminal-cursor');
      if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="login-background">
        <div className="matrix-rain">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              {[...Array(20)].map((_, j) => (
                <span key={j} className="matrix-char">
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="scan-line"></div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        {/* Left Side - Terminal */}
        <div className="terminal-section">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-buttons">
                <span className="terminal-btn btn-close"></span>
                <span className="terminal-btn btn-minimize"></span>
                <span className="terminal-btn btn-maximize"></span>
              </div>
              <div className="terminal-title">
                <Terminal className="terminal-icon" />
                <span>system.terminal</span>
              </div>
            </div>
            <div className="terminal-body">
              {terminalLines.map((line, index) => (
                <div key={index} className="terminal-line">
                  <span className="terminal-prompt">$</span>
                  <span className="terminal-text">{line}</span>
                </div>
              ))}
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-cursor">_</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-mini">
            <div className="stat-mini-card">
              <Zap className="stat-mini-icon" />
              <div className="stat-mini-info">
                <span className="stat-mini-value">4</span>
                <span className="stat-mini-label">Challenges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="form-section">
          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <div className="logo-container">
                <div className="logo-shield">
                  <Shield className="logo-shield-icon" />
                  <div className="logo-pulse"></div>
                </div>
                <Sparkles className="logo-sparkle sparkle-1" />
                <Sparkles className="logo-sparkle sparkle-2" />
                <Sparkles className="logo-sparkle sparkle-3" />
              </div>
              <h1 className="login-title">Phsiherman 2.0</h1>
              <p className="login-subtitle">Enter your registered email ID</p>
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit(onsubmit)}>
              {/* Username Field */}
              <div className={`form-group ${focusedField === 'username' ? 'focused' : ''}`}>
                <label htmlFor="username" className="form-label">
                  <User className="label-icon" />
                  Username
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    {...register("username", {
                      required: { value: true, message: "The field is required" },
                      minLength: { value: 5, message: "The length of the username is too short" }
                    })}
                    placeholder="Enter your username"
                    className="form-input"
                  />
                  <div className="input-border"></div>
                  <div className="input-glow"></div>
                </div>
                {errors.username && <div style={{ color: '#00ff41',padding:10 }}>{errors.username.message}</div>}
              </div>


              {/* Email Field */}
              <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                <label htmlFor="email" className="form-label">
                  <Mail className="label-icon" />
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: { value: true, message: "The field is required" },
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                    })}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                  <div className="input-border"></div>
                  <div className="input-glow"></div>
                </div>
                {errors.email && <div style={{ color: '#00ff41',padding:10 }}>{errors.email.message}</div>}
              </div>

              <div className={`form-group ${focusedField === 'username' ? 'focused' : ''}`}>
                <label htmlFor="username" className="form-label">
                  <User className="label-icon" />
                  Avatar
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="avatar"
                    name='avatar'
                    {...register("avatar", {
                      required: { value: true, message: "The field is required" },
                      minLength: { value: 2, message: "The length of Avater should be 2" },
                      maxLength: { value: 2, message: "The length of Avater should be 2" }
                    })}
                    placeholder="Enter Avatar"
                    className="form-input"
                  />
                  <div className="input-border"></div>
                  <div className="input-glow"></div>
                </div>
                {errors.avatar && <div style={{ color: '#00ff41',padding:10 }}>{errors.avatar.message}</div>}
              </div>

              {/* Submit Button */}
              <button
                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Enter CTF</span>
                    <ChevronRight className="button-icon" />
                  </>
                )}
                <div className="button-glow"></div>
              </button>

              {/* Additional Info */}
              <div className="form-footer">
                <div className="security-badge">
                  <Lock className="security-icon" />
                  <span>Encrypted Connection</span>
                </div>
              </div>
            </form>

            {/* Decorative Elements */}
            <div className="card-corner corner-tl"></div>
            <div className="card-corner corner-tr"></div>
            <div className="card-corner corner-bl"></div>
            <div className="card-corner corner-br"></div>
          </div>

          {/* Binary Code Decoration */}
          <div className="binary-decoration">
            <div className="binary-line">01001000 01100001 01100011 01101011</div>
            <div className="binary-line">01010100 01101000 01100101 01010000</div>
            <div className="binary-line">01101100 01100001 01101110 01100101</div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Login;