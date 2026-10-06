import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="detail-status error-page">
      <div className="error-pokeball">404</div>

      <h2>Page not found</h2>

      <p>
        Looks like this route wandered into tall grass.
      </p>

      <Link to="/" className="back-button">
        ← Back to Pokédex
      </Link>
    </div>
  );
}

export default NotFoundPage;