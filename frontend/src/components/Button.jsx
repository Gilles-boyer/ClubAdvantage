
import { useNavigate } from "react-router-dom";
export default function Button( {path, className = "", action }) {
    const navigate = useNavigate();
    return (
      <button
        onClick={() => navigate(path)}
        className={`bg-dark text-white px-4 py-2 rounded hover:bg-primary transition ${className}`}
      >
        {action}
      </button>
    );
  }
  
