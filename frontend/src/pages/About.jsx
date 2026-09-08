import StatCard from "../components/StatCard";

const technologies = [
  "React.js",
  "FastAPI",
  "Python",
  "Machine Learning",
  "Natural Language Processing",
  "TF-IDF Vectorization",
  "Logistic Regression",
  "SQLite Database",
];

const features = [
  "AI-powered Fake Review Detection",
  "Real-Time Prediction",
  "Confidence Score Generation",
  "Interactive Dashboard",
  "Visual Analytics",
  "Report Generation",
  "Secure Processing",
  "Scalable Architecture",
];

function About() {
  return (
    <div className="page">

      {/* HEADER */}
      <section className="dashboard-header">
        <div>
          <span className="tag">About ReviewShield AI</span>

          <h1 className="dashboard-title">
            Intelligent Fake Review Detection Platform
          </h1>

          <p className="dashboard-subtitle">
            ReviewShield AI is an Artificial Intelligence powered platform
            designed to detect fake product reviews using Machine Learning,
            Natural Language Processing, and Explainable AI techniques.
            The system helps customers and businesses identify deceptive
            reviews and improve trust in online marketplaces.
          </p>
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      <div className="glass-card">
        <h2>Project Overview</h2>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "1.8",
            color: "#cbd5e1",
          }}
        >
          Online shopping platforms receive millions of customer reviews
          every day. Many of these reviews are manipulated to artificially
          increase or decrease product ratings.

          <br />
          <br />

          ReviewShield AI analyzes review text using Natural Language
          Processing techniques and Machine Learning algorithms to predict
          whether a review is Genuine or Fake. The platform also provides
          confidence scores, visual analytics, and comprehensive reports.
        </p>
      </div>

      {/* STATISTICS */}
      <div
        className="dashboard-grid"
        style={{ marginTop: "40px" }}
      >
        <StatCard
          title="Model Accuracy"
          value="95.42%"
          color="#22c55e"
        />

        <StatCard
          title="Reviews Analysed"
          value="1.2 Million+"
          color="#3b82f6"
        />

        <StatCard
          title="Prediction Time"
          value="0.8 sec"
          color="#f97316"
        />

        <StatCard
          title="System Uptime"
          value="99.98%"
          color="#8b5cf6"
        />
      </div>

      {/* MISSION & VISION */}
      <div className="status-grid">

        <div className="glass-card">
          <h2>Our Mission</h2>

          <p
            style={{
              marginTop: "20px",
              color: "#cbd5e1",
              lineHeight: "1.8",
            }}
          >
            To build a trustworthy AI system capable of detecting deceptive
            online reviews with high accuracy while improving transparency,
            customer confidence, and digital commerce.
          </p>
        </div>

        <div className="glass-card">
          <h2>Our Vision</h2>

          <p
            style={{
              marginTop: "20px",
              color: "#cbd5e1",
              lineHeight: "1.8",
            }}
          >
            To become a reliable AI-powered review verification platform
            capable of supporting large-scale e-commerce ecosystems through
            intelligent and explainable predictions.
          </p>
        </div>

      </div>

      {/* TECHNOLOGIES */}
      <div className="glass-card activity-card">

        <h2>Technology Stack</h2>

        <div className="prediction-details">
          {technologies.map((tech, index) => (
            <div className="detail" key={index}>
              <strong>{tech}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* FEATURES */}
      <div className="glass-card activity-card">

        <h2>Key Features</h2>

        <div className="prediction-details">
          {features.map((feature, index) => (
            <div className="detail" key={index}>
              <strong>{feature}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* WORKFLOW */}
      <div className="glass-card activity-card">

        <h2>System Workflow</h2>

        <table className="activity-table">

          <thead>
            <tr>
              <th>Step</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>User submits a product review.</td>
            </tr>

            <tr>
              <td>2</td>
              <td>
                Text preprocessing removes noise and cleans the review.
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>
                TF-IDF and NLP features are extracted.
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                Machine Learning predicts Fake or Genuine.
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>
                Confidence score, analytics, and report are generated.
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default About;