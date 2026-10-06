import { capitalize } from "../utils.js";

function StatBar({ name, value }) {
  const percentage = Math.min((value / 255) * 100, 100);

  return (
    <div className="stat-row">
      <div className="stat-header">
        <span className="stat-name">
          {capitalize(name.replace("-", " "))}
        </span>

        <span className="stat-value">
          {value}
        </span>
      </div>

      <div className="stat-track">
        <div
          className="stat-progress"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StatBar;