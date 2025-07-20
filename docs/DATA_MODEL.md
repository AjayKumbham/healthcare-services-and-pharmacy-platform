# Data Model Overview – Healthcare Services & Pharmacy Platform

---

## Table of Contents
1. User
2. Pharmacy (PharmaStores)
3. Drug (DrugData)
4. Inventory (PharmaMedInventory)
5. Prescription
6. CartItem
7. Membership
8. Order (UserOrders)
9. DependentInformation
10. HealthInformation
11. PaymentInformation
12. DeliveryAddressInformation
13. SecurityInformation
14. ContactInformation

---

## 1. User
| Field         | Type     | Description                       |
|--------------|----------|-----------------------------------|
| id           | Long     | Unique user ID (PK)               |
| username     | String   | Username/login                    |
| password     | String   | Hashed password                   |
| email        | String   | Email address                     |
| phone        | String   | Phone number                      |
| roles        | Set<Role>| User roles (USER, ADMIN, PHARMACY)|
| membershipId | String   | Unique membership identifier      |

**Relationships:**
- Has one Membership
- Has many Orders, Prescriptions, Dependents, Addresses, Payments, HealthInfo

---

## 2. Pharmacy (PharmaStores)
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| phId      | Integer | Pharmacy/store ID (PK)     |
| name      | String  | Store name                 |
| address   | String  | Store address              |
| contact   | String  | Contact phone/email        |
| userId    | Long    | Linked user (FK)           |

**Relationships:**
- Has many Inventory items
- Has many Orders

---

## 3. Drug (DrugData)
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| mId       | Integer | Drug/medication ID (PK)    |
| medName   | String  | Medication name            |
| brandName | String  | Brand name                 |
| price     | Double  | Price per unit             |
| drugType  | Enum    | Type (Tablet, Syrup, etc.) |

**Relationships:**
- Linked to Inventory and Prescriptions

---

## 4. Inventory (PharmaMedInventory)
| Field      | Type         | Description                |
|------------|--------------|----------------------------|
| id         | Long         | Inventory ID (PK)          |
| phId       | Integer      | Pharmacy/store ID (FK)     |
| drugData   | DrugData     | Drug/medication (FK)       |
| quantity   | Integer      | Quantity in stock          |
| pricePerPill | Double     | Price per pill/unit        |

**Relationships:**
- Belongs to a Pharmacy
- References a Drug

---

## 5. Prescription
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Prescription ID (PK)       |
| membershipId | String       | User membership ID (FK)    |
| patientName  | String       | Patient name               |
| doctorName   | String       | Prescribing doctor         |
| hospitalName | String       | Hospital/clinic name       |
| date         | Date         | Prescription date          |
| medications  | List<DrugData>| List of medications       |
| endDate      | Date         | End date (if completed)    |

**Relationships:**
- Belongs to a User
- Has many Medications (DrugData)

---

## 6. CartItem
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Cart item ID (PK)          |
| membershipId | String       | User membership ID (FK)    |
| pharmacy     | Pharmacy     | Pharmacy/store (FK)        |
| medication   | DrugData     | Drug/medication (FK)       |
| quantity     | Integer      | Quantity selected          |
| unitPrice    | Double       | Price per unit             |

**Relationships:**
- Belongs to a User
- References a Pharmacy and a Drug

---

## 7. Membership
| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| id        | Long    | Membership ID (PK)         |
| planName  | String  | Plan name                  |
| planDesc  | String  | Plan description           |
| benefits  | List<String> | List of benefits        |
| discount  | Integer | Discount percentage        |

**Relationships:**
- Assigned to Users

---

## 8. Order (UserOrders)
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| orderId      | Long         | Order ID (PK)              |
| membershipId | String       | User membership ID (FK)    |
| items        | List<CartItem>| List of cart items         |
| price        | Double       | Total price                |
| status       | String       | Order status               |
| orderedDate  | Date         | Order date                 |
| deliveryTime | Date         | Scheduled delivery         |

**Relationships:**
- Belongs to a User
- Contains multiple CartItems

---

## 9. DependentInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Dependent ID (PK)          |
| membershipId | String       | User membership ID (FK)    |
| name         | String       | Dependent name             |
| healthConditions | List<String> | Health conditions       |
| allergies    | List<String> | Allergies                  |
| currentMedications | List<String> | Current medications   |

**Relationships:**
- Belongs to a User

---

## 10. HealthInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Health info ID (PK)        |
| membershipId | String       | User membership ID (FK)    |
| conditions   | List<String> | Health conditions          |
| allergies    | List<String> | Allergies                  |
| medications  | List<String> | Current medications        |
| notes        | String       | Additional notes           |

**Relationships:**
- Belongs to a User

---

## 11. PaymentInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Payment info ID (PK)       |
| membershipId | String       | User membership ID (FK)    |
| cardType     | String       | Card type (Visa, etc.)     |
| cardNumber   | String       | Card number (encrypted)    |
| expirationDate| String      | Expiry date                |
| cvv          | String       | CVV (encrypted)            |
| upiId        | String       | UPI ID (if applicable)     |

**Relationships:**
- Belongs to a User

---

## 12. DeliveryAddressInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Address ID (PK)            |
| membershipId | String       | User membership ID (FK)    |
| homeNumber   | String       | House/flat number          |
| street       | String       | Street name                |
| city         | String       | City                       |
| state        | String       | State                      |
| pinCode      | String       | Postal code                |
| country      | String       | Country                    |
| setAsDefault | Boolean      | Is default address         |

**Relationships:**
- Belongs to a User

---

## 13. SecurityInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Security info ID (PK)      |
| membershipId | String       | User membership ID (FK)    |
| password     | String       | Hashed password            |
| securityQuestion | String   | Security question          |
| securityAnswer   | String   | Security answer (hashed)   |

**Relationships:**
- Belongs to a User

---

## 14. ContactInformation
| Field         | Type         | Description                |
|--------------|--------------|----------------------------|
| id           | Long         | Contact info ID (PK)       |
| membershipId | String       | User membership ID (FK)    |
| emailAddress | String       | Email address              |
| mobileNumber | String       | Mobile number              |
| preferredContactMethod | String | Preferred contact method |

**Relationships:**
- Belongs to a User

---

## Notes
- All entities use unique IDs (auto-generated or UUIDs).
- Foreign keys and references are used to maintain relationships.
- Data validation and integrity are enforced at both application and database levels.
- Sensitive fields (passwords, card numbers, CVV) are encrypted or hashed. 