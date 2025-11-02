// Import product images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/images (3).jpeg';
import img6 from '../assets/images (4).jpeg';
import img7 from '../assets/images (5).jpeg';
import img8 from '../assets/images (6).jpeg';

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  totalAmount: number;
  items: {
    productName: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

export interface Review {
  id: string;
  retailerName: string;
  retailerLogo: string;
  rating: number;
  comment: string;
  date: string;
}

export interface UserProfile {
  location: string;
  joinedDate: string;
  totalOrders: number;
  totalReviews: number;
}

// Sample orders data
export const orders: Order[] = [
  {
    id: '#123456',
    date: 'April 20, 2024',
    status: 'Delivered',
    totalAmount: 45.50,
    items: [
      {
        productName: 'Zimgold Cooking Oil 2L',
        image: img1,
        price: 2.50,
        quantity: 2
      },
      {
        productName: 'White Bread 700g',
        image: img2,
        price: 1.99,
        quantity: 3
      },
      {
        productName: 'Fresh Milk 2L',
        image: img3,
        price: 3.45,
        quantity: 2
      },
      {
        productName: 'Sugar 2kg',
        image: img4,
        price: 4.25,
        quantity: 1
      }
    ]
  },
  {
    id: '#123455',
    date: 'April 15, 2024',
    status: 'Delivered',
    totalAmount: 32.75,
    items: [
      {
        productName: 'Rice 5kg',
        image: img5,
        price: 12.50,
        quantity: 1
      },
      {
        productName: 'Chicken 1kg',
        image: img6,
        price: 8.99,
        quantity: 2
      }
    ]
  },
  {
    id: '#123454',
    date: 'April 10, 2024',
    status: 'Delivered',
    totalAmount: 28.30,
    items: [
      {
        productName: 'Pasta 500g',
        image: img7,
        price: 2.75,
        quantity: 4
      },
      {
        productName: 'Tomato Sauce',
        image: img8,
        price: 1.89,
        quantity: 3
      }
    ]
  }
];

// Sample reviews data
export const reviews: Review[] = [
  {
    id: 'r1',
    retailerName: 'OK Mart',
    retailerLogo: '🏪',
    rating: 5,
    comment: 'Great selection and prices. Always well-stocked!',
    date: 'April 13, 2024'
  },
  {
    id: 'r2',
    retailerName: 'Pick n Pay',
    retailerLogo: '🛒',
    rating: 4,
    comment: 'Good quality products, friendly staff.',
    date: 'April 8, 2024'
  },
  {
    id: 'r3',
    retailerName: 'Bon Marche',
    retailerLogo: '🏬',
    rating: 5,
    comment: 'Best prices in town. Very satisfied!',
    date: 'March 28, 2024'
  }
];

// User profile metadata
export const userProfile: UserProfile = {
  location: 'Harare, Zimbabwe',
  joinedDate: 'January 2024',
  totalOrders: 24,
  totalReviews: 8
};
