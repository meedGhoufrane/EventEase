import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'; 


const Dashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

  
    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('username');
        navigate('/login'); 
    };

    React.useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest(".relative")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white p-4">
                <div className="text-2xl font-bold text-center mb-8">Dashboard</div>
                <nav className="flex flex-col space-y-4">
                    <Link
                        to="/dashboard/events"
                        className="block p-3 rounded-lg bg-blue-700 hover:bg-blue-600"
                    >
                        Events
                    </Link>
                    <Link
                        to="/dashboard/participants"
                        className="block p-3 rounded-lg bg-blue-700 hover:bg-blue-600"
                    >
                        Participants
                    </Link>
                    <Link
                        to="/dashboard/profile"
                        className="block p-3 rounded-lg bg-blue-700 hover:bg-blue-600"
                    >
                        Profile
                    </Link>
                </nav>
            </aside>

            <main className="flex-1">
                <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="px-4 py-2 border-b text-gray-700">
                                    <p className="font-semibold">{localStorage.getItem('username') || 'Guest'}</p>
                                </div>

                                <Link
                                    to="/dashboard/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                </header>

                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
