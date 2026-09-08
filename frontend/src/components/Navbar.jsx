import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "./styles/Navbar.css";

function Navbar() {

    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Analyze Review", path: "/analyze" },
        { name: "Analytics", path: "/analytics" },
        { name: "Reports", path: "/reports" },
        { name: "About", path: "/about" }
    ];

    return (

        <header className="navbar">

            <div className="navbar-logo">

                <ShieldCheck size={34} color="#38BDF8" />

                <span>ReviewShield AI</span>

            </div>

            <nav>

                <ul className="navbar-links">

                    {navItems.map((item) => (

                        <li key={item.path}>

                            <Link
                                to={item.path}
                                className={
                                    location.pathname === item.path
                                        ? "active-link"
                                        : ""
                                }
                            >
                                {item.name}
                            </Link>

                        </li>

                    ))}

                </ul>

            </nav>

        </header>

    );

}

export default Navbar;