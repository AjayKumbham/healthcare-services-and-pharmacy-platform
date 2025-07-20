import React, { useEffect, useState } from 'react';  
import { Heart, Stethoscope } from 'lucide-react';  
import Card from './Card';  

const ConditionsCard = () => {  // Removed userId as prop since it's fetching from localStorage  
  const [conditions, setConditions] = useState([]);  
  const userId = localStorage.getItem('userId'); // Fetch userId directly  

  useEffect(() => {  
    const fetchConditions = async () => {  
      try {  
        const response = await fetch(`http://localhost:8080/health-conditions/${userId}`); // Ensure the correct API path is used  
        if (!response.ok) {  
          throw new Error('Network response was not ok');  
        }  
        const data = await response.json();  
        setConditions(data);  
      } catch (error) {  
        console.error("Error fetching health conditions:", error);  
      }  
    };  

    if (userId) { // Only fetch if userId is available  
      fetchConditions();  
    }  
  }, [userId]);  

  return (  
    <Card title="Health Conditions" icon={Heart} iconColor="text-rose-500">  
      <ul className="space-y-3">  
        {conditions.length > 0 ? (  
          conditions.map((condition) => (  
            <li key={condition.hcId} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">  
              <Stethoscope size={18} className="text-gray-600" />  
              <span>{condition.conditionName}</span>  
            </li>  
          ))  
        ) : (  
          <li className="p-3 text-gray-500">No health conditions found</li>  
        )}  
      </ul>  
    </Card>  
  );  
};  

export default ConditionsCard;