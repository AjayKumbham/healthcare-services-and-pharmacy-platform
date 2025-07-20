# Complete API Endpoint Reference

This document lists **every single API endpoint** exposed by the backend, grouped by controller/module. Each entry includes the HTTP method, full path, a short description, parameters, and authentication/authorization notes.

---

## PrimaryUserController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /getCoveragePlan | Get user's coverage plan by membershipId | `membershipId` (query) | Yes |
| GET    | /validateMembershipId/{membershipId} | Validate if a membershipId exists | `membershipId` (path) | No |
| POST   | /dependent-information | Add dependent information | JSON body | Yes |
| GET    | /dependent/{membershipId} | Get all dependents for a user | `membershipId` (path) | Yes |
| PUT    | /dependent-information/{id} | Update dependent information | `id` (path), JSON body | Yes |
| DELETE | /dependent-information/{id} | Delete dependent information | `id` (path) | Yes |
| GET    | /get/patient/data | Find health/dependent info by name | `name` (query) | Yes |
| POST   | /security-information | Save security information | JSON body | Yes |
| GET    | /security/{membershipId} | Get security info for a user | `membershipId` (path) | Yes |
| PUT    | /security/{membershipId} | Update security info | `membershipId` (path), JSON body | Yes |
| POST   | /payment-information | Add payment information | JSON body | Yes |
| GET    | /payment-information/{membershipId} | Get payment info for a user | `membershipId` (path) | Yes |
| PUT    | /payment-information/{id} | Update payment info | `id` (path), JSON body | Yes |
| DELETE | /payment-information/{id} | Delete payment info | `id` (path) | Yes |
| POST   | /health-information | Add health information | JSON body | Yes |
| GET    | /healthConditions/{membershipId} | Get health info for a user | `membershipId` (path) | Yes |
| PUT    | /health-information/{membershipId} | Update health info | `membershipId` (path), JSON body | Yes |
| POST   | /delivery-submit | Add delivery address | JSON body | Yes |
| GET    | /delivery/{membershipId} | Get delivery addresses for a user | `membershipId` (path) | Yes |
| PUT    | /delivery-submit/{id} | Update delivery address | `id` (path), JSON body | Yes |
| DELETE | /delivery-submit/{id} | Delete delivery address | `id` (path) | Yes |
| POST   | /contact | Add contact information | JSON body | Yes |
| GET    | /contact/{membershipId} | Get contact info for a user | `membershipId` (path) | Yes |
| PUT    | /contact/{membershipId} | Update contact info | `membershipId` (path), JSON body | Yes |
| POST   | /users | Create a new primary user | JSON body | No |
| POST   | /send-otp | Send OTP to email | JSON body | No |
| GET    | /account-creation | Request OTP for account creation | `membershipid` (query) | No |
| GET    | /customer-details | Get customer details by membershipId | `membershipId` (query) | Yes |
| POST   | /verify-otp | Verify OTP for membershipId | `membershipId`, `otp` (query) | No |
| POST   | /validate-otp | Validate OTP for email | JSON body | No |

---

## AuthController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /user-status/{membershipId} | Get user status across tables | `membershipId` (path) | Yes |
| GET    | /login | User login (membershipId/password) | `membershipId`, `password` (query) | No |
| POST   | /register | Register a new customer | JSON body | No |

---

## UserController (`/api/customers/users`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /{id} | Get user by ID | `id` (path) | Yes (USER, AGENT) |

---

## UploadController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| POST   | /upload | Upload and parse prescription file | `file` (multipart/form-data) | Yes |

---

## MembershipController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /getMemberships | Get all membership plans | None | Yes |

---

## MembershipBenefitsController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /getMembershipPlans | Get all membership plans with benefits | None | Yes |

---

## UserOrdersController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| POST   | /placeOrder | Place an order | `membershipId`, `time` (query) | Yes |
| GET    | /getOrders | Get all orders for a user | `membershipID` (query) | Yes |
| POST   | /cancelOrder | Cancel an order | JSON body (orderId) | Yes |

---

## PharmaStoresController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /stores/all | Get all pharmacy stores | None | Yes |
| POST   | /storeinventory | Get inventory for a store | JSON body (phId) | Yes |

---

## PharmaMedInventoryController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /inventory | Get all inventory (summary) | None | Yes |
| GET    | /all | Get all drugs | None | Yes |
| GET    | /inventory/all | Get all inventory (detailed) | None | Yes |

---

## PamController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| GET    | /pam/inventory | Get all drug data | None | Yes |

---

## PrescriptionController (`/api/auth`)

| Method | Path | Description | Parameters | Auth |
|--------|------|-------------|------------|------|
| POST   | /getPrescriptions | Get prescriptions for a user | JSON body (membershipId) | Yes |
| POST   | /addPrescription | Add a new prescription | JSON body | Yes |
| POST   | /endPrescription | End a prescription | JSON body (prescriptionId) | Yes |

---

# Notes
- **Auth:** "Yes" means JWT or session authentication is required. "No" means public endpoint.
- All endpoints may have additional validation, error codes, and business logic as described in the main API documentation.
- For request/response examples and detailed error handling, see the main API documentation. 