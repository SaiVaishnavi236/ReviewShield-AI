import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

function Landing() {
  const features = [
    {
      icon: "🛡️",
      title: "Fake Review Detection",
      description:
        "Uses linguistic patterns, sentiment signals and machine learning to identify potentially fraudulent reviews."
    },
    {
      icon: "🧠",
      title: "Machine Learning",
      description:
        "Combines NLP and machine learning techniques to analyze review behavior and detect suspicious patterns."
    },
    {
      icon: "✓",
      title: "Authenticity Score",
      description:
        "Displays an authenticity percentage that helps users understand how trustworthy a review appears."
    },
    {
      icon: "〽",
      title: "Confidence Score",
      description:
        "Shows the model's confidence in every prediction, making the detection result easier to understand."
    },
    {
      icon: "▣",
      title: "Explainable AI",
      description:
        "Explains why a review was classified as genuine or suspicious using understandable AI insights."
    },
    {
      icon: "▥",
      title: "Interactive Analytics",
      description:
        "Visualizes review patterns, detection results and model statistics through interactive analytics."
    }
  ];

  return (
    <main className="landing-page">

      {/* HERO */}
      <Hero />

      {/* FEATURES */}
      <section className="features-section">

        <div className="features-heading">

          <span className="section-badge">
            Powerful AI Features
          </span>

          <h2>
            Everything You Need To
            <span> Detect Fake Reviews</span>
          </h2>

          <p>
            ReviewShield AI combines intelligent analysis,
            machine learning and explainable insights to help
            identify suspicious reviews with confidence.
          </p>

        </div>

        <div className="features-grid">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </section>

    </main>
  );
}

export default Landing;