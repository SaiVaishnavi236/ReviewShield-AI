import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

const API_URL = "http://127.0.0.1:8000/analytics/";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const data = await response.json();

      setAnalytics(data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);

      setError(
        "Unable to connect to the analytics server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOADING STATE
     ===================================================== */

  if (loading) {
    return (
      <div className="page analytics-page">

        <section className="loading-section glass-card">

          <div className="loader"></div>

          <h2>
            Loading Analytics...
          </h2>

          <p>
            Fetching the latest machine learning performance data.
          </p>

        </section>

      </div>
    );
  }


  /* =====================================================
     ERROR STATE
     ===================================================== */

  if (error) {
    return (
      <div className="page analytics-page">

        <section className="error-section glass-card">

          <div className="error-icon">
            ⚠️
          </div>

          <h2>
            Analytics Unavailable
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            className="dashboard-btn"
            onClick={fetchAnalytics}
          >
            Try Again
          </button>

        </section>

      </div>
    );
  }


  /* =====================================================
     SAFETY CHECK
     ===================================================== */

  if (!analytics) {
    return (
      <div className="page">

        <section className="glass-card">
          <h2>No analytics data available.</h2>
        </section>

      </div>
    );
  }


  /* =====================================================
     CALCULATIONS
     ===================================================== */

  const totalReviews = Number(analytics.total_reviews) || 0;

  const genuineReviews = Number(analytics.genuine_reviews) || 0;

  const fakeReviews = Number(analytics.fake_reviews) || 0;

  const accuracy = Number(analytics.accuracy) || 0;

  const avgConfidence =
    Number(analytics.avg_confidence) || 0;

  const avgRating =
    Number(analytics.avg_rating) || 0;

  const genuinePercentage =
    totalReviews > 0
      ? (genuineReviews / totalReviews) * 100
      : 0;

  const fakePercentage =
    totalReviews > 0
      ? (fakeReviews / totalReviews) * 100
      : 0;


  /* =====================================================
     STATISTICS
     ===================================================== */

  const metrics = [
    {
      title: "Accuracy",
      value: `${accuracy.toFixed(2)}%`,
      color: "#22c55e",
    },
    {
      title: "Total Reviews",
      value: totalReviews.toLocaleString(),
      color: "#3b82f6",
    },
    {
      title: "Fake Reviews",
      value: fakeReviews.toLocaleString(),
      color: "#ef4444",
    },
    {
      title: "Genuine Reviews",
      value: genuineReviews.toLocaleString(),
      color: "#06b6d4",
    },
  ];


  /* =====================================================
     MODEL INSIGHTS
     ===================================================== */

  const insights = [
    {
      title: "Average Confidence",
      value: `${avgConfidence.toFixed(1)}%`,
    },
    {
      title: "Average Rating",
      value: avgRating.toFixed(1),
    },
    {
      title: "Model Accuracy",
      value: `${accuracy.toFixed(2)}%`,
    },
    {
      title: "Genuine Detection",
      value: `${genuinePercentage.toFixed(1)}%`,
    },
  ];


  return (
    <div className="page analytics-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <section className="dashboard-header">

        <div>

          <span className="tag">
            AI Analytics
          </span>

          <h1 className="dashboard-title">
            Machine Learning Performance Analytics
          </h1>

          <p className="dashboard-subtitle">
            Real-time analytics generated from your Fake Review
            Detection System. Monitor model accuracy, review
            distribution, confidence levels and overall system
            performance.
          </p>

        </div>

        <button
          type="button"
          className="dashboard-btn"
          onClick={() => window.print()}
        >
          Export Report
        </button>

      </section>


      {/* =================================================
          STATISTICS
          ================================================= */}

      <section className="dashboard-grid analytics-stats">

        {metrics.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}

      </section>


      {/* =================================================
          CHARTS
          ================================================= */}

      <section className="glass-card analytics-chart-card">

        <div className="analytics-section-heading">

          <div>

            <span className="section-mini-label">
              PERFORMANCE
            </span>

            <h2>
              Performance Visualization
            </h2>

            <p>
              Visual representation of your review detection
              performance and model results.
            </p>

          </div>

        </div>

        <Charts />

      </section>


      {/* =================================================
          INSIGHTS + MODEL HEALTH
          ================================================= */}

      <section className="status-grid analytics-status-grid">

        {/* MODEL INSIGHTS */}

        <div className="glass-card">

          <div className="analytics-card-heading">

            <span className="section-mini-label">
              INSIGHTS
            </span>

            <h2>
              Model Insights
            </h2>

          </div>

          <div className="prediction-details">

            {insights.map((item) => (

              <div
                className="detail"
                key={item.title}
              >

                <strong>
                  {item.value}
                </strong>

                <span>
                  {item.title}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* MODEL HEALTH */}

        <div className="glass-card">

          <div className="analytics-card-heading">

            <span className="section-mini-label">
              SYSTEM HEALTH
            </span>

            <h2>
              Model Health
            </h2>

          </div>


          {/* ACCURACY */}

          <div className="progress-box">

            <div className="progress-header">

              <span className="progress-title">
                Accuracy
              </span>

              <strong>
                {accuracy.toFixed(1)}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill blue"
                style={{
                  width: `${Math.min(accuracy, 100)}%`,
                }}
              />

            </div>

          </div>


          {/* CONFIDENCE */}

          <div className="progress-box">

            <div className="progress-header">

              <span className="progress-title">
                Average Confidence
              </span>

              <strong>
                {avgConfidence.toFixed(1)}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(avgConfidence, 100)}%`,
                }}
              />

            </div>

          </div>


          {/* GENUINE REVIEWS */}

          <div className="progress-box">

            <div className="progress-header">

              <span className="progress-title">
                Genuine Reviews
              </span>

              <strong>
                {genuinePercentage.toFixed(1)}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill blue"
                style={{
                  width: `${Math.min(genuinePercentage, 100)}%`,
                }}
              />

            </div>

          </div>


          {/* FAKE REVIEWS */}

          <div className="progress-box">

            <div className="progress-header">

              <span className="progress-title">
                Fake Reviews
              </span>

              <strong>
                {fakePercentage.toFixed(1)}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(fakePercentage, 100)}%`,
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          ANALYTICS SUMMARY
          ================================================= */}

      <section className="glass-card activity-card">

        <div className="analytics-card-heading">

          <span className="section-mini-label">
            REPORT
          </span>

          <h2>
            Analytics Summary
          </h2>

          <p>
            Overview of the current review detection system.
          </p>

        </div>


        <div className="table-wrapper">

          <table className="activity-table">

            <thead>

              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>

            </thead>

            <tbody>

              <tr>
                <td>Total Reviews</td>
                <td>{totalReviews.toLocaleString()}</td>
              </tr>

              <tr>
                <td>Fake Reviews</td>
                <td>{fakeReviews.toLocaleString()}</td>
              </tr>

              <tr>
                <td>Genuine Reviews</td>
                <td>{genuineReviews.toLocaleString()}</td>
              </tr>

              <tr>
                <td>Average Confidence</td>
                <td>{avgConfidence.toFixed(1)}%</td>
              </tr>

              <tr>
                <td>Average Rating</td>
                <td>{avgRating.toFixed(1)}</td>
              </tr>

              <tr>
                <td>Model Accuracy</td>
                <td>{accuracy.toFixed(2)}%</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Analytics;