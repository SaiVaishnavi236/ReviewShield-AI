import { Link } from "react-router-dom";
import "./styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      <div className="hero-left">

        <div className="badge">
          <span className="badge-dot"></span>
          AI Powered Fake Review Detection
        </div>

        <h1>
          Protect Customers From
          <span className="gradient-text">
            Fake Reviews
          </span>
        </h1>

        <p className="hero-description">
          ReviewShield AI uses advanced{" "}
          <strong>NLP</strong>,{" "}
          <strong>Sentiment Analysis</strong>,{" "}
          <strong>TF-IDF</strong> and{" "}
          <strong>Machine Learning</strong> to identify
          suspicious and fraudulent reviews in seconds.
        </p>

        <div className="hero-buttons">

          <Link
            to="/analyze"
            className="button-link"
          >
            <button className="primary">
              <span>Analyze Review</span>
              <span className="arrow">→</span>
            </button>
          </Link>

          <Link
            to="/dashboard"
            className="button-link"
          >
            <button className="secondary">
              View Dashboard
            </button>
          </Link>

        </div>

        <div className="trust-section">

          <div className="trust-item">
            <span className="trust-icon">⚡</span>

            <div>
              <strong>Instant</strong>
              <small>Detection</small>
            </div>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <span className="trust-icon">🎯</span>

            <div>
              <strong>AI Powered</strong>
              <small>Analysis</small>
            </div>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <span className="trust-icon">🔒</span>

            <div>
              <strong>Secure</strong>
              <small>Analysis</small>
            </div>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <div className="floating-card detection-card">

          <div className="card-icon">
            🛡️
          </div>

          <div>
            <span>Detection Status</span>
            <strong>Review Verified</strong>
          </div>

          <div className="status-dot"></div>

        </div>

        <div className="ai-container">

          <div className="ai-ring ring-one"></div>
          <div className="ai-ring ring-two"></div>

          <div className="ai-circle">

            <div className="shield">
              🛡️
            </div>

            <div className="scan-line"></div>

          </div>

          <div className="orbit-icon icon-one">
            🔍
          </div>

          <div className="orbit-icon icon-two">
            🤖
          </div>

          <div className="orbit-icon icon-three">
            📊
          </div>

        </div>

        <div className="floating-card stats-card">

          <div className="mini-stat">
            <strong>99%</strong>
            <span>Accuracy</span>
          </div>

          <div className="mini-stat">
            <strong>AI</strong>
            <span>Detection</span>
          </div>

          <div className="mini-stat">
            <strong>24/7</strong>
            <span>Protection</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;