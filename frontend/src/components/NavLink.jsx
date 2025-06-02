import { Link } from "react-router-dom";


export default function NavLinkButton({ to, label, icon }) {
    return (
        <li className="flex justify-start items-center space-x-3 rounded font-medium 
        bg-neutral text-white text-xs py-1.5 w-30 mx-auto uppercase hover:bg-primary
        hover:text-neutral">
            {icon}
            <Link to={to}>
                {label}
            </Link>
        </li>
    );
}