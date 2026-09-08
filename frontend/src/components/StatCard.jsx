function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default StatCard;