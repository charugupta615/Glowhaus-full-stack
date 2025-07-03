import './styles/StatCard.css';

function StatCard({ title, value, icon: Icon, change, timeframe }) {
    return (
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-card-title">{title}</span>
          <div className="stat-card-icon">
            <Icon />
          </div>
        </div>
        <div className="stat-card-content">
          <h3 className="stat-card-value">{value}</h3>
          <div className="stat-card-change-container">
            <span className={`stat-card-change ${change.positive ? 'positive' : 'negative'}`}>
              {change.positive ? '↑' : '↓'} {change.value}
            </span>
            <span className="stat-card-timeframe">{timeframe}</span>
          </div>
        </div>
      </div>
    );
  }
  export default StatCard