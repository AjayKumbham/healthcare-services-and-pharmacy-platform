import React, { useState, useCallback, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { ShoppingCart } from 'lucide-react';  
import CartItem from './CartItem';  
import Navbar from "../../Components-Common/Header";  
import Footer from "../../Components-Common/Footer";  

function CartMed() {  
  const navigate = useNavigate();  
  const [items, setItems] = useState([]);  
  const [total, setTotal] = useState(0);  
  const [discount, setDiscount] = useState(20); // Set a default discount  

  const calculateTotalAmount = (items) => {  
    return items.reduce((sum, item) => {  
      if (item.selected) {  
        const discountedPrice = item.price * (1 - discount / 100);  
        return sum + (discountedPrice * item.quantity);  
      }  
      return sum;  
    }, 0);  
  }; 
  
  useEffect(() => {
      fetch(`http://localhost:8080/api/auth/getCoveragePlan?membershipId=${localStorage.getItem('membershipId')}`)
        .then(res => res.json())
        .then(data => {
          let newDiscount = 0;
          if (data === 1) {
            newDiscount = 10;
          } else if (data === 2) {
            newDiscount = 20;
          } else if (data === 3) {
            newDiscount = 40;
          }
          setDiscount(newDiscount);
        })
        .catch(error => console.error("Error fetching coverage plan:", error));
    }, []);

  useEffect(() => {  
    const membershipId = localStorage.getItem('membershipId');  
    fetch(`http://localhost:8080/api/auth/getUserCart?membershipId=${membershipId}`)  
      .then(res => {  
        if (!res.ok) throw new Error('Network response was not ok');  
        return res.json();  
      })  
      .then(cartItems => {  
        const formattedCart = cartItems.map((drug) => ({  
          id: drug.id,  
          pharmID: drug.pharmacy.phId,  
          medicationID: drug.medication.mId,  
          name: drug.medication.medName,  
          brand: drug.medication.brandName,  
          store: drug.pharmacy.address,  
          distance: `3 miles away`,  
          delivery: drug.pharmacy.hd ? "Home Delivery" : "In-store Pickup",  
          price: drug.unitPrice,  
          quantity: drug.quantity,  
          selected: true
        }));  

        setItems(formattedCart);  
      })  
      .catch(error => console.error('Error fetching cart:', error));  
  }, []);  

  useEffect(() => {  
    setTotal(calculateTotalAmount(items));  
  }, [items, discount]);

  const removeItem = (id) => {  
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));  
  };  

   

  const handleCheckboxChange = (id) => {  
    setItems(prevItems =>  
      prevItems.map(item =>  
        item.id === id ? { ...item, selected: !item.selected } : item  
      )  
    );  
  };  

  const handlevalidate = () => {  
    const selectedItems = items.filter(item => item.selected);  
    navigate('/validate', { state: { items: selectedItems } });  
  };  

  return (  
    <div className="bg-[#E8F5E9]">  
      <Navbar />  
      <div className='container mx-auto px-4 py-8 space-y-8 min-h-screen bg-[#E8F5E9] max-w-[1920px] mx-auto px-3 py-4 mt-16'>  
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6">  
          <div className="flex items-center justify-between mb-6">  
            <div className="flex items-center gap-2">  
              <ShoppingCart className="w-6 h-6 text-green-600" />  
              <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>  
            </div>  
            <div className="flex gap-3">  
              <button  
                onClick={handlevalidate}  
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"  
                disabled={!items.some(item => item.selected)}  
              >  
                Validate  
              </button>  
            </div>  
          </div>  

          <div className="flex justify-between mt-6 text-lg font-semibold">  
            <p className="text-gray-800">Total Amount:</p>  
            <p className="text-red-600">$ {total.toFixed(2)}</p>  
          </div>  

          <div className="space-y-4">  
            {items.length > 0 ? (  
              items.map(item => (  
                <CartItem  
                  key={item.id}  
                  {...item}  
                  onCheckboxChange={handleCheckboxChange}  
                  removeItem={removeItem}  
                />  
              ))  
            ) : (  
              <div className="text-center py-8 text-gray-500">  
                Your cart is empty  
              </div>  
            )}  
          </div>  
        </div>  
      </div>  
      <Footer />  
    </div>  
  );  
}  

export default CartMed;