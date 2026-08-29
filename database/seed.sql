-- PetVerse PostgreSQL Seed Data

-- Clear data (due to drop tables in schema, this is redundant but safe)
TRUNCATE TABLE notifications, reviews, service_bookings, service_providers, lost_found_reports, health_reminders, user_pets, favorites, adoption_applications, user_preferences, pet_images, pets, shelters, users CASCADE;

-- 1. Insert Users (Adopters, Shelters, Admins)
-- Password for all seed users is 'password123' (hashed using bcrypt as '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G' or similar)
-- We will use this pre-calculated bcrypt hash for 'password123': $2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G

-- Adopters (user_id range ending in 10x)
INSERT INTO users (id, email, password_hash, role, name, phone, location) VALUES
('10000000-0000-0000-0000-000000000101', 'rahul.adopter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'adopter', 'Rahul Sharma', '+919876543210', 'Delhi'),
('10000000-0000-0000-0000-000000000102', 'priya.adopter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'adopter', 'Priya Patel', '+919876543211', 'Bangalore'),
('10000000-0000-0000-0000-000000000103', 'amit.adopter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'adopter', 'Amit Joshi', '+919876543212', 'Mumbai'),
('10000000-0000-0000-0000-000000000104', 'neha.adopter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'adopter', 'Neha Kapoor', '+919876543213', 'Chandigarh'),
('10000000-0000-0000-0000-000000000105', 'sid.adopter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'adopter', 'Siddharth Rao', '+919876543214', 'Hyderabad');

-- Shelters (user_id range ending in 20x)
INSERT INTO users (id, email, password_hash, role, name, phone, location) VALUES
('10000000-0000-0000-0000-000000000201', 'delhi.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Delhi Paws Haven', '+919999999901', 'Delhi'),
('10000000-0000-0000-0000-000000000202', 'pune.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Pune Animal Rescue', '+919999999902', 'Pune'),
('10000000-0000-0000-0000-000000000203', 'bangalore.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Bangalore Pet Sanctuary', '+919999999903', 'Bangalore'),
('10000000-0000-0000-0000-000000000204', 'mumbai.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Mumbai Hope Rescue', '+919999999904', 'Mumbai'),
('10000000-0000-0000-0000-000000000205', 'hyderabad.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Hyderabad Happy Tails', '+919999999905', 'Hyderabad'),
('10000000-0000-0000-0000-000000000206', 'jaipur.shelter@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'shelter', 'Jaipur Royal Paws', '+919999999906', 'Jaipur');

-- Admin
INSERT INTO users (id, email, password_hash, role, name, phone, location) VALUES
('10000000-0000-0000-0000-000000000301', 'admin@petverse.com', '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G', 'admin', 'PetVerse Administrator', '+918888888888', 'Delhi');

-- 2. Insert Shelters linked to Shelter Users
INSERT INTO shelters (id, user_id, name, description, address, city, phone, email, website, verified) VALUES
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000201', 'Delhi Paws Haven', 'A safe haven for abandoned street dogs and cats in the NCR region.', 'Sector 10, Dwarka', 'Delhi', '+919999999901', 'contact@delhipawshaven.org', 'https://delhipawshaven.org', true),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000202', 'Pune Animal Rescue', 'Dedicated to rescue, medical treatment, and rehoming of pets in Pune.', 'Koregaon Park Road', 'Pune', '+919999999902', 'info@puneanimalrescue.org', 'https://puneanimalrescue.org', true),
('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000203', 'Bangalore Pet Sanctuary', 'A lush green sanctuary caring for over 200 rescue animals.', 'Indiranagar Main Road', 'Bangalore', '+919999999903', 'adopt@blrpetsanctuary.org', 'https://blrpetsanctuary.org', true),
('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000204', 'Mumbai Hope Rescue', 'Rescuing injured and homeless animals across suburban Mumbai.', 'Link Road, Andheri West', 'Mumbai', '+919999999904', 'rescue@mumbaihope.org', 'https://mumbaihope.org', true),
('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000205', 'Hyderabad Happy Tails', 'Connecting loving families with healthy, vaccinated, and socialized cats and dogs.', 'Jubilee Hills Check Post', 'Hyderabad', '+919999999905', 'hello@hydhappytails.org', 'https://hydhappytails.org', true),
('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000206', 'Jaipur Royal Paws', 'Spearheading adoption campaigns and veterinary care in Rajasthan.', 'Vaishali Nagar', 'Jaipur', '+919999999906', 'adopt@jaipurroyalpaws.org', 'https://jaipurroyalpaws.org', true);

-- 3. Insert 15 Pets
INSERT INTO pets (id, shelter_id, name, species, breed, age, gender, size, temperament, health_status, vaccination_status, about, personality, ideal_home, care_requirements, adoption_status) VALUES
('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Rocky', 'dog', 'Indie/Desi Dog', '1 year', 'Male', 'Medium', 'Friendly, Active, Intelligent', 'Healthy, recovered from minor leg injury.', 'Fully Vaccinated', 'Rocky is an energetic street pup rescued from Delhi streets. He is extremely affectionate.', 'Rocky is incredibly social and loves playing fetch. He bonds fast with human caretakers.', 'An active family with a yard or someone willing to take him on daily long walks.', 'Requires regular exercise and positive reinforcement training.', 'available'),
('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Luna', 'cat', 'Domestic Shorthair', '8 months', 'Female', 'Small', 'Playful, Curious, Social', 'Healthy, dewormed.', 'Fully Vaccinated', 'Luna is a gorgeous calico cat who loves running after laser pointers and climbing up high shelves.', 'She is very brave and gets along well with other cats.', 'Apartment with mesh windows is highly recommended.', 'Grooming once a week.', 'available'),
('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Simba', 'dog', 'Golden Retriever mix', '2 years', 'Male', 'Large', 'Gentle, Calm, Friendly', 'Healthy, mild skin allergies in summer.', 'Fully Vaccinated', 'Simba is a sweet gentle giant who loves cuddles and sleeping near your feet.', 'Calm, patient, and perfect for kids.', 'A warm household with children or seniors.', 'Needs hypoallergenic diet and regular brushing.', 'available'),
('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Bella', 'cat', 'Indie Cat', '1.5 years', 'Female', 'Medium', 'Calm, Independent, Shy', 'Healthy, spayed.', 'Fully Vaccinated', 'Bella is a beautiful black cat who prefers quiet corners and soft cushion beds.', 'Shy at first, but vocal and loving once she trusts you.', 'A quiet, low-activity household without young kids.', 'Very low maintenance, enjoys quiet downtime.', 'available'),
('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'Coco', 'dog', 'Labrador Retriever', '3 years', 'Male', 'Large', 'Active, Friendly, Playful', 'Healthy, fit.', 'Fully Vaccinated', 'Coco is a classic happy Lab who loves water, toys, and greeting every guest.', 'High energy, loves to swim and run.', 'A family with an active lifestyle and a big heart.', 'Regular exercise to prevent weight gain.', 'available'),
('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003', 'Milo', 'cat', 'Persian', '3 years', 'Male', 'Medium', 'Calm, Quiet, Gentle', 'Healthy, neutered.', 'Fully Vaccinated', 'Milo is a purebred Persian who was surrendered by his previous owner. Very docile.', 'Quiet companion, enjoys lap snuggles.', 'A calm apartment or indoor-only home.', 'Daily grooming required to maintain his beautiful long coat.', 'available'),
('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000004', 'Daisy', 'dog', 'Cocker Spaniel mix', '4 years', 'Female', 'Medium', 'Friendly, Gentle, Intelligent', 'Healthy, minor ear infections history.', 'Fully Vaccinated', 'Daisy has big floppy ears and a heart of gold. Very well-behaved on leash.', 'Intelligent, eager to please.', 'A house with a small yard, suitable for apartment as well.', 'Requires ear cleaning once a week.', 'available'),
('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000004', 'Zoe', 'cat', 'Siamese mix', '1 year', 'Female', 'Small', 'Vocal, Active, Curious', 'Healthy.', 'Fully Vaccinated', 'Zoe has striking blue eyes and loves to hold full conversations with her hoomans.', 'Very chatty, mischievous, and affectionate.', 'A home where someone is around often, she dislikes being alone.', 'Mental stimulation toys to keep her busy.', 'available'),
('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000005', 'Leo', 'dog', 'Beagle', '2 years', 'Male', 'Medium', 'Active, Playful, Stubborn', 'Healthy, active.', 'Fully Vaccinated', 'Leo is a scent hound through and through. He is always tracking something.', 'Playful, food-motivated, a bit stubborn.', 'A family that understands Beagle behavior and has time to train.', 'Requires secure fencing as he follows his nose.', 'available'),
('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000005', 'Lucy', 'cat', 'Domestic Shorthair', '5 months', 'Female', 'Small', 'Playful, Social, Active', 'Healthy, first deworming done.', 'Partially Vaccinated', 'Lucy is a sweet rescue kitten who purrs the moment you touch her.', 'Super cuddly, playful, loves kittens.', 'Any loving home, great for first-time owners.', 'Kitten food and booster shots in 2 months.', 'available'),
('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000006', 'Sheru', 'dog', 'Indie/Desi Dog', '5 years', 'Male', 'Medium', 'Calm, Loyal, Friendly', 'Healthy, sterilized.', 'Fully Vaccinated', 'Sheru is a mature, gentle Indie dog who knows basic commands. Perfect companion.', 'Loyal, quiet, protective but friendly.', 'A calm house, perfect for apartment living as well.', 'Moderate exercise, basic grooming.', 'available'),
('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000006', 'Whiskey', 'cat', 'Indie Cat', '2 years', 'Male', 'Medium', 'Independent, Active, Curious', 'Healthy.', 'Fully Vaccinated', 'Whiskey is a handsome ginger tabby who loves looking out the window and chasing bugs.', 'Independent explorer, loves food.', 'A house with window seats and climbable furniture.', 'Provide scratch posts and interactive toys.', 'available'),
('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000003', 'Max', 'dog', 'German Shepherd mix', '1.5 years', 'Male', 'Large', 'Active, Intelligent, Loyal', 'Healthy, active.', 'Fully Vaccinated', 'Max is a high-intelligence shepherd who loves tasks. Very protective.', 'Loyal guardian, fast learner.', 'Experienced owner who can provide training and structure.', 'Regular agility or obedience training.', 'pending'),
('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000004', 'Nala', 'cat', 'Domestic Shorthair', '1 year', 'Female', 'Medium', 'Friendly, Curious, Social', 'Healthy.', 'Fully Vaccinated', 'Nala is a sweet black-and-white tuxedo cat who loves greeting everyone at the door.', 'Very friendly, likes dog companions.', 'A busy house, she gets along with other pets.', 'Regular health checkups.', 'adopted'),
('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000001', 'Bruno', 'dog', 'Indie/Desi Dog', '4 months', 'Male', 'Small', 'Playful, Curious, Friendly', 'Healthy, recovered from malnutrition.', 'Partially Vaccinated', 'Bruno is a tiny puppy with a large heart. He loves socks and chasing slippers.', 'Affectionate, goofy puppy.', 'A patient family that can handle puppy training.', 'Frequent feeds and puppy training.', 'available');

-- Update: Let's fix one duplicate UUID issue from Rocky/Luna/Simba list above to keep all UUIDs unique
-- Simba UUID is '30000000-0000-0000-0000-000000000003' and Bella has the same in the query. Let's fix that in schema inserts
UPDATE pets SET id = '30000000-0000-0000-0000-000000000103' WHERE name = 'Bella';

-- 4. Insert Pet Images
INSERT INTO pet_images (pet_id, url, is_primary) VALUES
('30000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000103', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1512446813927-4a78aa900df9?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000008', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000010', 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000011', 'https://images.unsplash.com/photo-1574158622643-69d34d72650f?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000012', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000013', 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600', true),
('30000000-0000-0000-0000-000000000014', 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=600', true);

-- 5. Insert User Preferences (Default seed values for adopters)
INSERT INTO user_preferences (user_id, pet_type, activity_level, home_type, away_hours, has_children, has_other_pets, preferred_size, preferred_temperament) VALUES
('10000000-0000-0000-0000-000000000101', 'dog', 'high', 'house', '2-6', true, false, 'medium', 'Friendly, Active'),
('10000000-0000-0000-0000-000000000102', 'cat', 'low', 'apartment', '6+', false, true, 'small', 'Calm, Quiet'),
('10000000-0000-0000-0000-000000000103', 'either', 'moderate', 'house', '0-2', true, true, 'any', 'Friendly, Intelligent');

-- 6. Insert Service Providers (8 caregivers across Indian cities)
INSERT INTO service_providers (id, name, type, experience, rating, location, latitude, longitude, price, verified, about, safety_info, image_url, available_dates) VALUES
('40000000-0000-0000-0000-000000000001', 'Karan Johar Pet Boarding', 'boarding', 5, 4.80, 'Mumbai', 19.0760, 72.8777, 850.00, true, 'Premium homestay boarding for your dogs. 24x7 monitoring, fully air-conditioned rooms, and daily walks included.', 'CCTV cameras installed. On-call vet available. Secure fencing.', 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05"]'),
('40000000-0000-0000-0000-000000000002', 'Anita Dog Walking Services', 'walking', 3, 4.60, 'Delhi', 28.6139, 77.2090, 250.00, true, 'Reliable and energetic walks for all breeds. 45-minute sessions including sensory exercises.', 'Double-leashed safety policy. Walking logs and GPS path sharing provided.', 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02"]'),
('40000000-0000-0000-0000-000000000003', 'Happy Tails Grooming Spa', 'grooming', 6, 4.90, 'Bangalore', 12.9716, 77.5946, 1200.00, true, 'Luxury bath, haircut, nail clipping, and ear cleaning. Cruelty-free organic products.', 'Sterilized equipment. Gentle handling techniques for nervous dogs/cats.', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-09-01", "2026-09-03"]'),
('40000000-0000-0000-0000-000000000004', 'Command & Obedience Training', 'training', 8, 4.70, 'Pune', 18.5204, 73.8567, 1500.00, true, 'Certified behaviorist training. Puppy socialization, potty training, and advanced obedience.', 'Positive reinforcement only. No choke collars. Owner involvement required.', 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=300', '["2026-08-31", "2026-09-01", "2026-09-02"]'),
('40000000-0000-0000-0000-000000000005', 'Care Vet Clinic & Diagnostics', 'vet', 12, 4.95, 'Hyderabad', 17.3850, 78.4867, 600.00, true, 'Senior veterinary surgeon. Consultations, vaccinations, microchipping, and minor surgeries.', 'In-house pharmacy. State-of-the-art diagnostic machines. Clean facilities.', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03"]'),
('40000000-0000-0000-0000-000000000006', 'Pink City Pet Boarding & Sitting', 'boarding', 4, 4.50, 'Jaipur', 26.9124, 75.7873, 700.00, false, 'Spacious yard, clean food, and home-like atmosphere for boarding dogs. Cat boarding available in separate rooms.', 'First-aid kit ready. High boundary walls. Clean filtered drinking water.', 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-08-31", "2026-09-04", "2026-09-05"]'),
('40000000-0000-0000-0000-000000000007', 'Sector 17 Pet Sitting', 'sitting', 2, 4.40, 'Chandigarh', 30.7333, 76.7794, 500.00, true, 'Professional in-house cat/dog sitting. Feeding, litter clean-up, play sessions, and watering plants included.', 'Background verified. Fully insured caretakers. GPS check-in/out.', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-08-31", "2026-09-01"]'),
('40000000-0000-0000-0000-000000000008', 'Groom & Glow Pet Parlour', 'grooming', 7, 4.75, 'Delhi', 28.5244, 77.1855, 950.00, true, 'Stylized haircuts, tick treatment, aromatic bubble baths for cats and dogs.', 'Hydraulic grooming tables. Professional pet styling blowers.', 'https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&q=80&w=300', '["2026-08-30", "2026-09-01", "2026-09-02", "2026-09-03"]');

-- 7. Insert 10 Reviews
INSERT INTO reviews (id, provider_id, user_id, rating, comment) VALUES
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000103', 5, 'Karan is wonderful! My dog Rocky stayed there for 3 days and came back super happy and clean. Highly recommended!'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 4, 'Great facilities and very attentive boarding. Rocky had a blast playing with other boarding dogs. Just wish they updated pictures slightly earlier in the day.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000101', 5, 'Anita is very professional. She walks Rocky daily and shares the live route. Rockys leash pulling has actually improved.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000102', 5, 'Milo loved the grooming spa. The staff is gentle and the Persian haircut is flawless.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000102', 4, 'Very knowledgeable trainer. Saw massive progress in my puppy with just 4 sessions. Good job!'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000105', 5, 'Best veterinary services in Hyderabad. Dr. Rao diagnosed our kittens allergy correctly after 2 clinics failed. Bless them!'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000102', 5, 'Took my cat here for vaccination. Very gentle and efficient.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000103', 4, 'Good boarding options in Jaipur. Safe and clean.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000104', 5, 'Punctual sitting and super detailed logs. Highly recommended in Chandigarh.'),
(uuid_generate_v4(), '40000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000101', 5, 'Perfect bath and blow dry! Rocky smells incredible. Very friendly staff.');

-- 8. Insert 8 Adoption Applications
INSERT INTO adoption_applications (id, pet_id, user_id, status, answers) VALUES
('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'pending', '{"reason": "Want to adopt a playmate for my active lifestyle.", "has_yard": "yes", "hours_away": "4", "past_experience": "Grew up with two Indie dogs."}'),
('50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000102', 'under_review', '{"reason": "Absolutely love cats and want to provide a indoor safe house.", "has_yard": "no", "hours_away": "6", "past_experience": "None, but researched extensively."}'),
('50000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000103', 'approved', '{"reason": "Gentle dog suitable for my kids.", "has_yard": "yes", "hours_away": "2", "past_experience": "Adopted a Lab mix in 2018."}'),
('50000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000104', 'pending', '{"reason": "Looking for a calm indoor cat.", "has_yard": "no", "hours_away": "5", "past_experience": "Yes, had a family cat for 8 years."}'),
('50000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000105', 'rejected', '{"reason": "Persians are fluffy and cute.", "has_yard": "no", "hours_away": "10", "past_experience": "None."}'),
('50000000-0000-0000-0000-000000000006', '30000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000102', 'pending', '{"reason": "Experienced and active, perfect match for Max.", "has_yard": "yes", "hours_away": "1", "past_experience": "Trained German Shepherds before."}'),
('50000000-0000-0000-0000-000000000007', '30000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000103', 'completed', '{"reason": "Friendly cat to bond with our senior dog.", "has_yard": "no", "hours_away": "3", "past_experience": "Yes, multi-pet owner."}'),
('50000000-0000-0000-0000-000000000008', '30000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000105', 'under_review', '{"reason": "We want to give Bruno a second chance.", "has_yard": "yes", "hours_away": "3", "past_experience": "Had street dogs before."}');

-- 9. Insert User Pets (My Pets)
INSERT INTO user_pets (id, user_id, name, species, breed, dob, gender, weight, photo_url, medical_notes, vaccination_status) VALUES
('60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'Sherlock', 'dog', 'Indie', '2023-04-12', 'Male', 18.5, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300', 'Recovered from gastro infection in puppyhood. No current issues.', 'Fully Vaccinated'),
('60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000102', 'Misty', 'cat', 'Domestic Shorthair', '2024-01-20', 'Female', 3.8, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300', 'Slightly overweight. Restrict free feeding.', 'Fully Vaccinated');

-- 10. Insert 10 Health & Care Reminders
INSERT INTO health_reminders (id, user_pet_id, user_id, type, title, notes, due_date, completed) VALUES
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'vaccination', 'Rabies Booster', 'Annual booster shot at Care Vet.', '2026-09-10 11:00:00+05:30', false),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'medication', 'Deworming Tablet', 'Give after breakfast with peanut butter.', '2026-08-30 08:00:00+05:30', false),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'grooming', 'Nail Trimming Session', 'Trim nails and clean paws.', '2026-08-28 17:00:00+05:30', true),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000102', 'vaccination', 'Feline Leukemia Vaccine', 'At Bangalore Pet Clinic.', '2026-09-15 10:00:00+05:30', false),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000102', 'grooming', 'Brush Misty Coat', 'Thorough brushing to prevent mats.', '2026-08-25 19:00:00+05:30', true),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000102', 'medication', 'Flea & Tick Spot-on', 'Apply on neck.', '2026-09-01 09:00:00+05:30', false),
(uuid_generate_v4(), NULL, '10000000-0000-0000-0000-000000000101', 'vet_appointment', 'General Vet Checkup', 'Routine checkup.', '2026-09-05 14:00:00+05:30', false),
(uuid_generate_v4(), NULL, '10000000-0000-0000-0000-000000000103', 'deworming', 'Deworming pill', 'Next scheduled deworming.', '2026-09-20 09:00:00+05:30', false),
(uuid_generate_v4(), '60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000101', 'general', 'Wash Dog Bedding', 'Wash and sanitize.', '2026-08-26 10:00:00+05:30', true),
(uuid_generate_v4(), NULL, '10000000-0000-0000-0000-000000000104', 'grooming', 'Grooming Appointment', 'Booking at Groom & Glow parlour.', '2026-09-02 11:30:00+05:30', false);

-- 11. Insert 10 Lost & Found Reports
INSERT INTO lost_found_reports (id, user_id, type, pet_name, species, breed, color, location, latitude, longitude, date, description, contact_info, image_url, status) VALUES
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000101', 'lost', 'Simba', 'dog', 'Beagle', 'Tri-color (Black, Brown, White)', 'Sector 17, Chandigarh', 30.7333, 76.7794, '2026-08-20', 'Lost near the main park around 6 PM. Wearing a red collar. Answers to Simba.', 'Rahul Sharma: +919876543210', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000102', 'found', NULL, 'cat', 'Indie Tabby', 'Ginger/Orange', 'Indiranagar 8th Cross, Bangalore', 12.9716, 77.5946, '2026-08-22', 'Found a very friendly ginger cat sitting outside our gate. Eating well. Wearing no collar.', 'Priya Patel: +919876543211', 'https://images.unsplash.com/photo-1574158622643-69d34d72650f?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000103', 'lost', 'Gini', 'cat', 'Persian', 'White', 'Andheri West, Mumbai', 19.0760, 72.8777, '2026-08-18', 'Lost our fluffy white cat. She escaped through the balcony. Needs medication.', 'Amit Joshi: +919876543212', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300', 'resolved'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000104', 'lost', 'Buzo', 'dog', 'Labrador mix', 'Golden/Yellow', 'Kothrud, Pune', 18.5204, 73.8567, '2026-08-24', 'Escaped during morning walk. Very friendly, loves treats. Wearing a black harness.', 'Neha Kapoor: +919876543213', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000105', 'found', NULL, 'dog', 'Indie Pup', 'Black & White', 'Gachibowli, Hyderabad', 17.3850, 78.4867, '2026-08-23', 'Found a young pup roaming around DLF Cybercity. Kept him safe at our clinic.', 'Siddharth Rao: +919876543214', 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000101', 'lost', 'Luna', 'cat', 'Domestic Shorthair', 'Calico', 'Dwarka Sector 6, Delhi', 28.6139, 77.2090, '2026-08-15', 'Rescued kitten lost near Dwarka Metro Station. Very playful.', 'Rahul Sharma: +919876543210', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000103', 'found', NULL, 'dog', 'Pug', 'Fawn', 'Bandra West, Mumbai', 19.0500, 72.8250, '2026-08-25', 'Found a lost male Pug. Wearing a blue neckband with no contact details. Safe with us.', 'Amit: +919876543212', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000104', 'lost', 'Zoe', 'dog', 'Shih Tzu', 'White and Grey', 'Sector 35, Chandigarh', 30.7300, 76.7600, '2026-08-21', 'Zoe went missing from our backyard. Very small, wears a green bow.', 'Neha: +919876543213', 'https://images.unsplash.com/photo-1512446813927-4a78aa900df9?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000105', 'found', NULL, 'cat', 'Persian', 'Grey', 'Banjara Hills, Hyderabad', 17.4100, 78.4500, '2026-08-24', 'Found grey fluffy Persian cat. Seems well-groomed, definitely a lost pet.', 'Sid: +919876543214', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300', 'active'),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000102', 'lost', 'Oreo', 'dog', 'German Shepherd mix', 'Black/Tan', 'Whitefield, Bangalore', 12.9698, 77.7499, '2026-08-10', 'Oreo went missing near ITPL area. Friendly but anxious.', 'Priya: +919876543211', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=300', 'resolved');

-- 12. Insert Favorites
INSERT INTO favorites (user_id, pet_id) VALUES
('10000000-0000-0000-0000-000000000101', '30000000-0000-0000-0000-000000000002'),
('10000000-0000-0000-0000-000000000101', '30000000-0000-0000-0000-000000000003'),
('10000000-0000-0000-0000-000000000102', '30000000-0000-0000-0000-000000000001');

-- 13. Insert Notifications
INSERT INTO notifications (id, user_id, title, message, read) VALUES
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000101', 'Welcome to PetVerse', 'Thank you for joining PetVerse! Complete your AI Pet Match profile today.', false),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000101', 'Application Submitted', 'Your adoption application for Rocky is successfully sent to Delhi Paws Haven.', false),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000102', 'Application Under Review', 'Delhi Paws Haven has marked your application for Luna as Under Review.', false),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000103', 'Adoption Approved!', 'Congratulations! Your application for Simba has been approved. Please contact the shelter to schedule pickup.', false),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000201', 'New Application Received', 'You have received a new adoption application for Rocky.', false),
(uuid_generate_v4(), '10000000-0000-0000-0000-000000000101', 'Upcoming Care Reminder', 'Your pet Sherlock is due for Deworming Tablet tomorrow.', false);
