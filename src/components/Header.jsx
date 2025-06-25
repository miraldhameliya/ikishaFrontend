import React, { useState } from 'react';
import logout from '../assets/icon/Logout.png';
import logo from '../assets/icon/image.png'; // Use your actual logo path
import category from '../assets/icon/Catagory.png';
import fillCategory from '../assets/icon/FillCategory.png'
import product from '../assets/icon/Product.png'
import fillProduct from '../assets/icon/FillProduct.png'
import diamond from '../assets/icon/Diamond.png';
import fillDiamond from '../assets/icon/FillDiamond.png';
import diamondtype from '../assets/icon/DiamondType.png';
import fillDiamondType from '../assets/icon/FillDiamondClarity.png';
import metal from '../assets/icon/Export.png'
import FillMetal from '../assets/icon/FillMetal.png'
import size from '../assets/icon/Size.png';
import fillSize from '../assets/icon/FillSize.png'

import Plus from '../assets/icon/Plus.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHeaderRightButton } from '../contexts/HeaderRightButtonContext';

const iconMap = {
    category: {
        default: category,
        active: fillCategory
    },
    product: {
        default: product,
        active: fillProduct
    },
    diamond: {
        default: diamond,
        active: fillDiamond
    },
    diamondShape: {
        // eslint-disable-next-line no-undef
        default: diamond,
        active: fillDiamond
    },
    'diamond-clarity': {
        default: diamondtype,
        active: fillDiamondType
    },
    metal: {
        default: metal,
        active: FillMetal
    },
    size: {
        default: size,
        active: fillSize
    }
};

// Add this function to normalize route names to icon keys
function getIconKey(routeName) {
    switch (routeName.toLowerCase()) {
        case 'category': return 'category';
        case 'product': return 'product';
        case 'diamond': return 'diamond';
        case 'diamond shape': return 'diamondShape';
        case 'diamond-clarity': return 'diamond-clarity';
        case 'metal': return 'metal';
        case 'size': return 'size';
        default: return null;
    }
}

const Header = ({ routeList }) => {
    const { rightButtonProps } = useHeaderRightButton();
    const [hoveredLink, setHoveredLink] = useState(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    const location = useLocation();
    const navigate = useNavigate();

    // Update navLinks logic to use getIconKey and filter out routes without icons
    const navLinks = (routeList || [])
        .map(route => {
            const iconKey = getIconKey(route.name);
            if (!iconKey || !iconMap[iconKey]) return null;
            return {
                name: route.name,
                path: route.path,
                iconKey,
            };
        })
        .filter(Boolean);

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            // Call logout API
            localStorage.removeItem('token');
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            navigate('/login');
            setLogoutLoading(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                {/* Logo */}
                <img src={logo} alt="ikisha logo" className="h-12 sm:h-15" />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-start gap-6">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.path;
                        const isHovered = hoveredLink === link.name;
                        const iconToShow = (isActive || isHovered) ?
                            iconMap[link.iconKey].active :
                            iconMap[link.iconKey].default;

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-bold flex items-center gap-2 px-3 py-3 rounded text-lg ${isActive ? 'text-[#303F26]' : 'text-[#1E293B] hover:text-[#303F26]'}`}
                                style={isActive ? { color: '#303F26' } : {}}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <img src={iconToShow} alt={`${link.name} icon`} className="w-5 h-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side buttons - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {rightButtonProps && (
                        <button
                            className="bg-[#303F26] text-white px-4 py-2 flex items-center gap-2 hover:bg-[#26371e]"
                            onClick={rightButtonProps.onClick}
                        >
                            <img src={Plus} alt="Add" className="w-5 h-5" />
                            <span className="font-semibold text-lg">{rightButtonProps.text}</span>
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className={`p-2 transition-colors ${logoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 rounded'}`}
                        title="Logout"
                    >
                        <img src={logout} alt="Logout" className="w-6 h-6" />
                    </button>
                </div>

                {/* Hamburger Menu Button - Mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`font-bold flex items-center gap-2 px-3 py-3 rounded text-lg ${location.pathname === link.path ? 'text-[#303F26] bg-gray-100' : 'text-[#1E293B] hover:text-[#303F26] hover:bg-gray-50'}`}
                            >
                                <img src={location.pathname === link.path ? iconMap[link.iconKey].active : iconMap[link.iconKey].default} alt={`${link.name} icon`} className="w-5 h-5" />
                                {link.name}
                            </Link>
                        ))}
                        {rightButtonProps && (
                            <div className="p-2">
                                <button
                                    className="w-full bg-[#303F26] text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#26371e]"
                                    onClick={rightButtonProps.onClick}
                                >
                                    <img src={Plus} alt="Add" className="w-5 h-5" />
                                    <span className="font-semibold text-lg">{rightButtonProps.text}</span>
                                </button>
                            </div>
                        )}
                        <div className="border-t my-2"></div>
                        <button
                            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                            disabled={logoutLoading}
                            className={`w-full text-left p-2 transition-colors flex items-center gap-2 ${logoutLoading ? 'opacity-50' : 'hover:bg-gray-100 rounded'}`}
                        >
                            <img src={logout} alt="Logout" className="w-6 h-6" />
                            <span className="font-bold text-[#1E293B]">Logout</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
