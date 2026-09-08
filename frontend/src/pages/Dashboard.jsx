import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

function Dashboard() {

  const stats = [
    {
      title: "Model Accuracy",
      value: "95.42%",
      color: "#22c55e",
    },
    {
      title: "Reviews Checked",
      value: "15,428",
      color: "#3b82f6",
    },
    {
      title: "Fake Reviews",
      value: "4,832",
      color: "#ef4444",
    },
    {
      title: "Genuine Reviews",
      value: "10,596",
      color: "#06b6d4",
    },
  ];

  const progress = [
    {
      title: "Fake Reviews",
      value: 31,
      text: "31% flagged as suspicious",
    },
    {
      title: "Genuine Reviews",
      value: 69,
      color: "blue",
      text: "69% verified genuine",
    },
  ];

  const activities = [
    {
      review: "Excellent product!! Best ever!!!",
      prediction: "Fake",
      confidence: "96%",
      badge: "High Risk",
      type: "danger",
    },
    {
      review: "Product arrived on time.",
      prediction: "Genuine",
      confidence: "91%",
      badge: "Safe",
      type: "success",
    },
    {
      review: "Highly recommend everyone!!!",
      prediction: "Fake",
      confidence: "93%",
      badge: "Medium",
      type: "warning",
    },
    {
      review: "Worth every rupee.",
      prediction: "Genuine",
      confidence: "89%",
      badge: "Safe",
      type: "success",
    },
    {
      review: "Amazing quality!!! Buy now!!!",
      prediction: "Fake",
      confidence: "95%",
      badge: "High Risk",
      type: "danger",
    },
  ];

  return (
    <div className="page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <section className="dashboard-header">

        <div>

          <span className="tag">
            AI Monitoring Dashboard
          </span>

          <h1 className="dashboard-title">
            ReviewShield AI Analytics
          </h1>

          <p className="dashboard-subtitle">
            Monitor fake review detection in real time.
            Analyze model performance, AI confidence,
            suspicious review trends and system health
            through an interactive dashboard.
          </p>

        </div>

        <button className="dashboard-btn">
          Generate Report
        </button>

      </section>


      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <section className="dashboard-grid">

        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}

      </section>


      {/* =====================================================
          SYSTEM STATUS + TODAY'S DETECTION
          ===================================================== */}

      <section className="status-grid">

        {/* SYSTEM STATUS */}

        <div className="glass-card">

          <h2>
            System Status
          </h2>

          <div className="status-circle">
            ONLINE
          </div>

          <p>
            AI Engine is actively monitoring
            incoming customer reviews and
            generating authenticity predictions.
          </p>

        </div>


        {/* TODAY'S DETECTION */}

        <div className="glass-card">

          <h2>
            Today's Detection
          </h2>

          {progress.map((item) => (

            <div
              className="progress-box"
              key={item.title}
            >

              <div className="progress-title">
                {item.title}
              </div>

              <div className="progress-bar">

                <div
                  className={`progress-fill ${
                    item.color || ""
                  }`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

              <p>
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          DETECTION ANALYTICS
          ===================================================== */}

      <section className="glass-card">

        <h2 className="dashboard-section-title">
          Detection Analytics
        </h2>

        <Charts />

      </section>


      {/* =====================================================
          RECENT ACTIVITY
          ===================================================== */}

      <section className="glass-card activity-card">

        <div className="activity-header">

          <h2>
            Recent Detection Activity
          </h2>

          <span className="live-feed">
            Live Feed
          </span>

        </div>


        <div className="table-wrapper">

          <table className="activity-table">

            <thead>

              <tr>
                <th>Review</th>
                <th>Prediction</th>
                <th>Confidence</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {activities.map((item) => (

                <tr key={item.review}>

                  <td>
                    {item.review}
                  </td>

                  <td>
                    {item.prediction}
                  </td>

                  <td>
                    {item.confidence}
                  </td>

                  <td>

                    <span
                      className={`badge ${item.type}`}
                    >
                      {item.badge}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;