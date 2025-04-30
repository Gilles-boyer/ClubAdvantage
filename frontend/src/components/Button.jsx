import { useNavigate } from "react-router-dom";
export default function Button( {path, className = "", action }) {
    const navigate = useNavigate();
    return (
      <button
        onClick={() => navigate(path)}
        className={`${className}`}
      >
        {action}
      </button>
    );
  }
  
