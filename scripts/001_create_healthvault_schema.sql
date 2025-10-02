-- HealthVault Database Schema
-- This script creates all necessary tables for the healthcare platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  address TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('patient', 'doctor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctors table (additional info for doctors)
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  specialization VARCHAR(100) NOT NULL,
  license_number VARCHAR(50) UNIQUE NOT NULL,
  years_of_experience INTEGER DEFAULT 0,
  consultation_fee DECIMAL(10,2),
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  hospital_affiliation VARCHAR(255),
  available_days TEXT[], -- Array of days like ['monday', 'tuesday']
  available_hours JSONB, -- JSON object with time slots
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medical records table
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.users(id),
  record_type VARCHAR(50) NOT NULL, -- 'lab_report', 'prescription', 'diagnosis', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  date_created DATE NOT NULL,
  tags TEXT[],
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  reason TEXT,
  notes TEXT,
  consultation_fee DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table (for AI chatbot)
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_user_message BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_delete_own" ON public.users FOR DELETE USING (auth.uid() = id);

-- RLS Policies for doctors table
CREATE POLICY "doctors_select_all" ON public.doctors FOR SELECT TO authenticated USING (true);
CREATE POLICY "doctors_insert_own" ON public.doctors FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "doctors_update_own" ON public.doctors FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "doctors_delete_own" ON public.doctors FOR DELETE USING (auth.uid() = id);

-- RLS Policies for medical_records table
CREATE POLICY "medical_records_select_own" ON public.medical_records FOR SELECT USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);
CREATE POLICY "medical_records_insert_patient" ON public.medical_records FOR INSERT WITH CHECK (
  auth.uid() = patient_id
);
CREATE POLICY "medical_records_update_patient" ON public.medical_records FOR UPDATE USING (
  auth.uid() = patient_id
);
CREATE POLICY "medical_records_delete_patient" ON public.medical_records FOR DELETE USING (
  auth.uid() = patient_id
);

-- RLS Policies for appointments table
CREATE POLICY "appointments_select_involved" ON public.appointments FOR SELECT USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);
CREATE POLICY "appointments_insert_patient" ON public.appointments FOR INSERT WITH CHECK (
  auth.uid() = patient_id
);
CREATE POLICY "appointments_update_involved" ON public.appointments FOR UPDATE USING (
  auth.uid() = patient_id OR auth.uid() = doctor_id
);
CREATE POLICY "appointments_delete_patient" ON public.appointments FOR DELETE USING (
  auth.uid() = patient_id
);

-- RLS Policies for chat_messages table
CREATE POLICY "chat_messages_select_own" ON public.chat_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "chat_messages_insert_own" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chat_messages_update_own" ON public.chat_messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "chat_messages_delete_own" ON public.chat_messages FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON public.users(phone);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON public.doctors(specialization);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_doctor_id ON public.medical_records(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
