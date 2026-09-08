function ConfidenceMeter({ value }) {

  return (

    <div>

      <h4>Confidence</h4>

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
            background: "#00c853",
            borderRadius: "10px",
          }}
        ></div>

      </div>

      <p>{value.toFixed(2)}%</p>

    </div>

  );

}

export default ConfidenceMeter;