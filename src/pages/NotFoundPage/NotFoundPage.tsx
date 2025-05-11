import { Link } from "react-router";
import "./NotFoundPage.scss";
const NotFoundPage = () => {
  return (
    <div className="error-page">
      <div className="error-page_title">Error 404. Page not found!</div>
      <Link to="/" className="error-page_back">
        Back to Main Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
