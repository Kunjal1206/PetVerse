-- PetVerse PostgreSQL Schema

-- Drop tables if they exist (for easy resetting/migration)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS service_bookings CASCADE;
DROP TABLE IF EXISTS service_providers CASCADE;
DROP TABLE IF EXISTS lost_found_reports CASCADE;
DROP TABLE IF EXISTS health_reminders CASCADE;
DROP TABLE IF EXISTS user_pets CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS adoption_applications CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS pet_images CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS shelters CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('adopter', 'shelter', 'admin')),
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(100), -- City/Area name
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shelters Table
CREATE TABLE shelters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pets Table
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shelter_id UUID NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL CHECK (species IN ('dog', 'cat')),
    breed VARCHAR(100) NOT NULL,
    age VARCHAR(50) NOT NULL, -- e.g. "2 years", "4 months"
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('Male', 'Female')),
    size VARCHAR(20) NOT NULL CHECK (size IN ('Small', 'Medium', 'Large')),
    temperament VARCHAR(255) NOT NULL, -- Comma-separated tags e.g. "Playful, Friendly, Calm"
    health_status TEXT,
    vaccination_status TEXT,
    about TEXT,
    personality TEXT,
    ideal_home TEXT,
    care_requirements TEXT,
    adoption_status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (adoption_status IN ('available', 'pending', 'adopted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pet Images Table
CREATE TABLE pet_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table (for AI Match)
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    pet_type VARCHAR(20) CHECK (pet_type IN ('dog', 'cat', 'either')),
    activity_level VARCHAR(50) CHECK (activity_level IN ('high', 'moderate', 'low')),
    home_type VARCHAR(50) CHECK (home_type IN ('apartment', 'house')),
    away_hours VARCHAR(50), -- e.g. "0-2", "2-6", "6+"
    has_children BOOLEAN,
    has_other_pets BOOLEAN,
    preferred_size VARCHAR(50), -- e.g. "small", "medium", "large", "any"
    preferred_temperament VARCHAR(255), -- Comma-separated
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Adoption Applications Table
CREATE TABLE adoption_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
    answers JSONB NOT NULL, -- Questionnaire answers e.g. previous experience, home details
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Favorites Table
CREATE TABLE favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, pet_id)
);

-- User Pets Table (My Pets)
CREATE TABLE user_pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    dob DATE,
    gender VARCHAR(20),
    weight NUMERIC(5,2), -- in kg
    photo_url TEXT,
    medical_notes TEXT,
    vaccination_status TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health Reminders Table
CREATE TABLE health_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_pet_id UUID REFERENCES user_pets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('vaccination', 'medication', 'vet_appointment', 'grooming', 'deworming', 'general')),
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Lost & Found Reports Table
CREATE TABLE lost_found_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('lost', 'found')),
    pet_name VARCHAR(100), -- Nullable for found pets
    species VARCHAR(50) NOT NULL CHECK (species IN ('dog', 'cat')),
    breed VARCHAR(100),
    color VARCHAR(100),
    location VARCHAR(255) NOT NULL,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    date DATE NOT NULL,
    description TEXT,
    contact_info TEXT NOT NULL,
    image_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service Providers Table
CREATE TABLE service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('boarding', 'sitting', 'walking', 'grooming', 'training', 'vet')),
    experience INTEGER, -- in years
    rating NUMERIC(3,2) DEFAULT 0.00,
    location VARCHAR(100) NOT NULL,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    price NUMERIC(10,2) NOT NULL, -- e.g. price per day or hour
    verified BOOLEAN DEFAULT FALSE,
    about TEXT,
    safety_info TEXT,
    image_url TEXT,
    available_dates JSONB, -- JSON array of ISO dates
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service Bookings Table
CREATE TABLE service_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_type VARCHAR(50) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    total_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES service_providers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX idx_pets_species ON pets(species);
CREATE INDEX idx_pets_adoption_status ON pets(adoption_status);
CREATE INDEX idx_service_providers_type ON service_providers(type);
CREATE INDEX idx_lost_found_reports_type ON lost_found_reports(type);
CREATE INDEX idx_health_reminders_due ON health_reminders(due_date);
