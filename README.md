# PetVerse — AI-Assisted Pet Adoption & Pet Care Platform

PetVerse is an integrated full-stack web application designed for pet parents, adopters, rescue shelters, and administrators across India. It unites intelligent pet adoption, transparent AI lifestyle matching, service discovery (boarding, grooming, walking, training, vet clinics), geolocation mapping, lost & found alerts, and proactive pet health management.

---

## 🌟 Key Features

1. **Intelligent Pet Adoption Discovery (`/adopt`, `/pet/:id`)**:
   - Filter by species, breed, age, size, gender, temperament, and location.
   - Comprehensive pet profile cards with health records, temperament badges, and shelter credentials.
   - Interactive adoption application modal with review workflows.

2. **AI Pet Match Quiz (`/ai-match`)**:
   - Multi-step questionnaire factoring in living space, daily activity, away hours, pet experience, children, and other pets.
   - Transparent weighted compatibility scoring (e.g. 96% match) with human-readable checkmark justifications.

3. **Pet Boarding & Service Discovery (`/services`, `/services/boarding`, `/services/category/:category`)**:
   - Benchmarked information architecture with cage-free homestay boarding, daily walking, grooming spas, training, and veterinary care.
   - Caregiver profile with verification badges, safety standards, transparent reviews, availability slots, and booking request modal.

4. **Interactive Geolocation Map (`/nearby`)**:
   - Powered by Leaflet and OpenStreetMap with custom pins across major Indian cities (Delhi, Bangalore, Mumbai, Pune, Chandigarh, Hyderabad, Jaipur).
   - Side-by-side search and detail cards for nearby emergency clinics, rescue shelters, dog parks, and groomers.

5. **Community Lost & Found Alerts (`/lost-found`)**:
   - Report lost or found pets with photos, city coordinates, collar notes, and direct contact dialogs.

6. **Adopter Dashboard (`/dashboard`)**:
   - **My Pets**: Register pets, log weights, vaccination status, and medical histories.
   - **Care & Reminders**: Scheduled reminders for Rabies vaccines, deworming pills, vet appointments, and grooming.
   - **Applications**: Real-time multi-step progress stepper (Pending → Under Review → Approved → Completed).
   - **Saved Pets**: Quick bookmarking and comparison.

7. **Floating AI Pet Assistant (24/7)**:
   - Interactive chatbot accessible throughout the platform for pet feeding tips, training guidelines, and wellness advice with veterinary disclaimer.

8. **Shelter Portal (`/shelter/dashboard`)**:
   - Manage adoptable listings, toggle status (`available`, `pending`, `adopted`), review adoption questionnaires, and approve placements.

9. **Admin Management Portal (`/admin/dashboard`)**:
   - User directory, shelter verification manager, platform-wide pet listing moderation, lost & found moderation, and regional analytics.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Tailwind CSS, React Router v7, Framer Motion, Lucide React, Leaflet & React-Leaflet, Axios, Vite.
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs, REST APIs.
- **Database**: PostgreSQL with automatic fallback to high-fidelity In-Memory Data Store (runs reliably without external database setup).
- **AI Integration**: Modular Gemini API integration structure with built-in rule-based companion fallback.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Quick Start (Run Both Client & Server)

```bash
# In server directory:
cd server
npm install
npm run dev    # Server runs on http://localhost:5000

# In client directory:
cd ../client
npm install
npm run dev    # Client runs on http://localhost:5173
```

---

## 🔑 Demo Login Credentials (1-Click Login available on `/login`)

| Role | Email | Password |
|---|---|---|
| **Adopter** | `rahul.adopter@petverse.com` | `password123` |
| **Shelter** | `delhi.shelter@petverse.com` | `password123` |
| **Admin** | `admin@petverse.com` | `password123` |

---

## 📁 Project Structure

```
petverse/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── components/
│       │   ├── common/       # Button, Card, Modal, Input, Select, Badge, Skeleton, Tabs, Rating, Alert
│       │   ├── navbar/       # Navbar, MobileMenu, NotificationDropdown
│       │   ├── footer/       # Footer
│       │   ├── pet/          # PetCard, PetFilter, CompatibilityBadge
│       │   ├── adoption/     # AdoptionFormModal, ApplicationTimeline, StatusBadge
│       │   ├── care/         # ReminderCard, ReminderFormModal, PetProfileCard, AddPetModal
│       │   ├── services/     # ServiceCard, ProviderCard, BookingModal, ReviewCard, ReviewFormModal
│       │   └── ai/           # AiAssistantWidget, QuizStepIndicator
│       ├── context/          # AuthContext, NotificationContext
│       ├── layouts/          # PublicLayout, DashboardLayout, ShelterLayout, AdminLayout
│       ├── pages/            # Public, Auth, Adopter, Shelter, and Admin pages
│       ├── services/         # Axios API clients
│       ├── routes/           # AppRoutes with role protection
│       └── App.jsx
├── server/
│   ├── config/               # db.js with PostgreSQL & memory fallback
│   ├── controllers/          # auth, pet, adoption, shelter, care, lostFound, service, notification, ai
│   ├── middleware/           # authMiddleware, roleMiddleware, errorMiddleware
│   ├── routes/               # REST API endpoints
│   ├── seed/                 # mockData.js with seed datasets
│   └── server.js
└── database/
    ├── schema.sql            # PostgreSQL schema definition
    └── seed.sql              # SQL seed records
```
