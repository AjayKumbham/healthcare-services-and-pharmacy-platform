# API Reference – PrimaryUserController Endpoints

---

## 1. Get User Coverage Plan

**GET** `/api/auth/getCoveragePlan`

- **Description:** Get the user's coverage plan by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/getCoveragePlan?membershipId=ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Returns the coverage plan ID (number)
    ```json
    1
    ```
- **Error Responses:**
  - `200 OK` – Returns `1` if user not found (default plan)
- **Notes:**
  - Coverage plan IDs: 1 (Basic), 2 (Plus), 3 (Premium)

---

## 2. Validate Membership ID

**GET** `/api/auth/validateMembershipId/{membershipId}`

- **Description:** Validate if a membershipId exists in the system.
- **Authentication:** Not required
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/validateMembershipId/ENU12345
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Membership ID is valid"
    ```
  - `404 Not Found` –
    ```json
    "Membership ID not found"
    ```
- **Error Responses:**
  - `404 Not Found` – Membership ID does not exist

---

## 3. Add Dependent Information

**POST** `/api/auth/dependent-information`

- **Description:** Add a new dependent for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing the dependent
    ```json
    {
      "membershipId": "ENU12345",
      "name": "Jane Doe",
      "healthConditions": ["Asthma"],
      "allergies": ["Peanuts"],
      "currentMedications": ["Inhaler"]
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Dependent Information saved successfully!"
    ```
  - `500 Internal Server Error` –
    ```json
    "Failed to save dependent information."
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or validation error

---

## 4. Get All Dependents for a User

**GET** `/api/auth/dependent/{membershipId}`

- **Description:** Retrieve all dependents for a given user.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/dependent/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of dependent objects
    ```json
    [
      {
        "id": 1,
        "membershipId": "ENU12345",
        "name": "Jane Doe",
        "healthConditions": ["Asthma"],
        "allergies": ["Peanuts"],
        "currentMedications": ["Inhaler"]
      },
      ...
    ]
    ```
  - `500 Internal Server Error` –
    ```json
    null
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or retrieval error

---

## 5. Update Dependent Information

**PUT** `/api/auth/dependent-information/{id}`

- **Description:** Update an existing dependent's information.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Body: JSON object with updated dependent fields
    ```json
    {
      "name": "Jane Doe",
      "healthConditions": ["Asthma"],
      "allergies": ["Peanuts"],
      "currentMedications": ["Inhaler"]
    }
    ```
- **Response:**
  - `200 OK` – Updated dependent object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "name": "Jane Doe",
      ...
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Dependent not found

---

## 6. Delete Dependent Information

**DELETE** `/api/auth/dependent-information/{id}`

- **Description:** Delete a dependent by ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Example:
    ```http
    DELETE /api/auth/dependent-information/1
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` –
    ```json
    null
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Dependent not found

---

## 7. Find Health/Dependent Info by Name

**GET** `/api/auth/get/patient/data`

- **Description:** Search for health or dependent information by name.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameter: `name` (string, required)
  - Example:
    ```http
    GET /api/auth/get/patient/data?name=Jane%20Doe
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – HealthInformation or DependentInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "name": "Jane Doe",
      ...
    }
    ```
  - `404 Not Found` –
    ```json
    "No records found for name: Jane Doe"
    ```
- **Error Responses:**
  - `404 Not Found` – No matching record

---

## 8. Save Security Information

**POST** `/api/auth/security-information`

- **Description:** Save security information (e.g., password, security question/answer) for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing security information
    ```json
    {
      "membershipId": "ENU12345",
      "password": "hashedPassword",
      "securityQuestion": "What is your pet's name?",
      "securityAnswer": "Fluffy"
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Security information saved successfully!"
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or validation error

---

## 9. Get Security Information

**GET** `/api/auth/security/{membershipId}`

- **Description:** Retrieve security information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/security/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – SecurityInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "password": "hashedPassword",
      "securityQuestion": "What is your pet's name?",
      "securityAnswer": "Fluffy"
    }
    ```
- **Error Responses:**
  - `404 Not Found` – Security information not found

---

## 10. Update Security Information

**PUT** `/api/auth/security/{membershipId}`

- **Description:** Update security information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Body: JSON object with updated security fields
    ```json
    {
      "password": "newHashedPassword",
      "securityQuestion": "What is your favorite color?",
      "securityAnswer": "Blue"
    }
    ```
- **Response:**
  - `200 OK` – Updated SecurityInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "password": "newHashedPassword",
      "securityQuestion": "What is your favorite color?",
      "securityAnswer": "Blue"
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Security information not found

---

## 11. Submit Payment Information

**POST** `/api/auth/payment-information`

- **Description:** Add payment information for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing payment information
    ```json
    {
      "membershipId": "ENU12345",
      "cardType": "Visa",
      "cardNumber": "4111111111111111",
      "expirationDate": "12/26",
      "cvv": "123",
      "upiId": "user@upi"
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Payment information submitted successfully!"
    ```
  - `500 Internal Server Error` –
    ```json
    "Error submitting payment information."
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or validation error

---

## 12. Get Payment Information

**GET** `/api/auth/payment-information/{membershipId}`

- **Description:** Retrieve all payment methods for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/payment-information/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of PaymentInformation objects
    ```json
    [
      {
        "id": 1,
        "membershipId": "ENU12345",
        "cardType": "Visa",
        "cardNumber": "4111111111111111",
        "expirationDate": "12/26",
        "cvv": "123",
        "upiId": "user@upi"
      },
      ...
    ]
    ```
  - `500 Internal Server Error` –
    ```json
    null
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or retrieval error

---

## 13. Update Payment Information

**PUT** `/api/auth/payment-information/{id}`

- **Description:** Update a payment method by ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Body: JSON object with updated payment fields
    ```json
    {
      "cardType": "Mastercard",
      "cardNumber": "5555555555554444",
      "expirationDate": "11/27",
      "cvv": "456",
      "upiId": "user2@upi"
    }
    ```
- **Response:**
  - `200 OK` – Updated PaymentInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "cardType": "Mastercard",
      "cardNumber": "5555555555554444",
      "expirationDate": "11/27",
      "cvv": "456",
      "upiId": "user2@upi"
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Payment information not found

---

## 14. Delete Payment Information

**DELETE** `/api/auth/payment-information/{id}`

- **Description:** Delete a payment method by ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Example:
    ```http
    DELETE /api/auth/payment-information/1
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` –
    ```json
    null
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Payment information not found

---

## 15. Submit Health Information

**POST** `/api/auth/health-information`

- **Description:** Add health information for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing health information
    ```json
    {
      "membershipId": "ENU12345",
      "healthConditions": ["Diabetes"],
      "allergies": ["Penicillin"],
      "currentMedications": ["Metformin"],
      "notes": "Patient is under regular monitoring."
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Health information submitted successfully!"
    ```
  - `400 Bad Request` –
    ```json
    "Customer not found!"
    ```
  - `500 Internal Server Error` –
    ```json
    "Failed to submit health information."
    ```
- **Error Responses:**
  - `400 Bad Request` – Customer not found for membershipId
  - `500 Internal Server Error` – Database or validation error

---

## 16. Get Health Information

**GET** `/api/auth/healthConditions/{membershipId}`

- **Description:** Retrieve health information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/healthConditions/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – HealthInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "healthConditions": ["Diabetes"],
      "allergies": ["Penicillin"],
      "currentMedications": ["Metformin"],
      "notes": "Patient is under regular monitoring."
    }
    ```
- **Error Responses:**
  - `404 Not Found` – Health information not found

---

## 17. Update Health Information

**PUT** `/api/auth/health-information/{membershipId}`

- **Description:** Update health information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Body: JSON object with updated health fields
    ```json
    {
      "healthConditions": ["Hypertension"],
      "allergies": ["None"],
      "currentMedications": ["Amlodipine"],
      "notes": "Blood pressure under control."
    }
    ```
- **Response:**
  - `200 OK` – Updated HealthInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "healthConditions": ["Hypertension"],
      "allergies": ["None"],
      "currentMedications": ["Amlodipine"],
      "notes": "Blood pressure under control."
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Health information not found

---

## 18. Submit Delivery Address

**POST** `/api/auth/delivery-submit`

- **Description:** Add a delivery address for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing delivery address
    ```json
    {
      "membershipId": "ENU12345",
      "homeNumber": "123",
      "street": "Main St",
      "city": "Metropolis",
      "state": "NY",
      "pinCode": "10001",
      "country": "USA",
      "setAsDefault": true
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Address submitted successfully."
    ```
  - `500 Internal Server Error` –
    ```json
    "Failed to submit address."
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or validation error

---

## 19. Get Delivery Addresses

**GET** `/api/auth/delivery/{membershipId}`

- **Description:** Retrieve all delivery addresses for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/delivery/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of DeliveryAddressInformation objects
    ```json
    [
      {
        "id": 1,
        "membershipId": "ENU12345",
        "homeNumber": "123",
        "street": "Main St",
        "city": "Metropolis",
        "state": "NY",
        "pinCode": "10001",
        "country": "USA",
        "setAsDefault": true
      },
      ...
    ]
    ```
  - `500 Internal Server Error` –
    ```json
    null
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or retrieval error

---

## 20. Update Delivery Address

**PUT** `/api/auth/delivery-submit/{id}`

- **Description:** Update a delivery address by ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Body: JSON object with updated address fields
    ```json
    {
      "homeNumber": "456",
      "street": "Elm St",
      "city": "Gotham",
      "state": "NJ",
      "pinCode": "07001",
      "country": "USA",
      "setAsDefault": false
    }
    ```
- **Response:**
  - `200 OK` – Updated DeliveryAddressInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "homeNumber": "456",
      "street": "Elm St",
      "city": "Gotham",
      "state": "NJ",
      "pinCode": "07001",
      "country": "USA",
      "setAsDefault": false
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Address not found

---

## 21. Delete Delivery Address

**DELETE** `/api/auth/delivery-submit/{id}`

- **Description:** Delete a delivery address by ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Example:
    ```http
    DELETE /api/auth/delivery-submit/1
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` –
    ```json
    null
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Address not found

---

## 22. Submit Contact Information

**POST** `/api/auth/contact`

- **Description:** Add contact information for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing contact information
    ```json
    {
      "membershipId": "ENU12345",
      "emailAddress": "user@example.com",
      "mobileNumber": "1234567890",
      "preferredContactMethod": "email"
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Contact information saved successfully!"
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Database or validation error

---

## 23. Get Contact Information

**GET** `/api/auth/contact/{membershipId}`

- **Description:** Retrieve contact information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/contact/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – ContactInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "emailAddress": "user@example.com",
      "mobileNumber": "1234567890",
      "preferredContactMethod": "email"
    }
    ```
- **Error Responses:**
  - `404 Not Found` – Contact information not found

---

## 24. Update Contact Information

**PUT** `/api/auth/contact/{membershipId}`

- **Description:** Update contact information for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Body: JSON object with updated contact fields
    ```json
    {
      "emailAddress": "newuser@example.com",
      "mobileNumber": "9876543210",
      "preferredContactMethod": "phone"
    }
    ```
- **Response:**
  - `200 OK` – Updated ContactInformation object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "emailAddress": "newuser@example.com",
      "mobileNumber": "9876543210",
      "preferredContactMethod": "phone"
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Contact information not found

---

## 25. Create Primary User

**POST** `/api/auth/users`

- **Description:** Create a new primary user (initial registration step).
- **Authentication:** Not required
- **Request:**
  - Body: JSON object representing the primary user
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      ...
    }
    ```
- **Response:**
  - `200 OK` – PrimaryUser object
    ```json
    {
      "id": 1,
      "membershipId": "ENU12345",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      ...
    }
    ```
- **Error Responses:**
  - `400 Bad Request` – Validation or creation error

---

## 26. Send OTP to Email

**POST** `/api/auth/send-otp`

- **Description:** Send an OTP to the user's email for verification.
- **Authentication:** Not required
- **Request:**
  - Body: JSON object
    ```json
    {
      "email": "user@example.com"
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "OTP sent successfully to user@example.com"
    ```
  - `500 Internal Server Error` –
    ```json
    "Error sending OTP: <error message>"
    ```
- **Error Responses:**
  - `500 Internal Server Error` – Email sending failed

---

## 27. Request OTP for Account Creation

**GET** `/api/auth/account-creation`

- **Description:** Request an OTP for account creation using membershipId.
- **Authentication:** Not required
- **Request:**
  - Query parameter: `membershipid` (string, required)
  - Example:
    ```http
    GET /api/auth/account-creation?membershipid=ENU12345
    ```
- **Response:**
  - `200 OK` –
    ```json
    "OTP has been sent to your registered email."
    ```
  - `400 Bad Request` –
    ```json
    "Invalid membership ID."
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid membershipId

---

## 28. Get Customer Details

**GET** `/api/auth/customer-details`

- **Description:** Get customer details (name, email, phone) by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/customer-details?membershipId=ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – CustomerDetailsResponse object
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
    ```
  - `404 Not Found` –
    ```json
    "Customer not found with Membership ID: ENU12345"
    ```
- **Error Responses:**
  - `404 Not Found` – Customer not found

---

## 29. Verify OTP for Membership ID

**POST** `/api/auth/verify-otp`

- **Description:** Verify OTP for a given membershipId.
- **Authentication:** Not required
- **Request:**
  - Query parameters: `membershipId` (string, required), `otp` (string, required)
  - Example:
    ```http
    POST /api/auth/verify-otp?membershipId=ENU12345&otp=123456
    ```
- **Response:**
  - `200 OK` –
    ```json
    "OTP verified successfully. Proceed to complete your profile."
    ```
  - `400 Bad Request` –
    ```json
    "OTP has expired."
    ```
    or
    ```json
    "Invalid OTP."
    ```
  - `500 Internal Server Error` –
    ```json
    "Error occurred during OTP verification: <error message>"
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid or expired OTP
  - `500 Internal Server Error` – Verification error

---

## 30. Validate OTP for Email

**POST** `/api/auth/validate-otp`

- **Description:** Validate OTP for a given email.
- **Authentication:** Not required
- **Request:**
  - Body: JSON object
    ```json
    {
      "email": "user@example.com",
      "otp": "123456"
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "OTP validated successfully."
    ```
  - `400 Bad Request` –
    ```json
    "OTP has expired."
    ```
    or
    ```json
    "Invalid OTP."
    ```
  - `500 Internal Server Error` –
    ```json
    "Error validating OTP: <error message>"
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid or expired OTP
  - `500 Internal Server Error` – Validation error

---

# API Reference – AuthController Endpoints

## 1. Get User Status Across Tables

**GET** `/api/auth/user-status/{membershipId}`

- **Description:** Get the presence status of a user in various tables (contact, address, dependents, health, payment, security) by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Path parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/user-status/ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Map of table names to boolean status
    ```json
    {
      "contact": true,
      "address": true,
      "dependents": false,
      "health": true,
      "payment": false,
      "securityInformation": true
    }
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 2. User Login (Membership ID/Password)

**GET** `/api/auth/login`

- **Description:** Authenticate a user using membershipId and password.
- **Authentication:** Not required
- **Request:**
  - Query parameters:
    - `membershipId` (string, required)
    - `password` (string, required)
  - Example:
    ```http
    GET /api/auth/login?membershipId=ENU12345&password=secret
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Login successful"
    ```
  - `401 Unauthorized` –
    ```json
    "Invalid password"
    ```
    or
    ```json
    "Invalid Membership ID"
    ```
- **Error Responses:**
  - `401 Unauthorized` – Invalid credentials

---

## 3. Register a New Customer

**POST** `/api/auth/register`

- **Description:** Register a new customer (user) in the system.
- **Authentication:** Not required
- **Request:**
  - Body: JSON object representing the customer
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "password": "secret"
      // ...other fields as required
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "User registered successfully with Membership ID: ENU12345"
    ```
  - `400 Bad Request` –
    ```json
    "Error: <error message>"
    ```
- **Error Responses:**
  - `400 Bad Request` – Validation or creation error

---

---

# API Reference – UserController Endpoints

## 1. Get User by ID

**GET** `/api/customers/users/{id}`

- **Description:** Retrieve a user by their unique ID.
- **Authentication:** Required (JWT, roles: USER or AGENT)
- **Request:**
  - Path parameter: `id` (number, required)
  - Example:
    ```http
    GET /api/customers/users/1
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – User object
    ```json
    {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "roles": ["USER"],
      ...
    }
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – User not found
  - `401 Unauthorized` – Missing or invalid token
  - `403 Forbidden` – Insufficient privileges (not USER or AGENT)

---

---

# API Reference – UploadController Endpoints

## 1. Upload and Parse Prescription File

**POST** `/api/auth/upload`

- **Description:** Upload a prescription file (PDF, image, etc.) for parsing and extraction of patient and medication data.
- **Authentication:** Required (JWT)
- **Request:**
  - Content-Type: `multipart/form-data`
  - Form field: `file` (required, file upload)
  - Example (using curl):
    ```bash
    curl -X POST \
      -H "Authorization: Bearer <jwt-token>" \
      -F "file=@prescription.pdf" \
      http://localhost:8080/api/auth/upload
    ```
- **Response:**
  - `200 OK` – JSON object with extracted prescription data
    ```json
    {
      "patientName": "John Doe",
      "date": "2024-07-20",
      "condition": "Hypertension",
      "doctorName": "Dr. Smith",
      "hospitalName": "City Hospital",
      "hospitalAddress": "123 Main St, Metropolis, NY 10001",
      "age": "45",
      "medications": [
        { "name": "Amlodipine 5mg", "days": "30" },
        { "name": "Metformin 500mg", "days": "60" }
      ]
    }
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid or missing file
  - `500 Internal Server Error` – Parsing or extraction error
- **Notes:**
  - The response fields depend on the content and format of the uploaded file. Some fields may be missing if not found in the document.

---

---

# API Reference – MembershipController Endpoints

## 1. Get All Membership Plans

**GET** `/api/auth/getMemberships`

- **Description:** Retrieve all available membership plans.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/getMemberships
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of Membership objects
    ```json
    [
      {
        "id": 1,
        "planName": "Health Starter",
        "planDesc": "Comprehensive health monitoring...",
        "benefits": ["Regular check-ups", "Priority booking"],
        "discount": 20
      },
      ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

# API Reference – MembershipBenefitsController Endpoints

## 1. Get All Membership Plans with Benefits

**GET** `/api/auth/getMembershipPlans`

- **Description:** Retrieve all membership plans, each with its associated benefits.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/getMembershipPlans
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of MembershipInfoDTO objects
    ```json
    [
      {
        "membership": {
          "id": 1,
          "planName": "Health Starter",
          "planDesc": "Comprehensive health monitoring...",
          "discount": 20
        },
        "membershipBenefits": [
          "Regular check-ups",
          "Priority booking"
        ]
      },
      ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

---

# API Reference – UserOrdersController Endpoints

## 1. Place an Order

**POST** `/api/auth/placeOrder`

- **Description:** Place an order for the items in the user's cart.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameters:
    - `membershipId` (string, required)
    - `time` (integer, required; delivery hour offset)
  - Example:
    ```http
    POST /api/auth/placeOrder?membershipId=ENU12345&time=10
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – UserOrders object
    ```json
    {
      "orderId": 123,
      "membershipId": "ENU12345",
      "price": 120.5,
      "status": "Confirmed",
      "orderedDate": "2024-07-20T10:00:00Z",
      "deliveryTime": "2024-07-21T22:00:00Z",
      ...
    }
    ```
  - `400 Bad Request` –
    ```json
    null
    ```
- **Error Responses:**
  - `400 Bad Request` – Cart is empty or user not found

---

## 2. Get All Orders for a User

**GET** `/api/auth/getOrders`

- **Description:** Retrieve all orders for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameter: `membershipID` (string, required)
  - Example:
    ```http
    GET /api/auth/getOrders?membershipID=ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of UserOrders objects
    ```json
    [
      {
        "orderId": 123,
        "membershipId": "ENU12345",
        "price": 120.5,
        "status": "Confirmed",
        "orderedDate": "2024-07-20T10:00:00Z",
        "deliveryTime": "2024-07-21T22:00:00Z",
        ...
      },
      ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 3. Cancel an Order

**POST** `/api/auth/cancelOrder`

- **Description:** Cancel an order by orderId.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object
    ```json
    {
      "orderId": 123
    }
    ```
- **Response:**
  - `200 OK` –
    ```json
    "Order cancelled successfully"
    ```
  - `404 Not Found` –
    ```json
    "Order not found"
    ```
  - `400 Bad Request` –
    ```json
    "Order is already cancelled"
    ```
- **Error Responses:**
  - `404 Not Found` – Order not found
  - `400 Bad Request` – Order is already cancelled

---

---

# API Reference – PharmaStoresController Endpoints

## 1. Get All Pharmacy Stores

**GET** `/api/auth/stores/all`

- **Description:** Retrieve a list of all pharmacy stores.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/stores/all
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of PharmaStores objects
    ```json
    [
      {
        "phId": 1,
        "name": "PharmaOne",
        "address": "123 Main St",
        "contact": "1234567890",
        ...
      },
      ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 2. Get Inventory for a Store

**POST** `/api/auth/storeinventory`

- **Description:** Retrieve the inventory for a specific pharmacy store by store ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object
    ```json
    {
      "phId": 1
    }
    ```
- **Response:**
  - `200 OK` – Array of StoreInventoryResponse objects
    ```json
    [
      {
        "phId": 1,
        "mId": 101,
        "medName": "Paracetamol",
        "quantity": 100,
        "drugType": "Tablet",
        "brandName": "BrandA"
      },
      ...
    ]
    ```
  - `404 Not Found` –
    ```json
    null
    ```
- **Error Responses:**
  - `404 Not Found` – Store or inventory not found

---

---

# API Reference – PharmaMedInventoryController Endpoints

## 1. Get All Inventory (Summary)

**GET** `/api/auth/inventory`

- **Description:** Retrieve a summary list of all inventory items (pharmacy, drug, price per pill).
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/inventory
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of InventoryResponse objects
    ```json
    [
      { "phId": 1, "mId": 101, "pricePerPill": 2.5 }, ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 2. Get All Drugs

**GET** `/api/auth/all`

- **Description:** Retrieve a list of all drugs in the system.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/all
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of DrugData objects
    ```json
    [
      { "mId": 101, "medName": "Paracetamol", ... }, ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 3. Get All Inventory (Detailed)

**GET** `/api/auth/inventory/all`

- **Description:** Retrieve a detailed list of all inventory items.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/inventory/all
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of PharmaMedInventory objects
    ```json
    [
      { "id": 1, "phId": 1, "drugData": { ... }, "quantity": 100, ... }, ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

# API Reference – PamController Endpoints

## 1. Get All Drug Data

**GET** `/api/auth/pam/inventory`

- **Description:** Retrieve a list of all drug data.
- **Authentication:** Required (JWT)
- **Request:**
  - No parameters
  - Example:
    ```http
    GET /api/auth/pam/inventory
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of DrugData objects
    ```json
    [
      { "mId": 101, "medName": "Paracetamol", ... }, ...
    ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

# API Reference – PrescriptionController Endpoints

## 1. Get Prescriptions for a User

**POST** `/api/auth/getPrescriptions`

- **Description:** Retrieve all prescriptions for a user by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: membershipId as a string
    ```json
    "ENU12345"
    ```
- **Response:**
  - `200 OK` – Array of Prescription objects
    ```json
    [
      { "id": 1, "membershipId": "ENU12345", "medications": [ ... ], ... }, ...
    ]
    ```
  - `400 Bad Request` –
    ```json
    null
    ```
- **Error Responses:**
  - `400 Bad Request` – membershipId missing or invalid

---

## 2. Add a New Prescription

**POST** `/api/auth/addPrescription`

- **Description:** Add a new prescription for a user.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object representing the prescription
    ```json
    {
      "membershipId": "ENU12345",
      "patientName": "John Doe",
      "doctorName": "Dr. Smith",
      "medications": [ ... ],
      ...
    }
    ```
- **Response:**
  - `201 Created` – Prescription object
    ```json
    { "id": 1, "membershipId": "ENU12345", ... }
    ```
  - `400 Bad Request` –
    ```json
    "Invalid prescription data"
    ```
- **Error Responses:**
  - `400 Bad Request` – Invalid prescription data

---

## 3. End a Prescription

**POST** `/api/auth/endPrescription`

- **Description:** Mark a prescription as ended by prescription ID.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: prescription ID as a string
    ```json
    "1"
    ```
- **Response:**
  - `201 Created` –
    ```json
    null
    ```
  - `400 Bad Request` –
    ```json
    null
    ```
- **Error Responses:**
  - `400 Bad Request` – Prescription not found or already ended

---

# API Reference – CartItemController Endpoints

## 1. Add Item to Cart

**POST** `/api/auth/addCart`

- **Description:** Add a medication to the user's cart.
- **Authentication:** Required (JWT)
- **Request:**
  - Body: JSON object
    ```json
    {
      "membershipId": "ENU12345",
      "pharmacyId": 1,
      "medicationId": 101,
      "quantity": 2,
      "unitPrice": 10.5
    }
    ```
- **Response:**
  - `201 Created` – CartItem object
    ```json
    { "id": 1, "membershipId": "ENU12345", ... }
    ```
  - `400 Bad Request` –
    ```json
    "Error: <error message>"
    ```
- **Error Responses:**
  - `400 Bad Request` – User, pharmacy, or medication not found

---

## 2. Get User Cart

**GET** `/api/auth/getUserCart`

- **Description:** Retrieve all items in a user's cart by membershipId.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameter: `membershipId` (string, required)
  - Example:
    ```http
    GET /api/auth/getUserCart?membershipId=ENU12345
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Array of CartItem objects
    ```json
    [ { "id": 1, "membershipId": "ENU12345", ... }, ... ]
    ```
- **Error Responses:**
  - `401 Unauthorized` – Missing or invalid token

---

## 3. Update Cart Item Quantity

**POST** `/api/auth/updateCart`

- **Description:** Update the quantity of a cart item.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameters:
    - `mId` (integer, required; medication ID)
    - `pId` (integer, required; pharmacy ID)
    - `quantity` (integer, required)
  - Example:
    ```http
    POST /api/auth/updateCart?mId=101&pId=1&quantity=3
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` – Updated CartItem object
    ```json
    { "id": 1, "membershipId": "ENU12345", "quantity": 3, ... }
    ```
- **Error Responses:**
  - `400 Bad Request` – Cart item not found or invalid

---

## 4. Remove Item from Cart

**POST** `/api/auth/delCart`

- **Description:** Remove an item from the user's cart.
- **Authentication:** Required (JWT)
- **Request:**
  - Query parameters:
    - `membershipId` (string, required)
    - `medId` (integer, required; medication ID)
    - `pharmId` (integer, required; pharmacy ID)
  - Example:
    ```http
    POST /api/auth/delCart?membershipId=ENU12345&medId=101&pharmId=1
    Authorization: Bearer <jwt-token>
    ```
- **Response:**
  - `200 OK` –
    ```json
    "OK"
    ```
- **Error Responses:**
  - `400 Bad Request` – Item not found or already removed

--- 