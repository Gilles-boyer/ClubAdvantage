import { Link } from "react-router-dom";


export default function NavLinkButton({ to, label, icon, type }) {
    return (<>
        {type === "desktop" && (<li className="flex justify-start items-center space-x-3 rounded-lg font-medium 
        bg-primary text-white text-xs py-1.5 w-30 mx-auto uppercase
        hover:text-secondary hover:scale-105 transition-transform">
            {icon}
            <Link to={to}>
                {label}
            </Link>
        </li>)}
        {type === "mobile" && (
            <li className=" flex justify-around tooltip text-secondary rounded-full hover:bg-accent hover:text-neutral">
                <Link to={to}>
                    {icon}
                </Link>
            </li>)}
    </>
    );
}