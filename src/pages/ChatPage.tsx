import React, { useState, useCallback, useRef, useEffect } from 'react';
import searchProductsData from '../data/searchProducts.json';

// --- Types ---
interface RetailerInfo {
  name: string;
  productDescription: string;
  price: string;
}

interface AgentResponseData {
  summary: string;
  retailers: RetailerInfo[];
  savings: string;
}

type MessageContent = string | AgentResponseData;

interface Message {
  id: number;
  sender: 'user' | 'agent';
  content: MessageContent;
}

// --- Mock Service (replacing Gemini API) ---
const getShoppingResponse = async (promptText: string): Promise<AgentResponseData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Cast the imported data
  const products = searchProductsData as Array<{
    id: number;
    name: string;
    category: string;
    brand: string;
    prices: Array<{ shop: string; price: number; promo: string }>;
  }>;

  // Find products matching the query
  const lowerQuery = promptText.toLowerCase();
  const matchingProducts = products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.category.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery)
  );

  if (matchingProducts.length > 0) {
    // Get the first matching product
    const product = matchingProducts[0];
    
    // Sort prices to find cheapest
    const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
    const cheapest = sortedPrices[0];
    const secondCheapest = sortedPrices[1];
    const thirdCheapest = sortedPrices[2] || sortedPrices[1];
    
    const savings = secondCheapest 
      ? (secondCheapest.price - cheapest.price).toFixed(2)
      : '0.00';

    return {
      summary: `The cheapest ${product.name} right now is at ${cheapest.shop} for $${cheapest.price.toFixed(2)}.`,
      retailers: [
        { 
          name: cheapest.shop, 
          productDescription: product.name, 
          price: `$${cheapest.price.toFixed(2)}` 
        },
        { 
          name: secondCheapest.shop, 
          productDescription: product.name, 
          price: `$${secondCheapest.price.toFixed(2)}` 
        },
        { 
          name: thirdCheapest.shop, 
          productDescription: product.name, 
          price: `$${thirdCheapest.price.toFixed(2)}` 
        },
      ],
      savings: `You save $${savings} by shopping at ${cheapest.shop}.`,
    };
  }

  // Fallback to first few products if no match
  const fallbackProduct = products[0];
  const sortedPrices = [...fallbackProduct.prices].sort((a, b) => a.price - b.price);
  
  return {
    summary: `I found some products that might interest you. Here are the best prices for ${fallbackProduct.name}:`,
    retailers: sortedPrices.slice(0, 3).map(p => ({
      name: p.shop,
      productDescription: fallbackProduct.name,
      price: `$${p.price.toFixed(2)}`
    })),
    savings: `You save $${(sortedPrices[1].price - sortedPrices[0].price).toFixed(2)} by shopping at ${sortedPrices[0].shop}.`,
  };
};

// --- Icon Components ---
const AgentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 10.5a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H8.25zm.75 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H9.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// --- Chat Components ---
const AgentResponseCard: React.FC<{ data: AgentResponseData }> = ({ data }) => {
  const getLogoUrl = (name: string) => `https://logo.clearbit.com/${name.replace(/\s+/g, '').toLowerCase()}.com`;

  return (
    <div className="bg-cyan-50/50 text-gray-800 p-4 rounded-xl max-w-2xl">
      <div className="flex items-start space-x-3 mb-4">
        <div className="bg-gray-200 p-1.5 rounded-full">
          <AgentIcon className="w-6 h-6 text-gray-600" />
        </div>
        <p className="font-medium pt-1">Here's what I found for you</p>
      </div>

      <div className="space-y-4">
        <p className="break-words">{data.summary}</p>
        <p className="break-words">Here's how it compares with other retailers:</p>
        
        <div className="bg-white p-3 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="font-semibold p-2 whitespace-nowrap">Retailer</th>
                <th className="font-semibold p-2">Product</th>
                <th className="font-semibold p-2 whitespace-nowrap">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.retailers.map((item, index) => (
                <tr key={index} className={index === 0 ? 'font-bold' : ''}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={getLogoUrl(item.name)} 
                        alt={item.name} 
                        className="h-6 w-6 object-contain flex-shrink-0" 
                        onError={(e) => { 
                          e.currentTarget.style.display = 'none'; 
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className="line-clamp-2">{item.productDescription}</span>
                  </td>
                  <td className="p-2 whitespace-nowrap">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="font-bold text-teal-700 break-words">{data.savings}</p>
      </div>
      
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm hover:bg-gray-50">
          View All Products
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm hover:bg-gray-50">
          Add to Shopping List
        </button>
        <button className="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full text-sm hover:bg-gray-50">
          Show Promotions
        </button>
      </div>
    </div>
  );
};

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-white text-gray-800 p-3 rounded-xl rounded-br-none shadow-sm flex items-center max-w-md">
          <p className="flex-grow">{message.content as string}</p>
          <ChevronRightIcon className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
        </div>
      </div>
    );
  }

  // Agent message
  if (typeof message.content === 'string') {
    return (
      <div className="flex justify-start">
        <div className="bg-cyan-50/50 text-gray-800 p-3 rounded-xl rounded-bl-none shadow-sm max-w-md">
          {message.content}
        </div>
      </div>
    );
  }

  return <AgentResponseCard data={message.content} />;
};

const ChatInput: React.FC<{ onSendMessage: (text: string) => void, isLoading: boolean }> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 p-4 pb-6">
      <div className="relative max-w-3xl mx-auto">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isLoading ? "AI is thinking..." : "Ask for a price..."}
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 text-white rounded-full h-9 w-9 flex items-center justify-center disabled:bg-gray-300 hover:bg-teal-600 transition-colors"
          aria-label="Send message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

// --- Main Chat Page Component ---
const ChatPage: React.FC = () => {
  const initialMessages: Message[] = [
    {
      id: 1,
      sender: 'user',
      content: 'Where can I get the cheapest mealie meal?',
    },
    {
      id: 2,
      sender: 'agent',
      content: {
        summary: 'The cheapest 10kg Mealie Meal right now is at OK Mart for $6.85.',
        retailers: [
          { name: 'OK Mart', productDescription: 'Red Seal Roller Meal 10kg', price: '$6.85' },
          { name: 'Bon Marche', productDescription: 'Bon Marche Super Roller Meal 10kg', price: '$7.10' },
          { name: 'Pick n Pay', productDescription: 'White Star Mealie Meal 10kg', price: '$7.05' },
        ],
        savings: 'You save $0.25 by shopping at OK Mart.',
      },
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newUserMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: text,
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const agentResponseData = await getShoppingResponse(text);
      const newAgentMessage: Message = {
        id: Date.now() + 1,
        sender: 'agent',
        content: agentResponseData,
      };
      setMessages(prev => [...prev, newAgentMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = 'Sorry, I had trouble finding that. Could you try asking in a different way?';
      const newAgentErrorMessage: Message = {
        id: Date.now() + 1,
        sender: 'agent',
        content: errorMessage,
      };
      setMessages(prev => [...prev, newAgentErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ml-20">
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-cyan-50/50 text-gray-500 p-3 rounded-xl rounded-bl-none shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatPage;
