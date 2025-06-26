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
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 w-full">
                {/* Left: Logo + Navigation (with scroll if needed) */}
                <div className="flex items-center min-w-0 gap-4 flex-1">
                    <div className="flex items-center flex-shrink-0">
                        <img src={logo} alt="ikisha logo" className="h-10 sm:h-12 lg:h-14" />
                    </div>
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-6 overflow-x-auto min-w-0 flex-1">
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
                                    className={`font-bold flex items-center gap-2 px-2 sm:px-3 py-2 sm:py-3 rounded text-sm sm:text-base lg:text-lg transition-colors flex-shrink-0 ${isActive ? 'text-[#303F26]' : 'text-[#1E293B] hover:text-[#303F26]'}`}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    <img src={iconToShow} alt={`${link.name} icon`} className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="hidden sm:inline">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                {/* Right: Buttons */}
                <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-shrink-0">
                    {rightButtonProps && (
                        <button
                            className="bg-[#303F26] text-white px-3 py-2 flex items-center gap-2 hover:bg-[#26371e] rounded transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0"
                            onClick={rightButtonProps.onClick}
                        >
                            <img src={Plus} alt="Add" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="font-semibold">{rightButtonProps.text}</span>
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className={`p-2 transition-colors rounded flex-shrink-0 ${logoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        title="Logout"
                    >
                        <img src={logout} alt="Logout" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
                {/* Hamburger Menu Button - Mobile */}
                <div className="lg:hidden flex-shrink-0">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors hover:bg-gray-100"
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white shadow-lg border-t">
                    <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`font-bold flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-colors ${location.pathname === link.path ? 'text-[#303F26] bg-gray-100' : 'text-[#1E293B] hover:text-[#303F26] hover:bg-gray-50'}`}
                            >
                                <img 
                                    src={location.pathname === link.path ? iconMap[link.iconKey].active : iconMap[link.iconKey].default} 
                                    alt={`${link.name} icon`} 
                                    className="w-5 h-5" 
                                />
                                {link.name}
                            </Link>
                        ))}
                        
                        {rightButtonProps && (
                            <div className="px-3 py-2">
                                <button
                                    className="w-full bg-[#303F26] text-white px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#26371e] rounded-lg transition-colors"
                                    onClick={() => {
                                        rightButtonProps.onClick();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <img src={Plus} alt="Add" className="w-5 h-5" />
                                    <span className="font-semibold text-base">{rightButtonProps.text}</span>
                                </button>
                            </div>
                        )}
                        
                        <div className="border-t border-gray-200 my-2"></div>
                        
                        <button
                            onClick={() => { 
                                handleLogout(); 
                                setIsMenuOpen(false); 
                            }}
                            disabled={logoutLoading}
                            className={`w-full text-left px-3 py-3 transition-colors flex items-center gap-3 rounded-lg ${logoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        >
                            <img src={logout} alt="Logout" className="w-5 h-5" />
                            <span className="font-bold text-[#1E293B] text-base">Logout</span>
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
