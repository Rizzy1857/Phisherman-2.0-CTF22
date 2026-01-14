import React, { useState, useEffect } from 'react';
import { Shield, User, Mail, Lock, Terminal, ChevronRight, Sparkles, Zap } from 'lucide-react';
import '../styles/Login.css';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from '../config';

const Register = () => {
    const navigate = useNavigate()
    const [focusedField, setFocusedField] = useState(null);
    const [terminalLines, setTerminalLines] = useState([
        '> Initializing registration protocol...',
        '> Allocating secure memory...',
        '> Status: WAITING FOR INPUT'
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
        try {
            // Use config.API_BASE_URL if available, otherwise fallback or relative
            // Login.jsx used localhost:3000 hardcoded, I should probably stick to that pattern or use config if imported working
            // Login.jsx had: const res = await fetch("http://localhost:3000/login", ...
            // I'll stick to consistency with Login.jsx for now but check if config is better.
            // App.jsx uses config.API_BASE_URL. Login.jsx uses hardcoded. 
            // I'll use config.API_BASE_URL to be better, but the Login example used hardcoded.
            // Let's use hardcoded to match Login.jsx exactly? 
            // Actually config is imported in Login.jsx? No it wasn't!
            // Wait, Login.jsx in Step 23 did NOT import config.
            // App.jsx DID import config.
            // I'll stick to localhost:3000 for now to match Login.jsx behavior exactly as seen.

            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newdata.email, password: newdata.password, name: newdata.name })
            });
            const response = await res.json()
            await delay(1)
            if (response.success == true) {
                navigate('/login')
            }
            else {
                setError("root", {
                    type: "manual",
                    message: response.message || "Registration failed",
                });
            }
        } catch (err) {
            setError("root", {
                type: "manual",
                message: "Connection error. Please try again.",
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
                                <span>system.register</span>
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
                                <span className="stat-mini-value">Join</span>
                                <span className="stat-mini-label">The Fleet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
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
                            <h1 className="login-title">New Recruit</h1>
                            <p className="login-subtitle">Create your account to start the CTF</p>
                        </div>

                        {/* Form */}
                        <form className="login-form" onSubmit={handleSubmit(onsubmit)}>

                            {/* Name Field */}
                            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                                <label htmlFor="name" className="form-label">
                                    <User className="label-icon" />
                                    Username
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                            required: { value: true, message: "Username is required" },
                                            minLength: { value: 3, message: "Avast! Too short!" }
                                        })}
                                        placeholder="Enter your username"
                                        className="form-input"
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    <div className="input-border"></div>
                                    <div className="input-glow"></div>
                                </div>
                                {errors.name && <div style={{ color: '#ff4444', padding: 10 }}>{errors.name.message}</div>}
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
                                            required: { value: true, message: "Email is required" },
                                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                                        })}
                                        placeholder="Enter your email"
                                        className="form-input"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    <div className="input-border"></div>
                                    <div className="input-glow"></div>
                                </div>
                                {errors.email && <div style={{ color: '#ff4444', padding: 10 }}>{errors.email.message}</div>}
                            </div>

                            {/* Password Field */}
                            <div className={`form-group ${focusedField === 'password' ? 'focused' : ''}`}>
                                <label htmlFor="password" className="form-label">
                                    <Lock className="label-icon" />
                                    Password
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        id="password"
                                        {...register("password", {
                                            required: { value: true, message: "Password is required" },
                                            minLength: { value: 4, message: "Password too short" }
                                        })}
                                        placeholder="Create a password"
                                        className="form-input"
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    <div className="input-border"></div>
                                    <div className="input-glow"></div>
                                </div>
                                {errors.password && <div style={{ color: '#ff4444', padding: 10 }}>{errors.password.message}</div>}
                            </div>

                            {errors.root && <div style={{ color: '#ff4444', padding: 10, textAlign: 'center' }}>{errors.root.message}</div>}

                            {/* Submit Button */}
                            <button
                                className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        <span>Registering...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ChevronRight className="button-icon" />
                                    </>
                                )}
                                <div className="button-glow"></div>
                            </button>

                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <Link to="/login" style={{ color: '#4facfe', textDecoration: 'none', fontSize: '0.9rem' }}>
                                    Already have an account? Login
                                </Link>
                            </div>

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

export default Register;
