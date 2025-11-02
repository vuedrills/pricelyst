// import React from 'react';
// import { useShoppingList } from '../context/ShoppingListContext';
// import { Link } from 'react-router-dom';

// // --- Icon Components ---

// const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
//     </svg>
// );

// const DollarCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
//         <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.75 6.75a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5z" />
//         <path d="M10 2.5a.75.75 0 01.75.75v.518a3.985 3.985 0 012.449 1.94l.2.393a.75.75 0 01-1.299.748l-.2-.393a2.485 2.485 0 00-1.65-1.218.75.75 0 01-.8 1.464A2.485 2.485 0 009.25 9.75v.5a.75.75 0 01-1.5 0v-.5a3.985 3.985 0 012.449-1.94l.2-.393a.75.75 0 111.3.748l-.2.393a2.485 2.485 0 00-1.65 1.218.75.75 0 01-.8-1.464A2.485 2.485 0 0010.75 6.75v-.5a.75.75 0 01-.75-.75z" />
//     </svg>
// );

// const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//     </svg>
// );

// const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//     </svg>
// );

// const ProductIcon: React.FC<{ name: string }> = ({ name }) => {
//     const initial = name.charAt(0).toUpperCase();
    
//     return (
//         <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
//             <span className="text-lg font-bold text-amber-600">{initial}</span>
//         </div>
//     );
// };

// // --- Page Components ---

// const SponsoredBanner: React.FC = () => (
//     <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-4">
//         <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border">
//             <span className="font-bold text-gray-700 text-xs">OK Mart</span>
//         </div>
//         <div className="flex-grow">
//             <h3 className="font-bold text-gray-800">Sponsored: Massive Weekend Grocery Sale</h3>
//             <p className="text-sm text-gray-600">Up to 10% off selected groceries.</p>
//         </div>
//         <a href="#" className="flex items-center font-bold text-sm text-indigo-600 hover:text-indigo-800">
//             View Deals
//             <ChevronRightIcon className="w-4 h-4 ml-1" />
//         </a>
//     </div>
// );

// const SummaryBar: React.FC<{ stores: string[], itemsByStore: Record<string, any[]>, cheapestStore: string, cheapestTotal: number, totalItems: number }> = ({ stores, itemsByStore, cheapestStore, cheapestTotal, totalItems }) => {
//     const mostStockedStore = stores.reduce((max, store) => 
//         itemsByStore[store].length > itemsByStore[max].length ? store : max
//     , stores[0]);
    
//     return (
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-700 space-y-2 md:space-y-0 md:space-x-4">
//             <div className="flex items-center space-x-2">
//                 <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0"/>
//                 <span>{mostStockedStore} has {itemsByStore[mostStockedStore].length} of {totalItems} products available.</span>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <DollarCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0"/>
//                 <span>{cheapestStore} offers the lowest total at <strong>${cheapestTotal.toFixed(2)}</strong>.</span>
//             </div>
//         </div>
//     );
// };

// const ShoppingListTable: React.FC<{ 
//     priceMatrix: any[], 
//     stores: string[], 
//     storeTotals: Record<string, number>,
//     itemsByStore: Record<string, any[]>,
//     totalItems: number,
//     removeFromList: (productId: number) => void
// }> = ({ priceMatrix, stores, storeTotals, itemsByStore, totalItems, removeFromList }) => {
    
//     return (
//         <div className="flex flex-col lg:flex-row gap-6">
//             {/* Main Table */}
//             <div className="flex-grow bg-white border border-gray-200 rounded-xl overflow-hidden">
//                 <div className={`grid gap-4 p-4 font-bold text-gray-500 text-sm border-b`} style={{ gridTemplateColumns: `2fr repeat(${stores.length}, 1fr) auto` }}>
//                     <div>Product</div>
//                     {stores.map(store => <div key={store}>{store}</div>)}
//                     <div>Action</div>
//                 </div>
//                 <div className="divide-y divide-gray-200">
//                     {priceMatrix.map(item => (
//                         <div key={item.id} className={`grid gap-4 items-center p-4`} style={{ gridTemplateColumns: `2fr repeat(${stores.length}, 1fr) auto` }}>
//                             <div className="flex items-center space-x-3">
//                                 <ProductIcon name={item.name} />
//                                 <div>
//                                     <span className="font-medium text-gray-800 block">{item.name}</span>
//                                 </div>
//                             </div>
//                             {stores.map(store => (
//                                 <div key={store}>
//                                     <span className="font-medium text-gray-800">
//                                         {typeof item.prices[store].price === 'number'
//                                             ? `$${item.prices[store].price.toFixed(2)}`
//                                             : <span className="text-gray-400">{item.prices[store].price}</span>
//                                         }
//                                     </span>
//                                 </div>
//                             ))}
//                             <div className="flex items-center justify-end">
//                                 <button
//                                     onClick={() => removeFromList(item.id)}
//                                     className="text-red-500 hover:text-red-700"
//                                     title="Remove product from list"
//                                 >
//                                     <TrashIcon className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className={`grid gap-4 items-center p-4 bg-gray-50 border-t font-bold`} style={{ gridTemplateColumns: `2fr repeat(${stores.length}, 1fr)` }}>
//                     <div>
//                         <p>Totals</p>
//                         <p className="font-normal text-sm text-gray-500">{itemsByStore[stores[0]]?.length || 0} of {totalItems} items available</p>
//                     </div>
//                     {stores.map(store => (
//                         <div key={store}>${storeTotals[store].toFixed(2)}</div>
//                     ))}
//                 </div>
//             </div>
//             {/* Sidebar */}
//             <div className="w-full lg:w-64 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-4 space-y-4">
//                 <h3 className="font-bold text-gray-800">Store Info:</h3>
//                 <div className="space-y-3 text-sm">
//                     {stores.map(store => (
//                         <div key={store} className="border-b pb-3 last:border-b-0">
//                             <p className="font-semibold">{store}</p>
//                             <p className="text-gray-600">{itemsByStore[store].length} / {totalItems} items in stock</p>
//                             <p className="text-gray-800 font-medium mt-1">Total: ${storeTotals[store].toFixed(2)}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="space-y-2 pt-4">
//                     <button className="w-full bg-teal-500 text-white font-bold py-2.5 rounded-lg hover:bg-teal-600 transition-colors">
//                         Buy from {stores[0]}
//                     </button>
//                     {stores[1] && (
//                         <button className="w-full bg-teal-500 text-white font-bold py-2.5 rounded-lg hover:bg-teal-600 transition-colors">
//                             Buy from {stores[1]}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// const FooterActions: React.FC<{ avgSavings: number, clearList: () => void }> = ({ avgSavings, clearList }) => (
//     <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
//         <p className="text-sm text-gray-600">
//             Avg. savings compared to market prices: <strong>${avgSavings.toFixed(2)}</strong>
//         </p>
//         <div className="flex items-center space-x-2">
//             <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
//                 Download List 
//             </button>
//             <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
//                 Share List
//             </button>
//             <button 
//                 onClick={clearList}
//                 className="px-4 py-2 text-sm font-medium bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
//             >
//                 Clear List
//             </button>
//         </div>
//     </div>
// )

// // --- Main Component ---
// const MyShoppingList: React.FC = () => {
//     const { items, removeFromList, clearList, getTotalPrice } = useShoppingList();

//     // Get all unique stores from all products
//     const allStores = new Set<string>();
//     items.forEach(item => {
//         item.prices.forEach(price => allStores.add(price.shop));
//     });
//     const stores = Array.from(allStores).sort();

//     // Calculate totals per store (sum of all products' prices at that store)
//     const storeTotals = stores.reduce((acc, store) => {
//         acc[store] = items.reduce((sum, item) => {
//             const priceObj = item.prices.find(p => p.shop === store);
//             return sum + (priceObj ? priceObj.price : 0);
//         }, 0);
//         return acc;
//     }, {} as Record<string, number>);

//     // Find cheapest store
//     const cheapestStore = stores.length > 0 
//         ? stores.reduce((min, store) => storeTotals[store] < storeTotals[min] ? store : min, stores[0])
//         : '';

//     // Build price matrix: for each product, show prices from each store
//     const priceMatrix = items.map(item => {
//         const prices: Record<string, { price: number | string, itemId?: number }> = {};
//         stores.forEach(store => {
//             const priceObj = item.prices.find(p => p.shop === store);
//             prices[store] = priceObj 
//                 ? { price: priceObj.price, itemId: item.id }
//                 : { price: 'N/A' };
//         });
//         return {
//             id: item.productId,
//             name: item.productName,
//             prices
//         };
//     });

//     // Count items available per store
//     const itemsByStore = stores.reduce((acc, store) => {
//         acc[store] = items.filter(item => 
//             item.prices.some(p => p.shop === store)
//         );
//         return acc;
//     }, {} as Record<string, typeof items>);

//     // Calculate average savings (mock calculation - 15% of total)
//     const avgSavings = getTotalPrice() * 0.15;

//     if (items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center p-8">
//                     <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Your shopping list is empty</h2>
//                     <p className="text-gray-600 mb-6">Start adding products to compare prices and save!</p>
//                     <Link
//                         to="/product-search"
//                         className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
//                     >
//                         Browse Products
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-50 font-sans min-h-screen ml-20">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="space-y-6">
//                     <SponsoredBanner />
//                     <SummaryBar 
//                         stores={stores}
//                         itemsByStore={itemsByStore}
//                         cheapestStore={cheapestStore}
//                         cheapestTotal={storeTotals[cheapestStore]}
//                         totalItems={items.length}
//                     />
//                     <ShoppingListTable 
//                         priceMatrix={priceMatrix}
//                         stores={stores}
//                         storeTotals={storeTotals}
//                         itemsByStore={itemsByStore}
//                         totalItems={items.length}
//                         removeFromList={removeFromList}
//                     />
//                     <FooterActions avgSavings={avgSavings} clearList={clearList} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyShoppingList;
