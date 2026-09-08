function ReportTable() {

  const reports = [

    {
      id: 1,
      review: "Amazing product!!",
      prediction: "Fake",
      confidence: "95%"
    },

    {
      id: 2,
      review: "Worth buying.",
      prediction: "Genuine",
      confidence: "89%"
    },

    {
      id: 3,
      review: "Terrible quality.",
      prediction: "Genuine",
      confidence: "93%"
    }

  ];

  return (

    <div className="card">

      <h2>Recent Analyses</h2>

      <table className="report-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Review</th>

            <th>Prediction</th>

            <th>Confidence</th>

          </tr>

        </thead>

        <tbody>

          {reports.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.review}</td>

              <td>{item.prediction}</td>

              <td>{item.confidence}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ReportTable;