import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(item.id, newQuantity);
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        await removeFromCart(item.id);
      } catch (error) {
        alert('Failed to remove item');
      }
    }
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="flex-1 ml-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {item.product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
            <div className="mt-2 flex items-center space-x-2">
              {item.product.discount_price ? (
                <>
                  <span className="text-lg font-semibold text-green-600">
                    ${item.product.final_price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${item.product.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-gray-900">
                  ${item.product.final_price}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800 ml-4"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm4 0a1 1 0 112 0v4a1 1 0 11-2 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-1 text-gray-900 font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>
          
          <div className="ml-6">
            <span className="text-base font-medium text-gray-900">
              Total: ${item.total_price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;