import { MoreVertical,} from 'lucide-react';
import './styles/RevenueChart.css';
function RevenueChart() {
    return (
      <div className="revenue-chart">
        <div className="revenue-chart-header">
          <div>
            <h3 className="revenue-chart-title">Revenue</h3>
            <div className="revenue-chart-value">
              <span className="revenue-chart-amount">$58,254</span>
              <span className="revenue-chart-period">Current Week</span>
            </div>
          </div>
          <button className='verticle_dots'>
            <MoreVertical />
          </button>
        </div>
        <div className="revenue-chart-bars">
          {[40, 70, 55, 80, 60, 90, 75].map((height, i) => (
            <div key={i} className="chart-bar-container">
              <div 
                className="chart-bar"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="chart-labels">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    );
  }
  export default RevenueChart