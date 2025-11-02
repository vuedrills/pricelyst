import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingSubmenu from "./FloatingSubmenuG";
import { Menu, X } from "lucide-react";
import {
	Home,
	User,
	Search,
	Building,
	Store,
	List,
	HelpCircle,
	Settings,
	Receipt,
	Bell,
} from "lucide-react";

const NAVBAR_WIDTH = 56; // px, Tailwind w-14

const NAV_ICONS = [
	{
		key: "home",
		title: "Home",
		icon: <Home className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/"),
		submenu: null,
	},
	{
		key: "profile",
		title: "Profile",
		icon: <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/profile"),
		submenu: [
			{
				label: "My Profile",
				icon: <User className="w-4 h-4 text-gray-500" />,
				path: "/profile",
			},
			{
				label: "Orders",
				icon: <Receipt className="w-4 h-4 text-gray-500" />,
				path: "/orders",
			},
			{
				label: "Settings",
				icon: <Settings className="w-4 h-4 text-gray-500" />,
				path: "/settings",
			},
		],
	},
	{
		key: "discover",
		title: "Discover",
		icon: <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/category-search"),
		submenu: [
			{
				label: "Brands",
				icon: <Building className="w-4 h-4 text-gray-500" />,
				path: "/brands",
			},
			{
				label: "Retailers",
				icon: <Store className="w-4 h-4 text-gray-500" />,
				path: "/retailers",
			},
		],
	},
	{
		key: "shopping",
		title: "Shopping List",
		icon: <List className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/shopping-list"),
		submenu: null,
	},
	{
		key: "notifications",
		title: "Notifications",
		icon: <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/notifications"),
		submenu: null,
	},
	{
		key: "help",
		title: "Help",
		icon: <HelpCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />,
		onClick: (navigate: any) => navigate("/faq"),
		submenu: null,
	},
];

const VerticalNavbar: React.FC = () => {
	const navigate = useNavigate();
	const [submenuKey, setSubmenuKey] = useState<string | null>(null);
	const [submenuVisible, setSubmenuVisible] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false); // <-- FIXED: add mobileOpen state
	const iconRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
	const closeTimeout = useRef<NodeJS.Timeout | null>(null);

	// Show submenu for hovered icon
	const handleIconMouseEnter = (key: string) => {
		if (closeTimeout.current) {
			clearTimeout(closeTimeout.current);
			closeTimeout.current = null;
		}
		setSubmenuKey(key);
		setSubmenuVisible(true);
	};

	// Hide submenu when leaving icon
	const handleIconMouseLeave = () => {
		closeTimeout.current = setTimeout(() => {
			setSubmenuVisible(false);
			setSubmenuKey(null);
		}, 150);
	};

	// Show submenu when hovering over submenu
	const handleSubmenuMouseEnter = () => {
		if (closeTimeout.current) {
			clearTimeout(closeTimeout.current);
			closeTimeout.current = null;
		}
	};

	// Hide submenu when leaving submenu
	const handleSubmenuMouseLeave = () => {
		closeTimeout.current = setTimeout(() => {
			setSubmenuVisible(false);
			setSubmenuKey(null);
		}, 150);
	};

	// Mobile: Render links in a drawer
	const MobileDrawer = () => (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
			<div className="bg-gray-50 w-64 h-full shadow-lg flex flex-col py-6 px-4">
				<button
					className="self-end mb-4"
					onClick={() => setMobileOpen(false)}
					aria-label="Close menu"
				>
					<X size={28} />
				</button>
				{NAV_ICONS.map((item) => (
					<button
						key={item.key}
						title={item.title}
						className="group flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
						onClick={() => {
							setMobileOpen(false);
							if (item.onClick) item.onClick(navigate);
						}}
					>
						{item.icon}
						<span className="text-base text-gray-700">{item.title}</span>
					</button>
				))}
			</div>
			{/* Click outside to close */}
			<div className="flex-1" onClick={() => setMobileOpen(false)} />
		</div>
	);

	return (
		<>
			{/* Hamburger for mobile */}
			<button
				className="fixed top-4 left-4 z-50 bg-white border border-gray-300 rounded-lg p-2 shadow-md md:hidden"
				onClick={() => setMobileOpen(true)}
				aria-label="Open menu"
			>
				<Menu size={28} />
			</button>

			{/* Vertical navbar for desktop */}
			<nav className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6 space-y-4 fixed left-0 top-0 bottom-0 z-40 hidden md:flex">
				{NAV_ICONS.map((item) => (
					<button
						key={item.key}
						ref={(el) => {
							iconRefs.current[item.key] = el;
						}}
						title={item.title}
						className="group p-2 rounded-lg hover:bg-gray-100 transition-colors w-full flex items-center justify-center"
						onClick={item.onClick ? () => item.onClick(navigate) : undefined}
						onMouseEnter={() => handleIconMouseEnter(item.key)}
						onMouseLeave={handleIconMouseLeave}
					>
						{item.icon}
					</button>
				))}
			</nav>
			{submenuKey &&
				NAV_ICONS.find((i) => i.key === submenuKey)?.submenu &&
				iconRefs.current[submenuKey] && (
					<FloatingSubmenu
						isVisible={submenuVisible}
						triggerRef={{ current: iconRefs.current[submenuKey] as HTMLElement }}
						items={NAV_ICONS.find((i) => i.key === submenuKey)!.submenu!}
						onMouseEnter={handleSubmenuMouseEnter}
						onMouseLeave={handleSubmenuMouseLeave}
						navbarWidth={NAVBAR_WIDTH}
					/>
				)}

			{/* Mobile Drawer */}
			{mobileOpen && <MobileDrawer />}
		</>
	);
};

export default VerticalNavbar;