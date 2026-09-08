import ConfidenceMeter from "./ConfidenceMeter";
import AuthenticityMeter from "./AuthenticityMeter";

function PredictionCard({ result }) {
  const fake = result.prediction === "Fake";

  return (
    <div className="prediction-card">

      <div className="prediction-header">
        <h2>{fake ? "⚠️ Fake Review Detected" : "✅ Genuine Review"}</h2>

        <span className={`prediction-badge ${fake ? "fake" : "genuine"}`}>
          {result.prediction}
        </span>
      </div>

      <ConfidenceMeter value={result.confidence || 0} />

      <AuthenticityMeter value={result.authenticity || 0} />

      <div className="prediction-details">

        <div className="detail">
          <strong>Risk Level</strong>
          <p>{result.risk || "N/A"}</p>
        </div>

        <div className="detail">
          <strong>Confidence</strong>
          <p>{result.confidence ?? 0}%</p>
        </div>

        <div className="detail">
          <strong>Authenticity</strong>
          <p>{result.authenticity ?? 0}%</p>
        </div>

        <div className="detail">
          <strong>Sentiment</strong>
          <p>{result.sentiment || "N/A"}</p>
        </div>

        <div className="detail">
          <strong>Review Length</strong>
          <p>{result.review_length || 0} words</p>
        </div>

        <div className="detail">
          <strong>Rating</strong>
          <p>{result.rating || "-"}/5 ⭐</p>
        </div>

      </div>

      {result.reasons && result.reasons.length > 0 && (
        <>
          <h3 style={{ marginTop: "30px" }}>
            AI Explanation
          </h3>

          <ul className="reason-list">
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
}

export default PredictionCard;