// src/components/NavLinkButton.jsx
import { Link } from "react-router-dom";

export default function NavLinkButton({ to, label }) {
    return (
        <li className="rounded bg-neutral text-white text-center text-xs hover:bg-primary py-2">
            <Link to={to}>
                {label}
            </Link>
        </li>
    );
}
