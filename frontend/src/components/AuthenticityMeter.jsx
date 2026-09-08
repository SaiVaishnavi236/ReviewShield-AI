function AuthenticityMeter({ value }) {

  return (

    <div>

      <h4>Authenticity Score</h4>

      <div
        style={{
          width: "100%",
          height: "18px",
          background: "#ddd",
          borderRadius: "10px",
        }}
      >

        <div
          style={{
            width: value + "%",
            height: "18px",
            background: "#2962ff",
            borderRadius: "10px",
          }}
        ></div>

      </div>

      <p>{value.toFixed(2)}%</p>

    </div>

  );

}

export default AuthenticityMeter;