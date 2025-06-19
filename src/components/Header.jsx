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

const Header = ({ routeList }) => {
    const { rightButton } = useHeaderRightButton();
    const [hoveredLink, setHoveredLink] = useState(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = (routeList || []).filter(route => Object.keys(iconMap).includes(route.name.toLowerCase()))
        .map(route => ({
            name: route.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            path: route.path,
            iconKey: route.name.toLowerCase(),
        }));

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            // Call logout API
            localStorage.removeItem('token');
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API fails, we should still logout locally
        } finally {

            navigate('/login');
            setLogoutLoading(false);
        }
    };
    return (
        <header className="flex items-center justify-between px-6 py-3 shadow">
            {/* Logo and navigation here */}
            <div className="header-left">
                <div className="flex items-center gap-8">
                    <img src={logo} alt="ikisha logo" className="h-15" />
                    <nav className="flex gap-6">
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
                                    className={`font-bold flex items-center gap-2 px-3 py-3 rounded text-lg
                    ${isActive ? 'text-[#303F26]' : 'text-[#1E293B] hover:text-[#303F26]'}
                  `}
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
                </div>
            </div>
            <div className="header-right">
                <div className='flex items-center gap-4'>
                    {/* <div>
                    {rightButton}
                </div> */}
                    <button
                        className="bg-[#303F26] text-white px-4 py-2 flex items-center gap-2 hover:bg-[#26371e]"
                    // onClick={handleAddClick}
                    >
                        <img src={Plus} alt="Add" className="w-5 h-5" />
                        <span className="font-semibold text-lg">{rightButton}</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className={`p-2 transition-colors ${logoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 rounded'}`}
                        title="Logout"
                    >
                        <img src={logout} alt="Logout" className="w-6 h-6" />
                    </button>
                </div>

            </div>

        </header>
    )
}

export default Header;
