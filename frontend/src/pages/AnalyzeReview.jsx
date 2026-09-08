import ReviewInput from "../components/ReviewInput";

function AnalyzeReview() {
  const scrollToReview = () => {
    const reviewInput = document.getElementById("review-input");

    if (reviewInput) {
      reviewInput.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <section className="dashboard-header">

        <div>

          <span className="tag">
            AI Review Detection
          </span>

          <h1 className="dashboard-title">
            Analyze Product Reviews
          </h1>

          <p className="dashboard-subtitle">
            ReviewShield AI uses Machine Learning, Natural Language
            Processing, Sentiment Analysis and Linguistic Features to
            determine whether a product review is genuine or fake with
            high confidence.
          </p>

        </div>

        <button
          type="button"
          className="dashboard-btn"
          onClick={scrollToReview}
        >
          Start Analysis
        </button>

      </section>


      {/* =====================================================
          AI FEATURES
          ===================================================== */}

      <section className="dashboard-grid analyze-features">

        <div className="glass-card analyze-feature-card">

          <div className="analyze-feature-icon">
            🤖
          </div>

          <h3>
            AI Model
          </h3>

          <p>
            Logistic Regression + TF-IDF
          </p>

        </div>


        <div className="glass-card analyze-feature-card">

          <div className="analyze-feature-icon">
            🧠
          </div>

          <h3>
            NLP Analysis
          </h3>

          <p>
            Sentiment & Linguistic Features
          </p>

        </div>


        <div className="glass-card analyze-feature-card">

          <div className="analyze-feature-icon">
            ⚡
          </div>

          <h3>
            Fast Prediction
          </h3>

          <p>
            Results in less than one second
          </p>

        </div>


        <div className="glass-card analyze-feature-card">

          <div className="analyze-feature-icon">
            📊
          </div>

          <h3>
            Explainable AI
          </h3>

          <p>
            Confidence score & prediction reasons
          </p>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
          ===================================================== */}

      <section className="glass-card instructions-card">

        <div className="section-heading">

          <span className="section-mini-label">
            PROCESS
          </span>

          <h2>
            How It Works
          </h2>

          <p>
            Follow these simple steps to analyze the authenticity
            of a product review.
          </p>

        </div>

        <ol className="instruction-list">

          <li>
            <span className="step-number">1</span>

            <div>
              <strong>Enter a product review</strong>
              <p>
                Paste or type the review you want to analyze.
              </p>
            </div>
          </li>


          <li>
            <span className="step-number">2</span>

            <div>
              <strong>Select the review rating</strong>
              <p>
                Choose the customer's rating from 1 to 5 stars.
              </p>
            </div>
          </li>


          <li>
            <span className="step-number">3</span>

            <div>
              <strong>Click Analyze Review</strong>
              <p>
                The AI model processes the review instantly.
              </p>
            </div>
          </li>


          <li>
            <span className="step-number">4</span>

            <div>
              <strong>Get the prediction</strong>
              <p>
                ReviewShield AI determines whether the review
                is Genuine or Fake.
              </p>
            </div>
          </li>


          <li>
            <span className="step-number">5</span>

            <div>
              <strong>View detailed analysis</strong>
              <p>
                Check confidence, authenticity, sentiment,
                risk level and the AI explanation.
              </p>
            </div>
          </li>

        </ol>

      </section>


      {/* =====================================================
          REVIEW INPUT
          ===================================================== */}

      <section
        id="review-input"
        className="review-input-section"
      >

        <ReviewInput />

      </section>

    </div>
  );
}

export default AnalyzeReview;