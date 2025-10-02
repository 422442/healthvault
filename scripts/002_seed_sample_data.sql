-- Sample data for HealthVault platform
-- This script populates the database with sample doctors and data

-- Insert sample doctors (these will be created as auth users first)
-- Note: In production, doctors would sign up through the normal auth flow

-- Sample doctor data
INSERT INTO public.doctors (id, specialization, license_number, years_of_experience, consultation_fee, bio, rating, total_reviews, hospital_affiliation, available_days, available_hours) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Cardiology',
  'MD12345',
  15,
  150.00,
  'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and cardiac imaging.',
  4.8,
  127,
  'City General Hospital',
  ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  '{"morning": ["09:00", "10:00", "11:00"], "afternoon": ["14:00", "15:00", "16:00"]}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000002'::uuid,
  'Dermatology',
  'MD67890',
  8,
  120.00,
  'Dr. Michael Chen is a dermatologist specializing in skin cancer detection and cosmetic dermatology. He uses the latest technology for accurate diagnosis.',
  4.9,
  89,
  'Skin Care Center',
  ARRAY['monday', 'wednesday', 'friday', 'saturday'],
  '{"morning": ["08:00", "09:00", "10:00"], "afternoon": ["13:00", "14:00", "15:00"]}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000003'::uuid,
  'Pediatrics',
  'MD11111',
  12,
  100.00,
  'Dr. Emily Rodriguez is a pediatrician who loves working with children and families. She provides comprehensive care from newborns to adolescents.',
  4.7,
  156,
  'Children\'s Medical Center',
  ARRAY['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  '{"morning": ["08:30", "09:30", "10:30"], "afternoon": ["14:30", "15:30", "16:30"]}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000004'::uuid,
  'Orthopedics',
  'MD22222',
  20,
  180.00,
  'Dr. David Wilson is an orthopedic surgeon with expertise in joint replacement and sports medicine. He has helped thousands of patients regain mobility.',
  4.6,
  203,
  'Orthopedic Institute',
  ARRAY['monday', 'tuesday', 'thursday', 'friday'],
  '{"morning": ["07:00", "08:00", "09:00"], "afternoon": ["13:00", "14:00", "15:00"]}'::jsonb
),
(
  '00000000-0000-0000-0000-000000000005'::uuid,
  'General Medicine',
  'MD33333',
  10,
  80.00,
  'Dr. Lisa Thompson is a family medicine physician providing comprehensive primary care for patients of all ages. She focuses on preventive care and wellness.',
  4.5,
  98,
  'Family Health Clinic',
  ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  '{"morning": ["09:00", "10:00", "11:00"], "afternoon": ["14:00", "15:00", "16:00", "17:00"]}'::jsonb
);

-- Note: The corresponding user records for these doctors would need to be created
-- through the auth system first, then linked to these doctor records
