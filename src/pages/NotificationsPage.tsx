import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifications, TABS, Notification } from '../data/notificationsData';

// --- Icon Components ---



const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.822l3.498-8.625a.75.75 0 00-.715-.922H5.512m11.338 6.063l-1.932 4.745M7.5 14.25h11.218" />
    </svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const BookmarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.5 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
);

const UtensilsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.214 17.348a2.38 2.38 0 01-2.083.792L9.25 18a.375.375 0 01-.375-.375v-3.375c0-.138.079-.264.201-.332l2.365-1.245a.375.375 0 01.53.208l.385.923a.375.375 0 00.53.208l2.365-1.245a.375.375 0 01.53.208l.385.923a.375.375 0 00.53.208l2.365-1.245a.375.375 0 01.53.208l.385.923a.375.375 0 00.53.208l.057-.03a.375.375 0 01.408.408v.868a.375.375 0 01-.375.375h-.375a2.38 2.38 0 01-2.083-.792L14.75 16.5m-2.536.848l-2.083.792" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.375 6.375V2.625h-3.75V6.375m3.75 0c0 .414-.336.75-.75.75h-2.25a.75.75 0 01-.75-.75V2.625m3.75 3.75c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V5.625m0 0c0-.414-.336-.75-.75-.75h-.75a.75.75 0 00-.75.75v.75" />
    </svg>
);

const GiftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A3.375 3.375 0 006.375 8.25H17.625A3.375 3.375 0 0012 4.875z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v6.75" />
    </svg>
);


const ICON_MAP = {
    retail: (props: any) => <ShoppingCartIcon {...props} />,
    restaurants: (props: any) => <UtensilsIcon {...props} />,
    promotions: (props: any) => <GiftIcon {...props} />,
};

// --- Page Components ---


const ToggleSwitch: React.FC<{ enabled: boolean, onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <button
        onClick={() => onChange(!enabled)}
        className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
        <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
    </button>
);

const PreferencesSidebar: React.FC = () => {
    const [preferences, setPreferences] = useState({
        retail: true,
        restaurants: true,
        promotions: true,
    });

    const handleToggle = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <aside className="hidden lg:block w-72 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
            <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Retail Deals</span>
                    <ToggleSwitch enabled={preferences.retail} onChange={() => handleToggle('retail')} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Restaurants & Food</span>
                    <ToggleSwitch enabled={preferences.restaurants} onChange={() => handleToggle('restaurants')} />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-700">Pricelyst Promotions</span>
                    <ToggleSwitch enabled={preferences.promotions} onChange={() => handleToggle('promotions')} />
                </div>
            </div>
        </aside>
    );
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const Icon = ICON_MAP[notification.icon as keyof typeof ICON_MAP];
    return (
        <div className="flex items-start space-x-4 py-4">
            <div className={`p-3 rounded-lg ${notification.iconBgColor}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 border-b border-gray-200 pb-4">
                <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-800">{notification.title}</h4>
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="text-gray-600 mt-1">{notification.description}</p>
                {notification.actionType && (
                    <div className="flex items-center space-x-2 mt-3">
                        {notification.actionType === 'add-to-list' && (
                            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-200">
                                <ShoppingCartIcon className="w-4 h-4" />
                                <span>Add to Shopping List</span>
                            </button>
                        )}
                        {notification.actionType === 'save-deal' && (
                            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-200">
                                <BookmarkIcon className="w-4 h-4" />
                                <span>Save Deal</span>
                            </button>
                        )}
                        {notification.actionType === 'chat-ai' && (
                            <Link to="/chat" className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-200">
                                <HeartIcon className="w-4 h-4" />
                                <span>Chat with AI</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const NotificationsFeed: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredNotifications = activeTab === 'All'
        ? notifications
        : notifications.filter(n => n.category === activeTab);

    return (
        <main className="rounded-lg">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Your Notifications</h1>
                <div className="mt-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {filteredNotifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
        </main>
    );
};

// --- Main Component ---
const NotificationsPage: React.FC = () => {
    return (
        <div className="ml-20">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8 justify-end mr-8">
                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl">
                        <NotificationsFeed />
                    </div>
                    
                    {/* Sidebar - Right Side */}
                    <div className="flex-shrink-0">
                        <div className="sticky top-8">
                            <PreferencesSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
