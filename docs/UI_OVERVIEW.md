# UI Overview – Healthcare Services & Pharmacy Platform

---

## Table of Contents
1. Main Navigation Structure
2. User Role Flows
    - 2.1 Regular User
    - 2.2 Pharmacy User
    - 2.3 Admin User
3. Key UI Components & Pages
4. Special UI/UX Features
5. User Experience Principles

---

## 1. Main Navigation Structure
- **Header:** Persistent navigation bar with links to Home, Prescriptions, Cart, Profile, and Upload.
- **Sidebar:** Contextual navigation for Pharmacy and Admin dashboards.
- **Footer:** Common footer with support and legal links.
- **Protected Routes:** Pages requiring authentication are protected and redirect unauthenticated users to login.
- **Responsive Design:** UI adapts to desktop and mobile devices.

---

## 2. User Role Flows

### 2.1 Regular User
**Main Pages:**
- **Landing Page:** Welcome, platform overview, benefits, support, FAQ, and subscription.
- **Authentication:** Login, Signup (with OTP), Forgot Password.
- **Home:** Search and browse drugs, add to cart, view current plan, and see order history.
- **Profile:** Manage contact info, payment methods, addresses, health info, and dependents.
- **Cart:** Add, update, or remove medications; proceed to checkout.
- **Checkout:** Select payment method, confirm order, receive confirmation.
- **Prescription:** Upload and view prescriptions, see parsed data.
- **Health Dashboard:** Manage health conditions, allergies, medications, and notes.
- **Membership:** View and subscribe to plans, see benefits and discounts.
- **Support/FAQ:** Access help resources, FAQs, and chatbot.
- **Order History:** View past orders and details.

**User Journeys:**
- **Registration:** Multi-step signup with OTP and membership ID validation.
- **Placing an Order:** Search → Add to Cart → Checkout → Confirmation.
- **Managing Profile:** Update personal, health, and payment info in modular sections.
- **Prescription Upload:** Upload file → View parsed data → Save prescription.

---

### 2.2 Pharmacy User
**Main Pages:**
- **Store Dashboard:** Sidebar navigation for Store, Orders, Inventory, and Profile.
- **Inventory:** Add, update, or remove drugs; view stock levels.
- **Orders:** View and manage incoming orders from users.
- **Profile:** Manage store details and contact info.

**User Journeys:**
- **Inventory Management:** Add new drugs, update quantities, remove items.
- **Order Fulfillment:** View new orders, update status, manage delivery.
- **Profile Updates:** Edit store info and contact details.

---

### 2.3 Admin User
**Main Pages:**
- **Admin Dashboard:** Tabbed interface for Consumers, Stores, and Inventory management.
- **Consumers:** View and manage user accounts, reset passwords, update info.
- **Stores:** View and manage pharmacy stores, approve or deactivate stores.
- **Inventory:** Oversee all inventory items across stores, audit stock.

**User Journeys:**
- **User Management:** Search, view, and edit user details.
- **Store Oversight:** Approve new stores, manage existing ones.
- **Inventory Auditing:** Review and update inventory records.

---

## 3. Key UI Components & Pages
- **Header & Footer:** Consistent branding and navigation.
- **Sidebar:** Contextual for dashboards (pharmacy/admin).
- **Forms:** For login, signup, profile, prescription upload, etc.
- **Tables & Lists:** For inventory, orders, users, and dependents.
- **Cards:** For health conditions, medications, membership plans.
- **Modals & Popups:** For confirmations, alerts, and quick actions.
- **Chatbot Widget:** Floating assistant for instant help.
- **Notifications:** Toasts and banners for feedback and errors.

---

## 4. Special UI/UX Features
- **Protected Routes:** Only authenticated users can access sensitive pages; unauthorized access redirects to login.
- **Role-Based UI:** Navigation and available actions adapt based on user role (User, Pharmacy, Admin).
- **Responsive Design:** Mobile-friendly layouts and touch support.
- **Real-Time Feedback:** Loading indicators, success/error notifications, and progress bars.
- **Accessibility:** Keyboard navigation, ARIA labels, and color contrast for inclusivity.
- **Multi-Step Flows:** Stepper components for onboarding and checkout.
- **Contextual Help:** Tooltips, FAQs, and chatbot integration.

---

## 5. User Experience Principles
- **Clarity:** Simple, intuitive navigation and clear calls to action.
- **Consistency:** Uniform design language and component usage.
- **Feedback:** Immediate feedback for user actions (success, error, loading).
- **Security:** Visual cues for protected actions and sensitive data.
- **Efficiency:** Minimized steps for common tasks (ordering, updating profile).
- **Support:** Easy access to help, support, and self-service resources.

--- 