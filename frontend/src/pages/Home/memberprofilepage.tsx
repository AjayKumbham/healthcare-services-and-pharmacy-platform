import React, { useEffect, useRef, useState } from 'react';
import Header from '../../Components-Common/Header';
import Footer from '../../Components-Common/Footer';
import {
  Phone,
  Mail,
  MessageSquare,
  CreditCard,
  Home,
  Heart,
  Users,
  PlusCircle,
  Trash2,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Shield,
  Clock,
  Contact
} from 'lucide-react';
import { footer } from 'framer-motion/client';

interface PaymentMethod {
  id?: number;
  cardHolderName: string;
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  upiId: string;
  membershipId: string;
}

interface FormData {
  health: {
    healthConditions: string;
    allergies: string;
    currentMedications: string;
  }
}



interface Address {
  id?: number;
  homeNumber: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  setAsDefault: boolean;
  membershipId: string;
}

interface Dependent {
  id?: number;
  name: string;
  relationship: string;
  age: string;
  gender: string;
  healthConditions: string[];
  allergies: string[];
  currentMedications: string[];
}



interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

const sections = {
  contact: {
    icon: Phone,
    title: 'Contact Information'
  },
  payment: {
    icon: CreditCard,
    title: 'Payment Method'
  },
  address: {
    icon: Home,
    title: 'Delivery Address'
  },
  health: {
    icon: Heart,
    title: 'Health Conditions'
  },
  dependents: {
    icon: Users,
    title: 'Dependent Details'
  }
} as const;

type SectionKey = keyof typeof sections;

const getMembershipId = () => {
  return localStorage.getItem('membershipId') || '';
};

// Function to fetch contact information
const fetchContactInformation = async (membershipId) => {
  const response = await fetch(`http://localhost:8080/api/auth/contact/${membershipId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

const fetchPaymentInformation = async (membershipId) => {
  const response = await fetch(`http://localhost:8080/api/auth/payment-information/${membershipId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

const fetchAddressInformation = async (membershipId) => {
  const response = await fetch(`http://localhost:8080/api/auth/delivery/${membershipId}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  return Array.isArray(data) ? data : [data];
};

const fetchHealthInformation = async (membershipId) => {
  const response = await fetch(`http://localhost:8080/api/auth/healthConditions/${membershipId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

const fetchDependentInformation = async (membershipId) => {
  const response = await fetch(`http://localhost:8080/api/auth/dependent/${membershipId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  return (Array.isArray(data) ? data : [data]).map(dep => ({
    ...dep,
    healthConditions: Array.isArray(dep.healthConditions) ? dep.healthConditions : (dep.healthConditions ? dep.healthConditions.split(',') : []),
    allergies: Array.isArray(dep.allergies) ? dep.allergies : (dep.allergies ? dep.allergies.split(',') : []),
    currentMedications: Array.isArray(dep.currentMedications) ? dep.currentMedications : (dep.currentMedications ? dep.currentMedications.split(',') : [])
  }));
};


function MemberProfilePage() {
  const [preferredContact, setPreferredContact] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState<SectionKey>('contact');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState<PaymentMethod>({
    cardHolderName: '',
    cardType: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    upiId: '',
    membershipId: ''
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    homeNumber: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    setAsDefault: false,
    membershipId: ''
  });
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [dependentHealthConditionsn, setDependentHealthConditionsn] = useState<string[]>([]);
  const [dependentAllergiesn, setDependentAllergiesn] = useState<string[]>([]);
  const [dependentMedicationsn, setDependentMedicationsn] = useState<string[]>([]);
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [currentMedications, setCurrentMedications] = useState<string[]>([]);
  const [conditionInput, setConditionInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [isAllergiesOpen, setIsAllergiesOpen] = useState(false);
  const [isMedicationsOpen, setIsMedicationsOpen] = useState(false);
  const [gender, setGender] = useState("");

  const conditionsRef = useRef<HTMLDivElement>(null);
  const allergiesRef = useRef<HTMLDivElement>(null);
  const medicationsRef = useRef<HTMLDivElement>(null);



  const [formData, setFormData] = useState({
    contact: { mobileNumber: '', emailAddress: '', preferredContactMethod: '', membershipId: getMembershipId() },
    payment: { cardHolderName: '', cardType: '', cardNumber: '', expirationDate: '', cvv: '', upiId: '', membershipId: getMembershipId() },
    address: { homeNumber: '', street: '', city: '', state: '', pinCode: '', country: '', setAsDefault: false, membershipId: getMembershipId() },
    health: { healthConditions: '', allergies: '', currentMedications: '', membershipId: getMembershipId() },
    dependents: { name: '', relationship: '', age: '', gender: '', healthConditions: '', allergies: '', currentMedications: '', membershipId: getMembershipId() }
  });

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const membershipId = getMembershipId();

        // Fetch contact information
        const contactInfo = await fetchContactInformation(membershipId);
        setFormData(prev => ({
          ...prev,
          contact: { ...prev.contact, ...contactInfo }
        }));
        setPreferredContact(contactInfo.preferredContactMethod.split(',').filter(Boolean)); // Initialize preferredContact

        // Fetch payment information
        const paymentInfo = await fetchPaymentInformation(membershipId);
        setPaymentMethods(paymentInfo);

        // Fetch address information
        const addressInfo = await fetchAddressInformation(membershipId);
        console.log(addressInfo);
        setAddresses(addressInfo);

        // Fetch health information
        const healthInfo = await fetchHealthInformation(membershipId);
        setFormData(prev => ({
          ...prev,
          health: { ...prev.health, ...healthInfo }
        }));
        setHealthConditions(healthInfo.healthConditions.split(',').filter(Boolean));
        setAllergies(healthInfo.allergies.split(',').filter(Boolean));
        setCurrentMedications(healthInfo.currentMedications.split(',').filter(Boolean));

        // Fetch dependent information
        const dependentInfo = await fetchDependentInformation(membershipId);
        console.log(dependentInfo);

        // Ensure all dependents have arrays for healthConditions, allergies, and medications
        const formattedDependents = dependentInfo.map(dep => ({
          ...dep,
          healthConditions: Array.isArray(dep.healthConditions) ? dep.healthConditions : (dep.healthConditions ? dep.healthConditions.split(',') : []),
          allergies: Array.isArray(dep.allergies) ? dep.allergies : (dep.allergies ? dep.allergies.split(',') : []),
          currentMedications: Array.isArray(dep.currentMedications) ? dep.currentMedications : (dep.currentMedications ? dep.currentMedications.split(',') : [])
        }));

        setDependents(formattedDependents);

      } catch (error) {
        console.error('Error fetching information:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (section: SectionKey, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleContactMethodChange = (method: string) => {
    setPreferredContact(prevMethods => {
      const updatedMethods = prevMethods.includes(method)
        ? prevMethods.filter(m => m !== method)
        : [...prevMethods, method];
      const preferredContactMethodString = updatedMethods.join(',');
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          preferredContactMethod: preferredContactMethodString // Store as a single string
        }
      }));

      return updatedMethods;
    });
  };

  const apiEndpoints: Record<SectionKey, string> = {
    contact: "http://localhost:8080/api/auth/contact",
    payment: "http://localhost:8080/api/auth/payment-information",
    address: "http://localhost:8080/api/auth/delivery-submit",
    health: "http://localhost:8080/api/auth/health-information",
    dependents: "http://localhost:8080/api/auth/dependent-information",
  };

  const handlePaymentInputChange = (index, field, value) => {
    const updatedPaymentMethods = [...paymentMethods];
    updatedPaymentMethods[index][field] = value;
    setPaymentMethods(updatedPaymentMethods);

    // Update newPaymentMethod for the latest payment method
    if (index === paymentMethods.length - 1) {
      setNewPaymentMethod(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleAddressInputChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);

    if (index === addresses.length - 1) {
      setNewAddress(prevState => ({ ...prevState, [field]: value }));
    }
  };

  const handleDependentInputChange = (index, field, value) => {
    setDependents(prev =>
      prev.map((dependent, i) =>
        i === index ? { ...dependent, [field]: value } : dependent
      )
    );
  };


  const addPaymentMethod = () => {
    setPaymentMethods(prev => [
      ...prev,
      { cardHolderName: '', cardType: '', cardNumber: '', expirationDate: '', cvv: '', upiId: '', membershipId: getMembershipId() }
    ]);
  };

  const addAddress = () => {
    setAddresses(prev => [
      ...prev,
      { homeNumber: '', street: '', city: '', state: '', pinCode: '', country: '', setAsDefault: false, membershipId: getMembershipId() }
    ]);
  };

  const addDependent = () => {
    if (dependents.length >= 4) {
      alert("You can only add up to 4 dependents.");
      return;
    }

    setDependents(prev => [
      ...prev,
      {
        name: '',
        relationship: '',
        age: '',
        gender: '',
        healthConditions: [], // Ensure it's an array
        allergies: [],
        currentMedications: [],
        membershipId: getMembershipId()
      }
    ]);
  };


  const removePaymentMethod = async (index) => {
    try {
      // Get the payment method to be deleted
      const paymentMethodToDelete = paymentMethods[index];

      // Send a DELETE request to the backend if the payment method has an ID
      if (paymentMethodToDelete.id) {
        const response = await fetch(`http://localhost:8080/api/auth/payment-information/${paymentMethodToDelete.id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete payment method");
      }

      // Update the state to remove the payment method
      setPaymentMethods(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      alert("Error deleting payment method");
    }
  };

  const removeAddress = async (index) => {
    try {
      const addressToDelete = addresses[index];

      if (addressToDelete.id) {
        const response = await fetch(`http://localhost:8080/api/auth/delivery-submit/${addressToDelete.id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to delete address");
      }

      setAddresses(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      alert("Error deleting address");
    }
  };

  const removeDependent = async (index) => {

    showNotification("info", "You are not Authorized to delete a Dependent directly, Raise a query");

  };


  const handleSectionSubmit = async (section: SectionKey) => {
    setLoading(prev => ({ ...prev, [section]: true }));

    try {
      const membershipId = formData.contact.membershipId;
      const checkResponse = await fetch(`http://localhost:8080/api/auth/user-status/${membershipId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!checkResponse.ok) throw new Error("Error checking membership ID");

      const status = await checkResponse.json();

      let method = status[section] ? "PUT" : "POST"; // Use PUT if the section exists, otherwise POST
      let url = apiEndpoints[section];
      let paymentUrl = apiEndpoints['payment']
      let addressUrl = apiEndpoints['address']
      let dependentUrl = apiEndpoints['dependents']

      if (method === "PUT") {
        url += `/${membershipId}`;
      }


      if (section === 'payment') {
        for (const paymentMethod of paymentMethods) {
          // Determine whether to update or add a new payment method based on the presence of the id
          const method = paymentMethod.id ? 'PUT' : 'POST';
          const endpoint = paymentMethod.id ? `${paymentUrl}/${paymentMethod.id}` : paymentUrl; // Append id to URL for update

          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentMethod), // Use payment method data
          });

          if (!response.ok) throw new Error("Failed to update section");
        }

      } else if (section === 'address') {
        for (const address of addresses) {
          // Determine whether to update or add a new address based on the presence of the id
          const method = address.id ? 'PUT' : 'POST';
          const endpoint = address.id ? `${addressUrl}/${address.id}` : addressUrl; // Append id to URL for update
          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address), // Use address data
          });

          if (!response.ok) throw new Error("Failed to update section");
        }
      } else if (section === 'dependents') {
        for (const dependent of dependents) {

          const method = dependent.id ? 'PUT' : 'POST';
          const endpoint = dependent.id ? `${dependentUrl}/${dependent.id}` : dependentUrl;

          // Convert arrays to comma-separated strings
          const formattedDependent = {
            ...dependent,
            healthConditions: dependent.healthConditions.join(','),
            allergies: dependent.allergies.join(','),
            currentMedications: dependent.currentMedications.join(',')
          };

          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedDependent),
          });

          if (!response.ok) throw new Error("Failed to update section");
        }
      } else {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData[section]), // Using formData to submit section data
        });

        if (!response.ok) throw new Error("Failed to update section");
      }

      showNotification("success", `${sections[section].title} updated successfully`);

      // Move to the next section if successful
      const sectionKeys = Object.keys(sections) as SectionKey[];
      const currentIndex = sectionKeys.indexOf(section);
      if (currentIndex < sectionKeys.length - 1) {
        setActiveSection(sectionKeys[currentIndex + 1]);
      }
    } catch (error) {
      showNotification("error", `Error updating ${sections[section].title}`);
    } finally {
      setLoading(prev => ({ ...prev, [section]: false }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (conditionsRef.current && !conditionsRef.current.contains(event.target as Node)) {
        setIsConditionsOpen(false);
      }
      if (allergiesRef.current && !allergiesRef.current.contains(event.target as Node)) {
        setIsAllergiesOpen(false);
      }
      if (medicationsRef.current && !medicationsRef.current.contains(event.target as Node)) {
        setIsMedicationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addValueToField = (setFunction: React.Dispatch<React.SetStateAction<string[]>>, values: string[], value: string) => {
    if (!value) return;
    if (values.includes(value)) return;

    const updatedValues = [...values, value];
    setFunction(updatedValues);
    setFormData(prev => ({
      ...prev,
      health: {
        ...prev.health,
        [setFunction === setHealthConditions ? 'healthConditions' : setFunction === setAllergies ? 'allergies' : 'currentMedications']: updatedValues.join(',')
      }
    }));
  };

  const removeValueFromField = (setFunction: React.Dispatch<React.SetStateAction<string[]>>, values: string[], index: number) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setFunction(updatedValues);
    setFormData(prev => ({
      ...prev,
      health: {
        ...prev.health,
        [setFunction === setHealthConditions ? 'healthConditions' : setFunction === setAllergies ? 'allergies' : 'currentMedications']: updatedValues.join(',')
      }
    }));
  };

  const conditionsList = ["Diabetes", "Hypertension", "Asthma", "Arthritis"];
  const allergiesList = [
    "Anesthesia (Lidocaine, General Anesthesia)", "Aspirin & NSAIDs (Ibuprofen, Naproxen)", "Chemotherapy Drugs",
    "Chlorine (Swimming Pools)", "Cockroach Droppings", "Contrast Dye (Used in CT scans & MRIs)", "Dust Mites",
    "Formaldehyde (Cosmetics, Cleaning Products)", "Fragrances & Perfumes", "Fungal Spores",
    "Hair Dyes (PPD - Paraphenylenediamine)", "Insulin (Animal-derived)", "Insect Stings (Bees, Wasps, Ants)",
    "Latex (Gloves, Balloons, Medical Equipment)", "Mold Spores", "Nickel (Jewelry, Coins, Eyewear)",
    "Opioids (Morphine, Codeine)", "Parabens & Preservatives (Shampoos, Lotions)", "Penicillin and Other Antibiotics",
    "Pet Dander (Cats, Dogs, Horses, etc.)", "Pollen (Tree, Grass, Weed)", "Rubber & Adhesives",
    "Sulfa Drugs", "Sunscreens (Oxybenzone)", "Certain Soaps & Detergents", "Synthetic Fabrics & Wool"
  ];
  const medicationsList = [
    "Acetaminophen (Tylenol)", "Ibuprofen (Advil, Motrin)", "Aspirin (Bayer)", "Naproxen (Aleve)",
    "Lisinopril (Zestril)", "Amlodipine (Norvasc)", "Metoprolol (Lopressor)", "Losartan (Cozaar)",
    "Metformin (Glucophage)", "Glipizide (Glucotrol)", "Januvia (Sitagliptin)", "Ozempic (Semaglutide)",
    "Atorvastatin (Lipitor)", "Simvastatin (Zocor)", "Rosuvastatin (Crestor)",
    "Sertraline (Zoloft)", "Fluoxetine (Prozac)", "Escitalopram (Lexapro)", "Bupropion (Wellbutrin)",
    "Alprazolam (Xanax)", "Lorazepam (Ativan)", "Diazepam (Valium)",
    "Cetirizine (Zyrtec)", "Loratadine (Claritin)", "Fexofenadine (Allegra)", "Diphenhydramine (Benadryl)",
    "Albuterol (ProAir, Ventolin)", "Fluticasone (Flovent)", "Montelukast (Singulair)",
    "Amoxicillin", "Azithromycin (Z-Pak)", "Ciprofloxacin (Cipro)", "Doxycycline",
    "Omeprazole (Prilosec)", "Esomeprazole (Nexium)", "Famotidine (Pepcid)",
    "Zolpidem (Ambien)", "Melatonin", "Trazodone",
    "Levothyroxine (Synthroid)", "Liothyronine (Cytomel)"
  ];

  const dependentAddValueToField = (index: number, field: keyof Dependent, value: string) => {
    if (!value) return;

    setDependents(prev =>
      prev.map((dependent, i) =>
        i === index
          ? {
            ...dependent,
            [field]: [...(dependent[field] as string[]), value]
          }
          : dependent
      )
    );
  };

  const dependentRemoveValueFromField = (index: number, field: keyof Dependent, itemIndex: number) => {
    setDependents(prev =>
      prev.map((dependent, i) =>
        i === index
          ? {
            ...dependent,
            [field]: (dependent[field] as string[]).filter((_, j) => j !== itemIndex)
          }
          : dependent
      )
    );
  };

  const renderSection = (section: SectionKey) => {
    switch (section) {
      case 'contact':
        return (
          <div>
            {isLoading ? (
              <p>Loading...</p> // Replace with a loader component if needed
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={formData.contact.mobileNumber}
                        onChange={(e) => handleInputChange('contact', 'mobileNumber', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block w-full p-2.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.contact.emailAddress}
                        onChange={(e) => handleInputChange('contact', 'emailAddress', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {['mobile', 'email', 'text'].map(method => (
                      <label
                        key={method}
                        className={`flex items-center space-x-2 p-2 rounded-lg border transition-colors cursor-pointer ${preferredContact.includes(method) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                      >
                        <input
                          type="checkbox"
                          checked={preferredContact.includes(method)}
                          onChange={() => handleContactMethodChange(method)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.contact && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.contact}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'payment':
        return (
          <div>
            {paymentMethods.map((method, index) => (
              <div key={index} className="space-y-4 mt-5 mb-2 border border-black-400 rounded-lg p-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={method.cardHolderName}
                      onChange={(e) => handlePaymentInputChange(index, 'cardHolderName', e.target.value)}
                      className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Card Type</label>
                    <div className="relative">
                      <select
                        value={method.cardType}
                        onChange={(e) => handlePaymentInputChange(index, 'cardType', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                      >
                        <option value="">Select Card Type</option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="amex">American Express</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• ••••"
                      value={method.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()} // Format for display
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\s/g, ''); // Remove spaces
                        if (/^\d{0,16}$/.test(rawValue)) { // Ensure max 16 digits
                          handlePaymentInputChange(index, 'cardNumber', rawValue); // Save without spaces
                        }
                      }}
                      maxLength={19} // 16 digits + 3 spaces
                      className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={method.expirationDate
                          .replace(/\D/g, '')
                          .replace(/^([2-9])/, '0$1')
                          .replace(/^(1[3-9])/, '01$1')
                          .replace(/^(\d{2})(\d{0,2})$/, '$1/$2')
                          .trim()
                        }
                        onChange={(e) => {
                          let rawValue = e.target.value.replace(/\D/g, '');

                          if (rawValue.length >= 1 && rawValue[0] > '1') {
                            rawValue = '0' + rawValue;
                          }

                          if (rawValue.length >= 2) {
                            const month = parseInt(rawValue.slice(0, 2), 10);
                            if (month > 12) {
                              rawValue = '01' + rawValue.slice(2);
                            }
                          }

                          handlePaymentInputChange(index, 'expirationDate', rawValue);
                        }}
                        maxLength={5}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block w-full p-2.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={method.cvv}
                        onChange={(e) => handlePaymentInputChange(index, 'cvv', e.target.value)}
                        maxLength={3}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block w-full p-2.5 break-words"
                      />
                    </div>
                  </div>

                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                    <input
                      type="text"
                      placeholder="username@bank"
                      value={method.upiId}
                      onChange={(e) => handlePaymentInputChange(index, 'upiId', e.target.value)}
                      className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                    />
                    <p className="text-sm text-gray-500 pb-5">Enter your UPI ID for quick payments</p>
                  </div>
                  <button onClick={() => removePaymentMethod(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Remove</button>
                </div>
              </div>
            ))}
            <button onClick={addPaymentMethod} className="text-blue-500">Add Payment Method</button>
          </div>
        );

      case 'address':
        return (
          <div>
            {addresses.map((address, index) => (
              <div key={index} className="space-y-4 mt-5 mb-2 border border-black-400 rounded-lg p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Home Number</label>
                    <input
                      type="text"
                      placeholder="House Number / Door Number"
                      value={address.homeNumber}
                      onChange={(e) => handleAddressInputChange(index, 'homeNumber', e.target.value)}
                      className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Street</label>
                    <input
                      type="text"
                      placeholder="Building, floor, Street Name, etc."
                      value={address.street}
                      onChange={(e) => handleAddressInputChange(index, 'street', e.target.value)}
                      className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => handleAddressInputChange(index, 'city', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => handleAddressInputChange(index, 'state', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={address.pinCode}
                        onChange={(e) => handleAddressInputChange(index, 'pinCode', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <input
                        type="text"
                        placeholder="Country"
                        value={address.country}
                        onChange={(e) => handleAddressInputChange(index, 'country', e.target.value)}
                        className="rounded-lg border border-black-100 focus:ring-black focus:border-black block p-2.5"
                      />
                    </div>
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500"
                      checked={address.setAsDefault}
                      onChange={(e) => handleAddressInputChange(index, 'setAsDefault', e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">Set as default address</span>
                  </label>
                </div>
                <button onClick={() => removeAddress(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Remove</button>
              </div>
            ))}
            <button onClick={addAddress} className="text-blue-500">Add Address</button>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6">

              {/* Health Conditions */}
              <div className="space-y-2 relative" ref={conditionsRef}>
                <label className="block text-sm font-medium text-gray-700">
                  Health Conditions
                </label>
                <input
                  type="text"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  onFocus={() => setIsConditionsOpen(true)}
                  className="w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  placeholder="Search for conditions..."
                />
                {isConditionsOpen && (
                  <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-48 overflow-y-auto">
                      {conditionsList
                        .filter(c => c.toLowerCase().includes(conditionInput.toLowerCase()))
                        .map((condition, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              addValueToField(setHealthConditions, healthConditions, condition);
                              setConditionInput("");
                              setIsConditionsOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {condition}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {healthConditions.map((condition, index) => (
                    <div key={index} className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1">
                      <span>{condition}</span>
                      <button
                        onClick={() => removeValueFromField(setHealthConditions, healthConditions, index)}
                        className="ml-2 text-blue-700 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-2 relative" ref={allergiesRef}>
                <label className="block text-sm font-medium text-gray-700">
                  Allergies
                </label>
                <input
                  type="text"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onFocus={() => setIsAllergiesOpen(true)}
                  className="w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  placeholder="Search for allergies..."
                />
                {isAllergiesOpen && (
                  <div className="absolute z-10 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-48 overflow-y-auto">
                      {allergiesList
                        .filter(a => a.toLowerCase().includes(allergyInput.toLowerCase()))
                        .map((allergy, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              addValueToField(setAllergies, allergies, allergy);
                              setAllergyInput("");
                              setIsAllergiesOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {allergy}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center bg-red-50 text-red-700 rounded-full px-3 py-1">
                      <span>{allergy}</span>
                      <button
                        onClick={() => removeValueFromField(setAllergies, allergies, index)}
                        className="ml-2 text-red-700 hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div className="space-y-2 relative" ref={medicationsRef}>
                <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                <input
                  type="text"
                  value={medicationInput}
                  onChange={(e) => setMedicationInput(e.target.value)}
                  onFocus={() => setIsMedicationsOpen(true)}
                  className="w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  placeholder="Search for medications..."
                />
                {isMedicationsOpen && (
                  <div className="absolute z-10 w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="max-h-48 overflow-y-auto">
                      {medicationsList
                        .filter(m => m.toLowerCase().includes(medicationInput.toLowerCase()))
                        .map((medication, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              addValueToField(setCurrentMedications, currentMedications, medication);
                              setMedicationInput("");
                              setIsMedicationsOpen(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {medication}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentMedications.map((medication, index) => (
                    <div key={index} className="flex items-center bg-green-50 text-green-700 rounded-full px-3 py-1">
                      <span>{medication}</span>
                      <button
                        onClick={() => removeValueFromField(setCurrentMedications, currentMedications, index)}
                        className="ml-2 text-green-700 hover:text-green-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'dependents':
        return (
          <div>
            <button
              onClick={addDependent}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              disabled={dependents.length >= 4}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Dependent</span>
            </button>

            {dependents.map((dependent, index) => (
              <div key={index} className="space-y-4 mt-5 mb-2 border border-black-400 rounded-lg p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={dependent.name}
                      onChange={(e) => handleDependentInputChange(index, 'name', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select
                      value={dependent.relationship}
                      onChange={(e) => handleDependentInputChange(index, 'relationship', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="text"
                      placeholder="eg : 18"
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                      value={dependent.age}
                      onChange={(e) => handleDependentInputChange(index, 'age', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={dependent.gender}
                      onChange={(e) => handleDependentInputChange(index, 'gender', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div ref={conditionsRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Health Conditions</label>
                    <input
                      type="text"
                      value={conditionInput}
                      onChange={(e) => {
                        setConditionInput(e.target.value);
                        setIsConditionsOpen(true);
                      }}
                      onFocus={() => setIsConditionsOpen(true)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="Search conditions..."
                    />
                    {isConditionsOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {conditionsList
                          .filter(condition =>
                            condition.toLowerCase().includes(conditionInput.toLowerCase())
                          )
                          .map((condition, i) => (
                            <div
                              key={i}
                              className="p-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
                              onClick={() => {
                                dependentAddValueToField(index, 'healthConditions', condition);
                                setConditionInput('');
                                setIsConditionsOpen(false);
                              }}
                            >
                              {condition}
                            </div>
                          ))
                        }
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dependent.healthConditions.map((condition, conditionIndex) => (
                        <div
                          key={conditionIndex}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span>{condition}</span>
                          <button
                            onClick={() => dependentRemoveValueFromField(index, 'healthConditions', conditionIndex)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div ref={allergiesRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                    <input
                      type="text"
                      value={allergyInput}
                      onChange={(e) => {
                        setAllergyInput(e.target.value);
                        setIsAllergiesOpen(true);
                      }}
                      onFocus={() => setIsAllergiesOpen(true)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="Search allergies..."
                    />
                    {isAllergiesOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {allergiesList
                          .filter(allergy =>
                            allergy.toLowerCase().includes(allergyInput.toLowerCase())
                          )
                          .map((allergy, i) => (
                            <div
                              key={i}
                              className="p-2.5 hover:bg-red-50 cursor-pointer transition-colors"
                              onClick={() => {
                                dependentAddValueToField(index, 'allergies', allergy);
                                setAllergyInput('');
                                setIsAllergiesOpen(false);
                              }}
                            >
                              {allergy}
                            </div>
                          ))
                        }
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dependent.allergies.map((allergy, allergyIndex) => (
                        <div
                          key={allergyIndex}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span>{allergy}</span>
                          <button
                            onClick={() => dependentRemoveValueFromField(index, 'allergies', allergyIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div ref={medicationsRef} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                    <input
                      type="text"
                      value={medicationInput}
                      onChange={(e) => {
                        setMedicationInput(e.target.value);
                        setIsMedicationsOpen(true);
                      }}
                      onFocus={() => setIsMedicationsOpen(true)}
                      className="w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                      placeholder="Search medications..."
                    />
                    {isMedicationsOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {medicationsList
                          .filter(medication =>
                            medication.toLowerCase().includes(medicationInput.toLowerCase())
                          )
                          .map((medication, i) => (
                            <div
                              key={i}
                              className="p-2.5 hover:bg-green-50 cursor-pointer transition-colors"
                              onClick={() => {
                                dependentAddValueToField(index, 'currentMedications', medication);
                                setMedicationInput('');
                                setIsMedicationsOpen(false);
                              }}
                            >
                              {medication}
                            </div>
                          ))
                        }
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dependent.currentMedications.map((medication, medicationIndex) => (
                        <div
                          key={medicationIndex}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span>{medication}</span>
                          <button
                            onClick={() => dependentRemoveValueFromField(index, 'currentMedications', medicationIndex)}
                            className="text-green-600 hover:text-green-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => removeDependent(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mt-5"
                  >
                    Remove Dependent
                  </button>
                </div>
              </div>
            ))}

          </div>
        );

    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="min-h-screen bg-[#E8F5E9] py-8 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto px-3 py-4 mt-16">
          {/* Notifications */}
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-lg text-white flex items-center space-x-2 transition-all duration-500 ${notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
              >
                {notification.type === 'success' ? <Check className="w-5 h-5" /> :
                  notification.type === 'error' ? <X className="w-5 h-5" /> :
                    <AlertCircle className="w-5 h-5" />}
                <span>{notification.message}</span>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Member Profile</h1>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                {(Object.keys(sections) as SectionKey[]).map((section, index) => {
                  const SectionIcon = sections[section].icon;
                  return (
                    <button
                      key={section}
                      className={`flex flex-col items-center cursor-pointer transition-colors duration-200 ${activeSection === section ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
                        }`}
                      onClick={() => setActiveSection(section)}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 ${activeSection === section ? 'bg-green-600 text-white' : 'bg-gray-200'
                        }`}>
                        <SectionIcon className="w-5 h-5" />
                      </div>
                      <span className="text-sm capitalize">{sections[section].title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Section Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 transform transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between text-gray-800 mb-4">
                <div className="flex items-center space-x-2">
                  {React.createElement(sections[activeSection].icon, { className: "w-5 h-5" })}
                  <h2 className="text-xl font-semibold">{sections[activeSection].title}</h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-blue-500">Your information is secure</span>
                </div>
              </div>

              {renderSection(activeSection)}

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => handleSectionSubmit(activeSection)}
                  disabled={loading[activeSection]}
                  className={`bg-green-600 text-white rounded-lg px-6 py-2 flex items-center space-x-2 hover:bg-green-700 transition-colors ${loading[activeSection] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {loading[activeSection] ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MemberProfilePage;