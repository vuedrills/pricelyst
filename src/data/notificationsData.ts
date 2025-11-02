export interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  category: 'Retail' | 'Restaurants' | 'Promotions';
  icon: string;
  iconBgColor: string;
  actionType?: 'add-to-list' | 'save-deal' | 'chat-ai';
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: 'New deals at Bon Marche',
    description: 'Cooking oil now $2.45 - save 15% this week.',
    timestamp: '3h',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-teal-400',
    actionType: 'add-to-list'
  },
  {
    id: 2,
    title: 'Pick n Pay Weekend Specials',
    description: 'Fresh bread 20% off. Stock up for the week!',
    timestamp: 'Yesterday',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-blue-400',
    actionType: 'save-deal'
  },
  {
    id: 3,
    title: 'OK Mart Flash Sale',
    description: 'Mealie meal 10kg bags at unbeatable prices.',
    timestamp: '2 days ago',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-green-400',
    actionType: 'add-to-list'
  },
  {
    id: 4,
    title: 'Spar Member Exclusive',
    description: 'Get 2x points on all dairy products this week.',
    timestamp: '3 days ago',
    category: 'Promotions',
    icon: 'promotions',
    iconBgColor: 'bg-purple-400'
  },
  {
    id: 5,
    title: 'Bon Marche Price Drop',
    description: 'Rice 5kg now only $8.99. Limited stock!',
    timestamp: '4 days ago',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-teal-400',
    actionType: 'chat-ai'
  },
  {
    id: 6,
    title: 'Restaurant Week Special',
    description: 'Enjoy 25% off at participating restaurants.',
    timestamp: '5 days ago',
    category: 'Restaurants',
    icon: 'restaurants',
    iconBgColor: 'bg-red-400',
    actionType: 'save-deal'
  },
  {
    id: 7,
    title: 'Pick n Pay Fresh Produce',
    description: 'Farm-fresh vegetables at 30% discount.',
    timestamp: '1 week ago',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-green-400',
    actionType: 'add-to-list'
  },
  {
    id: 8,
    title: 'Double Points Weekend',
    description: 'Earn 2x loyalty points on all purchases.',
    timestamp: '1 week ago',
    category: 'Promotions',
    icon: 'promotions',
    iconBgColor: 'bg-purple-400'
  },
  {
    id: 9,
    title: 'OK Mart New Arrivals',
    description: 'Check out our latest imported products.',
    timestamp: '2 weeks ago',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-cyan-400'
  },
  {
    id: 10,
    title: 'Spar Bakery Special',
    description: 'Freshly baked goods at 15% off daily.',
    timestamp: '2 weeks ago',
    category: 'Retail',
    icon: 'retail',
    iconBgColor: 'bg-orange-400',
    actionType: 'add-to-list'
  }
];

export const TABS = ['All', 'Retail', 'Restaurants', 'Promotions'];
