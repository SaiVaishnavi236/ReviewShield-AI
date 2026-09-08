import { useState } from "react";
import PredictionCard from "./PredictionCard";

const API_URL = "http://127.0.0.1:8000/predict/";

function ReviewInput() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeReview = async () => {
    if (!review.trim()) {
      alert("Please enter a review.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze review.");
      }

      const data = await response.json();

      console.log("Backend Response:", data);

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-section">

      <h2>Analyze Product Review</h2>

      <p>
        Enter a review and our Machine Learning model will determine
        whether it is <strong>Fake</strong> or <strong>Genuine</strong>.
      </p>

      <textarea
        rows={8}
        placeholder="Example: This product exceeded my expectations. The quality is amazing and delivery was quick..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <label><strong>Product Rating</strong></label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={1}>⭐ 1</option>
          <option value={2}>⭐⭐ 2</option>
          <option value={3}>⭐⭐⭐ 3</option>
          <option value={4}>⭐⭐⭐⭐ 4</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5</option>
        </select>
      </div>

      <button
        onClick={analyzeReview}
        disabled={loading}
        style={{ marginTop: "25px" }}
      >
        {loading ? "Analyzing..." : "Analyze Review"}
      </button>

      {loading && (
        <p style={{ marginTop: "15px" }}>
          🤖 ReviewShield AI is analyzing your review...
        </p>
      )}

      {result && <PredictionCard result={result} />}
    </div>
  );
}

export default ReviewInput;