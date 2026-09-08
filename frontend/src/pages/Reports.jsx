import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/predict";

function Reports() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch prediction history");
      }

      const data = await response.json();

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);

      setError(
        "Unable to load prediction history. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <section className="section-heading">

        <span className="tag">
          Reports
        </span>

        <h1>
          Prediction History
        </h1>

        <p>
          View all reviews analyzed by ReviewShield AI.
        </p>

      </section>


      {/* =====================================================
          LOADING
          ===================================================== */}

      {loading && (
        <section className="glass-card reports-state">

          <div className="loader"></div>

          <h3>
            Loading Prediction History...
          </h3>

          <p>
            Fetching your analyzed reviews.
          </p>

        </section>
      )}


      {/* =====================================================
          ERROR
          ===================================================== */}

      {!loading && error && (
        <section className="glass-card reports-state">

          <div className="reports-error-icon">
            ⚠️
          </div>

          <h3>
            Unable to Load Reports
          </h3>

          <p>
            {error}
          </p>

          <button
            type="button"
            className="dashboard-btn"
            onClick={fetchReviews}
          >
            Try Again
          </button>

        </section>
      )}


      {/* =====================================================
          EMPTY STATE
          ===================================================== */}

      {!loading && !error && reviews.length === 0 && (
        <section className="glass-card reports-state">

          <div className="reports-empty-icon">
            📋
          </div>

          <h3>
            No Reviews Available
          </h3>

          <p>
            Reviews analyzed by ReviewShield AI will
            appear here.
          </p>

        </section>
      )}


      {/* =====================================================
          REPORT TABLE
          ===================================================== */}

      {!loading && !error && reviews.length > 0 && (
        <section className="glass-card reports-table-card">

          <div className="reports-table-header">

            <div>
              <span className="section-mini-label">
                HISTORY
              </span>

              <h2>
                Analyzed Reviews
              </h2>

              <p>
                {reviews.length} review
                {reviews.length !== 1 ? "s" : ""} analyzed
              </p>
            </div>

            <button
              type="button"
              className="dashboard-btn"
              onClick={() => window.print()}
            >
              Export Report
            </button>

          </div>


          <div className="table-wrapper">

            <table className="report-table">

              <thead>

                <tr>
                  <th>Review</th>
                  <th>Prediction</th>
                  <th>Confidence</th>
                  <th>Risk</th>
                  <th>Sentiment</th>
                  <th>Rating</th>
                </tr>

              </thead>


              <tbody>

                {reviews.map((item, index) => {

                  const isFake =
                    item.prediction === "Fake";

                  return (
                    <tr key={index}>

                      {/* REVIEW */}

                      <td className="review-text">
                        {item.review}
                      </td>


                      {/* PREDICTION */}

                      <td>

                        <span
                          className={
                            isFake
                              ? "prediction-badge fake"
                              : "prediction-badge genuine"
                          }
                        >
                          {isFake
                            ? "⚠ Fake"
                            : "✓ Genuine"}
                        </span>

                      </td>


                      {/* CONFIDENCE */}

                      <td>
                        {item.confidence}%
                      </td>


                      {/* RISK */}

                      <td>

                        <span
                          className={`risk-badge ${
                            item.risk
                              ? item.risk
                                  .toString()
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                              : ""
                          }`}
                        >
                          {item.risk || "N/A"}
                        </span>

                      </td>


                      {/* SENTIMENT */}

                      <td>
                        {item.sentiment || "N/A"}
                      </td>


                      {/* RATING */}

                      <td>
                        ⭐ {item.rating ?? "N/A"}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>
      )}

    </div>
  );
}

export default Reports;