import {Link} from "react-router-dom";

export default function Navbar()
{
    return (
        <nav className="navbar">
            <ul>
                <Link to='/'><img src="/images/news2dayapp_logo.jpeg" alt="" /></Link>
                <Link to='/dashboard'><li>Dashboard</li></Link>
                <Link to='/createfeed'><li>Create feed</li></Link>
                <Link to='/managefeed'><li>Manage feed</li></Link>
                <Link to='/performance'><li>Performance Report</li></Link>
            </ul>
        </nav>
    );
}
