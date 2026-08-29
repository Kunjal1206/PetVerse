// Initial In-Memory Seed Data for Fallback Engine

const bcrypt = require('bcryptjs');

// Prehashed 'password123'
const PASSWORD_HASH = '$2a$10$wN9aC0KqM1F4/7tD9802jOnK/7xZJsz1L82E8T5hD.5Qn3Z3p3t2G';

// Users
let users = [
  { id: '10000000-0000-0000-0000-000000000101', email: 'rahul.adopter@petverse.com', password_hash: PASSWORD_HASH, role: 'adopter', name: 'Rahul Sharma', phone: '+919876543210', location: 'Delhi', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000102', email: 'priya.adopter@petverse.com', password_hash: PASSWORD_HASH, role: 'adopter', name: 'Priya Patel', phone: '+919876543211', location: 'Bangalore', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000103', email: 'amit.adopter@petverse.com', password_hash: PASSWORD_HASH, role: 'adopter', name: 'Amit Joshi', phone: '+919876543212', location: 'Mumbai', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000104', email: 'neha.adopter@petverse.com', password_hash: PASSWORD_HASH, role: 'adopter', name: 'Neha Kapoor', phone: '+919876543213', location: 'Chandigarh', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000105', email: 'sid.adopter@petverse.com', password_hash: PASSWORD_HASH, role: 'adopter', name: 'Siddharth Rao', phone: '+919876543214', location: 'Hyderabad', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000201', email: 'delhi.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Delhi Paws Haven', phone: '+919999999901', location: 'Delhi', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000202', email: 'pune.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Pune Animal Rescue', phone: '+919999999902', location: 'Pune', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000203', email: 'bangalore.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Bangalore Pet Sanctuary', phone: '+919999999903', location: 'Bangalore', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000204', email: 'mumbai.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Mumbai Hope Rescue', phone: '+919999999904', location: 'Mumbai', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000205', email: 'hyderabad.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Hyderabad Happy Tails', phone: '+919999999905', location: 'Hyderabad', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000206', email: 'jaipur.shelter@petverse.com', password_hash: PASSWORD_HASH, role: 'shelter', name: 'Jaipur Royal Paws', phone: '+919999999906', location: 'Jaipur', created_at: new Date().toISOString() },
  { id: '10000000-0000-0000-0000-000000000301', email: 'admin@petverse.com', password_hash: PASSWORD_HASH, role: 'admin', name: 'PetVerse Administrator', phone: '+918888888888', location: 'Delhi', created_at: new Date().toISOString() }
];

// Shelters
let shelters = [
  { id: '20000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000201', name: 'Delhi Paws Haven', description: 'A safe haven for abandoned street dogs and cats in the NCR region.', address: 'Sector 10, Dwarka', city: 'Delhi', phone: '+919999999901', email: 'contact@delhipawshaven.org', website: 'https://delhipawshaven.org', verified: true, created_at: new Date().toISOString() },
  { id: '20000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000202', name: 'Pune Animal Rescue', description: 'Dedicated to rescue, medical treatment, and rehoming of pets in Pune.', address: 'Koregaon Park Road', city: 'Pune', phone: '+919999999902', email: 'info@puneanimalrescue.org', website: 'https://puneanimalrescue.org', verified: true, created_at: new Date().toISOString() },
  { id: '20000000-0000-0000-0000-000000000003', user_id: '10000000-0000-0000-0000-000000000203', name: 'Bangalore Pet Sanctuary', description: 'A lush green sanctuary caring for over 200 rescue animals.', address: 'Indiranagar Main Road', city: 'Bangalore', phone: '+919999999903', email: 'adopt@blrpetsanctuary.org', website: 'https://blrpetsanctuary.org', verified: true, created_at: new Date().toISOString() },
  { id: '20000000-0000-0000-0000-000000000004', user_id: '10000000-0000-0000-0000-000000000204', name: 'Mumbai Hope Rescue', description: 'Rescuing injured and homeless animals across suburban Mumbai.', address: 'Link Road, Andheri West', city: 'Mumbai', phone: '+919999999904', email: 'rescue@mumbaihope.org', website: 'https://mumbaihope.org', verified: true, created_at: new Date().toISOString() },
  { id: '20000000-0000-0000-0000-000000000005', user_id: '10000000-0000-0000-0000-000000000205', name: 'Hyderabad Happy Tails', description: 'Connecting loving families with healthy, vaccinated, and socialized cats and dogs.', address: 'Jubilee Hills Check Post', city: 'Hyderabad', phone: '+919999999905', email: 'hello@hydhappytails.org', website: 'https://hydhappytails.org', verified: true, created_at: new Date().toISOString() },
  { id: '20000000-0000-0000-0000-000000000006', user_id: '10000000-0000-0000-0000-000000000206', name: 'Jaipur Royal Paws', description: 'Spearheading adoption campaigns and veterinary care in Rajasthan.', address: 'Vaishali Nagar', city: 'Jaipur', phone: '+919999999906', email: 'adopt@jaipurroyalpaws.org', website: 'https://jaipurroyalpaws.org', verified: true, created_at: new Date().toISOString() }
];

// Pets
let pets = [
  {
    id: '30000000-0000-0000-0000-000000000001',
    shelter_id: '20000000-0000-0000-0000-000000000001',
    name: 'Rocky',
    species: 'dog',
    breed: 'Indie/Desi Dog',
    age: '1 year',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Friendly, Active, Intelligent',
    health_status: 'Healthy, recovered from minor leg injury.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Rocky is an energetic street pup rescued from Delhi streets. He is extremely affectionate.',
    personality: 'Rocky is incredibly social and loves playing fetch. He bonds fast with human caretakers.',
    ideal_home: 'An active family with a yard or someone willing to take him on daily long walks.',
    care_requirements: 'Requires regular exercise and positive reinforcement training.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000002',
    shelter_id: '20000000-0000-0000-0000-000000000001',
    name: 'Luna',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: '8 months',
    gender: 'Female',
    size: 'Small',
    temperament: 'Playful, Curious, Social',
    health_status: 'Healthy, dewormed.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Luna is a gorgeous calico cat who loves running after laser pointers and climbing up high shelves.',
    personality: 'She is very brave and gets along well with other cats.',
    ideal_home: 'Apartment with mesh windows is highly recommended.',
    care_requirements: 'Grooming once a week.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000003',
    shelter_id: '20000000-0000-0000-0000-000000000002',
    name: 'Simba',
    species: 'dog',
    breed: 'Golden Retriever mix',
    age: '2 years',
    gender: 'Male',
    size: 'Large',
    temperament: 'Gentle, Calm, Friendly',
    health_status: 'Healthy, mild skin allergies in summer.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Simba is a sweet gentle giant who loves cuddles and sleeping near your feet.',
    personality: 'Calm, patient, and perfect for kids.',
    ideal_home: 'A warm household with children or seniors.',
    care_requirements: 'Needs hypoallergenic diet and regular brushing.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000103',
    shelter_id: '20000000-0000-0000-0000-000000000002',
    name: 'Bella',
    species: 'cat',
    breed: 'Indie Cat',
    age: '1.5 years',
    gender: 'Female',
    size: 'Medium',
    temperament: 'Calm, Independent, Shy',
    health_status: 'Healthy, spayed.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Bella is a beautiful black cat who prefers quiet corners and soft cushion beds.',
    personality: 'Shy at first, but vocal and loving once she trusts you.',
    ideal_home: 'A quiet, low-activity household without young kids.',
    care_requirements: 'Very low maintenance, enjoys quiet downtime.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000004',
    shelter_id: '20000000-0000-0000-0000-000000000003',
    name: 'Coco',
    species: 'dog',
    breed: 'Labrador Retriever',
    age: '3 years',
    gender: 'Male',
    size: 'Large',
    temperament: 'Active, Friendly, Playful',
    health_status: 'Healthy, fit.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Coco is a classic happy Lab who loves water, toys, and greeting every guest.',
    personality: 'High energy, loves to swim and run.',
    ideal_home: 'A family with an active lifestyle and a big heart.',
    care_requirements: 'Regular exercise to prevent weight gain.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000005',
    shelter_id: '20000000-0000-0000-0000-000000000003',
    name: 'Milo',
    species: 'cat',
    breed: 'Persian',
    age: '3 years',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Calm, Quiet, Gentle',
    health_status: 'Healthy, neutered.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Milo is a purebred Persian who was surrendered by his previous owner. Very docile.',
    personality: 'Quiet companion, enjoys lap snuggles.',
    ideal_home: 'A calm apartment or indoor-only home.',
    care_requirements: 'Daily grooming required to maintain his beautiful long coat.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000006',
    shelter_id: '20000000-0000-0000-0000-000000000004',
    name: 'Daisy',
    species: 'dog',
    breed: 'Cocker Spaniel mix',
    age: '4 years',
    gender: 'Female',
    size: 'Medium',
    temperament: 'Friendly, Gentle, Intelligent',
    health_status: 'Healthy, minor ear infections history.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Daisy has big floppy ears and a heart of gold. Very well-behaved on leash.',
    personality: 'Intelligent, eager to please.',
    ideal_home: 'A house with a small yard, suitable for apartment as well.',
    care_requirements: 'Requires ear cleaning once a week.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1512446813927-4a78aa900df9?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000007',
    shelter_id: '20000000-0000-0000-0000-000000000004',
    name: 'Zoe',
    species: 'cat',
    breed: 'Siamese mix',
    age: '1 year',
    gender: 'Female',
    size: 'Small',
    temperament: 'Vocal, Active, Curious',
    health_status: 'Healthy.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Zoe has striking blue eyes and loves to hold full conversations with her hoomans.',
    personality: 'Very chatty, mischievous, and affectionate.',
    ideal_home: 'A home where someone is around often, she dislikes being alone.',
    care_requirements: 'Mental stimulation toys to keep her busy.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1513360309081-36f5e878fc9e?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000008',
    shelter_id: '20000000-0000-0000-0000-000000000005',
    name: 'Leo',
    species: 'dog',
    breed: 'Beagle',
    age: '2 years',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Active, Playful, Stubborn',
    health_status: 'Healthy, active.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Leo is a scent hound through and through. He is always tracking something.',
    personality: 'Playful, food-motivated, a bit stubborn.',
    ideal_home: 'A family that understands Beagle behavior and has time to train.',
    care_requirements: 'Requires secure fencing as he follows his nose.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000009',
    shelter_id: '20000000-0000-0000-0000-000000000005',
    name: 'Lucy',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: '5 months',
    gender: 'Female',
    size: 'Small',
    temperament: 'Playful, Social, Active',
    health_status: 'Healthy, first deworming done.',
    vaccination_status: 'Partially Vaccinated',
    about: 'Lucy is a sweet rescue kitten who purrs the moment you touch her.',
    personality: 'Super cuddly, playful, loves kittens.',
    ideal_home: 'Any loving home, great for first-time owners.',
    care_requirements: 'Kitten food and booster shots in 2 months.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000010',
    shelter_id: '20000000-0000-0000-0000-000000000006',
    name: 'Sheru',
    species: 'dog',
    breed: 'Indie/Desi Dog',
    age: '5 years',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Calm, Loyal, Friendly',
    health_status: 'Healthy, sterilized.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Sheru is a mature, gentle Indie dog who knows basic commands. Perfect companion.',
    personality: 'Loyal, quiet, protective but friendly.',
    ideal_home: 'A calm house, perfect for apartment living as well.',
    care_requirements: 'Moderate exercise, basic grooming.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000011',
    shelter_id: '20000000-0000-0000-0000-000000000006',
    name: 'Whiskey',
    species: 'cat',
    breed: 'Indie Cat',
    age: '2 years',
    gender: 'Male',
    size: 'Medium',
    temperament: 'Independent, Active, Curious',
    health_status: 'Healthy.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Whiskey is a handsome ginger tabby who loves looking out the window and chasing bugs.',
    personality: 'Independent explorer, loves food.',
    ideal_home: 'A house with window seats and climbable furniture.',
    care_requirements: 'Provide scratch posts and interactive toys.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1574158622643-69d34d72650f?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000012',
    shelter_id: '20000000-0000-0000-0000-000000000003',
    name: 'Max',
    species: 'dog',
    breed: 'German Shepherd mix',
    age: '1.5 years',
    gender: 'Male',
    size: 'Large',
    temperament: 'Active, Intelligent, Loyal',
    health_status: 'Healthy, active.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Max is a high-intelligence shepherd who loves tasks. Very protective.',
    personality: 'Loyal guardian, fast learner.',
    ideal_home: 'Experienced owner who can provide training and structure.',
    care_requirements: 'Regular agility or obedience training.',
    adoption_status: 'pending',
    image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000013',
    shelter_id: '20000000-0000-0000-0000-000000000004',
    name: 'Nala',
    species: 'cat',
    breed: 'Domestic Shorthair',
    age: '1 year',
    gender: 'Female',
    size: 'Medium',
    temperament: 'Friendly, Curious, Social',
    health_status: 'Healthy.',
    vaccination_status: 'Fully Vaccinated',
    about: 'Nala is a sweet black-and-white tuxedo cat who loves greeting everyone at the door.',
    personality: 'Very friendly, likes dog companions.',
    ideal_home: 'A busy house, she gets along with other pets.',
    care_requirements: 'Regular health checkups.',
    adoption_status: 'adopted',
    image_url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  },
  {
    id: '30000000-0000-0000-0000-000000000014',
    shelter_id: '20000000-0000-0000-0000-000000000001',
    name: 'Bruno',
    species: 'dog',
    breed: 'Indie/Desi Dog',
    age: '4 months',
    gender: 'Male',
    size: 'Small',
    temperament: 'Playful, Curious, Friendly',
    health_status: 'Healthy, recovered from malnutrition.',
    vaccination_status: 'Partially Vaccinated',
    about: 'Bruno is a tiny puppy with a large heart. He loves socks and chasing slippers.',
    personality: 'Affectionate, goofy puppy.',
    ideal_home: 'A patient family that can handle puppy training.',
    care_requirements: 'Frequent feeds and puppy training.',
    adoption_status: 'available',
    image_url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=600',
    created_at: new Date().toISOString()
  }
];

// User Preferences
let userPreferences = [
  { user_id: '10000000-0000-0000-0000-000000000101', pet_type: 'dog', activity_level: 'high', home_type: 'house', away_hours: '2-6', has_children: true, has_other_pets: false, preferred_size: 'medium', preferred_temperament: 'Friendly, Active' },
  { user_id: '10000000-0000-0000-0000-000000000102', pet_type: 'cat', activity_level: 'low', home_type: 'apartment', away_hours: '6+', has_children: false, has_other_pets: true, preferred_size: 'small', preferred_temperament: 'Calm, Quiet' },
  { user_id: '10000000-0000-0000-0000-000000000103', pet_type: 'either', activity_level: 'moderate', home_type: 'house', away_hours: '0-2', has_children: true, has_other_pets: true, preferred_size: 'any', preferred_temperament: 'Friendly, Intelligent' }
];

// Service Providers (8 entries)
let serviceProviders = [
  { id: '40000000-0000-0000-0000-000000000001', name: 'Karan Johar Pet Boarding', type: 'boarding', experience: 5, rating: 4.80, location: 'Mumbai', latitude: 19.0760, longitude: 72.8777, price: 850.00, verified: true, about: 'Premium homestay boarding for your dogs. 24x7 monitoring, fully air-conditioned rooms, and daily walks included.', safety_info: 'CCTV cameras installed. On-call vet available. Secure fencing.', image_url: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05'] },
  { id: '40000000-0000-0000-0000-000000000002', name: 'Anita Dog Walking Services', type: 'walking', experience: 3, rating: 4.60, location: 'Delhi', latitude: 28.6139, longitude: 77.2090, price: 250.00, verified: true, about: 'Reliable and energetic walks for all breeds. 45-minute sessions including sensory exercises.', safety_info: 'Double-leashed safety policy. Walking logs and GPS path sharing provided.', image_url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02'] },
  { id: '40000000-0000-0000-0000-000000000003', name: 'Happy Tails Grooming Spa', type: 'grooming', experience: 6, rating: 4.90, location: 'Bangalore', latitude: 12.9716, longitude: 77.5946, price: 1200.00, verified: true, about: 'Luxury bath, haircut, nail clipping, and ear cleaning. Cruelty-free organic products.', safety_info: 'Sterilized equipment. Gentle handling techniques for nervous dogs/cats.', image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-09-01', '2026-09-03'] },
  { id: '40000000-0000-0000-0000-000000000004', name: 'Command & Obedience Training', type: 'training', experience: 8, rating: 4.70, location: 'Pune', latitude: 18.5204, longitude: 73.8567, price: 1500.00, verified: true, about: 'Certified behaviorist training. Puppy socialization, potty training, and advanced obedience.', safety_info: 'Positive reinforcement only. No choke collars. Owner involvement required.', image_url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-31', '2026-09-01', '2026-09-02'] },
  { id: '40000000-0000-0000-0000-000000000005', name: 'Care Vet Clinic & Diagnostics', type: 'vet', experience: 12, rating: 4.95, location: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, price: 600.00, verified: true, about: 'Senior veterinary surgeon. Consultations, vaccinations, microchipping, and minor surgeries.', safety_info: 'In-house pharmacy. State-of-the-art diagnostic machines. Clean facilities.', image_url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03'] },
  { id: '40000000-0000-0000-0000-000000000006', name: 'Pink City Pet Boarding & Sitting', type: 'boarding', experience: 4, rating: 4.50, location: 'Jaipur', latitude: 26.9124, longitude: 75.7873, price: 700.00, verified: false, about: 'Spacious yard, clean food, and home-like atmosphere for boarding dogs. Cat boarding available in separate rooms.', safety_info: 'First-aid kit ready. High boundary walls. Clean filtered drinking water.', image_url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-08-31', '2026-09-04', '2026-09-05'] },
  { id: '40000000-0000-0000-0000-000000000007', name: 'Sector 17 Pet Sitting', type: 'sitting', experience: 2, rating: 4.40, location: 'Chandigarh', latitude: 30.7333, longitude: 76.7794, price: 500.00, verified: true, about: 'Professional in-house cat/dog sitting. Feeding, litter clean-up, play sessions, and watering plants included.', safety_info: 'Background verified. Fully insured caretakers. GPS check-in/out.', image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-08-31', '2026-09-01'] },
  { id: '40000000-0000-0000-0000-000000000008', name: 'Groom & Glow Pet Parlour', type: 'grooming', experience: 7, rating: 4.75, location: 'Delhi', latitude: 28.5244, longitude: 77.1855, price: 950.00, verified: true, about: 'Stylized haircuts, tick treatment, aromatic bubble baths for cats and dogs.', safety_info: 'Hydraulic grooming tables. Professional pet styling blowers.', image_url: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&q=80&w=300', available_dates: ['2026-08-30', '2026-09-01', '2026-09-02', '2026-09-03'] }
];

// Reviews
let reviews = [
  { id: 'r1', provider_id: '40000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000103', rating: 5, comment: 'Karan is wonderful! My dog Rocky stayed there for 3 days and came back super happy and clean. Highly recommended!', created_at: new Date().toISOString() },
  { id: 'r2', provider_id: '40000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', rating: 4, comment: 'Great facilities and very attentive boarding. Rocky had a blast playing with other boarding dogs. Just wish they updated pictures slightly earlier in the day.', created_at: new Date().toISOString() },
  { id: 'r3', provider_id: '40000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000101', rating: 5, comment: 'Anita is very professional. She walks Rocky daily and shares the live route. Rockys leash pulling has actually improved.', created_at: new Date().toISOString() },
  { id: 'r4', provider_id: '40000000-0000-0000-0000-000000000003', user_id: '10000000-0000-0000-0000-000000000102', rating: 5, comment: 'Milo loved the grooming spa. The staff is gentle and the Persian haircut is flawless.', created_at: new Date().toISOString() },
  { id: 'r5', provider_id: '40000000-0000-0000-0000-000000000004', user_id: '10000000-0000-0000-0000-000000000102', rating: 4, comment: 'Very knowledgeable trainer. Saw massive progress in my puppy with just 4 sessions. Good job!', created_at: new Date().toISOString() },
  { id: 'r6', provider_id: '40000000-0000-0000-0000-000000000005', user_id: '10000000-0000-0000-0000-000000000105', rating: 5, comment: 'Best veterinary services in Hyderabad. Dr. Rao diagnosed our kittens allergy correctly after 2 clinics failed. Bless them!', created_at: new Date().toISOString() },
  { id: 'r7', provider_id: '40000000-0000-0000-0000-000000000005', user_id: '10000000-0000-0000-0000-000000000102', rating: 5, comment: 'Took my cat here for vaccination. Very gentle and efficient.', created_at: new Date().toISOString() },
  { id: 'r8', provider_id: '40000000-0000-0000-0000-000000000006', user_id: '10000000-0000-0000-0000-000000000103', rating: 4, comment: 'Good boarding options in Jaipur. Safe and clean.', created_at: new Date().toISOString() },
  { id: 'r9', provider_id: '40000000-0000-0000-0000-000000000007', user_id: '10000000-0000-0000-0000-000000000104', rating: 5, comment: 'Punctual sitting and super detailed logs. Highly recommended in Chandigarh.', created_at: new Date().toISOString() },
  { id: 'r10', provider_id: '40000000-0000-0000-0000-000000000008', user_id: '10000000-0000-0000-0000-000000000101', rating: 5, comment: 'Perfect bath and blow dry! Rocky smells incredible. Very friendly staff.', created_at: new Date().toISOString() }
];

// Adoption Applications (8 entries)
let adoptionApplications = [
  { id: '50000000-0000-0000-0000-000000000001', pet_id: '30000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', status: 'pending', answers: { reason: "Want to adopt a playmate for my active lifestyle.", has_yard: "yes", hours_away: "4", past_experience: "Grew up with two Indie dogs." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000002', pet_id: '30000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000102', status: 'under_review', answers: { reason: "Absolutely love cats and want to provide a indoor safe house.", has_yard: "no", hours_away: "6", past_experience: "None, but researched extensively." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000003', pet_id: '30000000-0000-0000-0000-000000000003', user_id: '10000000-0000-0000-0000-000000000103', status: 'approved', answers: { reason: "Gentle dog suitable for my kids.", has_yard: "yes", hours_away: "2", past_experience: "Adopted a Lab mix in 2018." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000004', pet_id: '30000000-0000-0000-0000-000000000103', user_id: '10000000-0000-0000-0000-000000000104', status: 'pending', answers: { reason: "Looking for a calm indoor cat.", has_yard: "no", hours_away: "5", past_experience: "Yes, had a family cat for 8 years." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000005', pet_id: '30000000-0000-0000-0000-000000000005', user_id: '10000000-0000-0000-0000-000000000105', status: 'rejected', answers: { reason: "Persians are fluffy and cute.", has_yard: "no", hours_away: "10", past_experience: "None." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000006', pet_id: '30000000-0000-0000-0000-000000000012', user_id: '10000000-0000-0000-0000-000000000102', status: 'pending', answers: { reason: "Experienced and active, perfect match for Max.", has_yard: "yes", hours_away: "1", past_experience: "Trained German Shepherds before." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000007', pet_id: '30000000-0000-0000-0000-000000000013', user_id: '10000000-0000-0000-0000-000000000103', status: 'completed', answers: { reason: "Friendly cat to bond with our senior dog.", has_yard: "no", hours_away: "3", past_experience: "Yes, multi-pet owner." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: '50000000-0000-0000-0000-000000000008', pet_id: '30000000-0000-0000-0000-000000000014', user_id: '10000000-0000-0000-0000-000000000105', status: 'under_review', answers: { reason: "We want to give Bruno a second chance.", has_yard: "yes", hours_away: "3", past_experience: "Had street dogs before." }, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

// User Pets (My Pets)
let userPets = [
  { id: '60000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', name: 'Sherlock', species: 'dog', breed: 'Indie', dob: '2023-04-12', gender: 'Male', weight: 18.5, photo_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300', medical_notes: 'Recovered from gastro infection in puppyhood. No current issues.', vaccination_status: 'Fully Vaccinated', created_at: new Date().toISOString() },
  { id: '60000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000102', name: 'Misty', species: 'cat', breed: 'Domestic Shorthair', dob: '2024-01-20', gender: 'Female', weight: 3.8, photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300', medical_notes: 'Slightly overweight. Restrict free feeding.', vaccination_status: 'Fully Vaccinated', created_at: new Date().toISOString() }
];

// Health Reminders
let healthReminders = [
  { id: 'hr1', user_pet_id: '60000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', type: 'vaccination', title: 'Rabies Booster', notes: 'Annual booster shot at Care Vet.', due_date: '2026-09-10T11:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr2', user_pet_id: '60000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', type: 'medication', title: 'Deworming Tablet', notes: 'Give after breakfast with peanut butter.', due_date: '2026-08-30T08:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr3', user_pet_id: '60000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', type: 'grooming', title: 'Nail Trimming Session', notes: 'Trim nails and clean paws.', due_date: '2026-08-28T17:00:00.000Z', completed: true, created_at: new Date().toISOString() },
  { id: 'hr4', user_pet_id: '60000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000102', type: 'vaccination', title: 'Feline Leukemia Vaccine', notes: 'At Bangalore Pet Clinic.', due_date: '2026-09-15T10:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr5', user_pet_id: '60000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000102', type: 'grooming', title: 'Brush Misty Coat', notes: 'Thorough brushing to prevent mats.', due_date: '2026-08-25T19:00:00.000Z', completed: true, created_at: new Date().toISOString() },
  { id: 'hr6', user_pet_id: '60000000-0000-0000-0000-000000000002', user_id: '10000000-0000-0000-0000-000000000102', type: 'medication', title: 'Flea & Tick Spot-on', notes: 'Apply on neck.', due_date: '2026-09-01T09:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr7', user_pet_id: null, user_id: '10000000-0000-0000-0000-000000000101', type: 'vet_appointment', title: 'General Vet Checkup', notes: 'Routine checkup.', due_date: '2026-09-05T14:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr8', user_pet_id: null, user_id: '10000000-0000-0000-0000-000000000103', type: 'medication', title: 'Deworming pill', notes: 'Next scheduled deworming.', due_date: '2026-09-20T09:00:00.000Z', completed: false, created_at: new Date().toISOString() },
  { id: 'hr9', user_pet_id: '60000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000101', type: 'general', title: 'Wash Dog Bedding', notes: 'Wash and sanitize.', due_date: '2026-08-26T10:00:00.000Z', completed: true, created_at: new Date().toISOString() },
  { id: 'hr10', user_pet_id: null, user_id: '10000000-0000-0000-0000-000000000104', type: 'grooming', title: 'Grooming Appointment', notes: 'Booking at Groom & Glow parlour.', due_date: '2026-09-02T11:30:00.000Z', completed: false, created_at: new Date().toISOString() }
];

// Lost & Found Reports (10 entries)
let lostFoundReports = [
  { id: 'lf1', user_id: '10000000-0000-0000-0000-000000000101', type: 'lost', pet_name: 'Simba', species: 'dog', breed: 'Beagle', color: 'Tri-color (Black, Brown, White)', location: 'Sector 17, Chandigarh', latitude: 30.7333, longitude: 76.7794, date: '2026-08-20', description: 'Lost near the main park around 6 PM. Wearing a red collar. Answers to Simba.', contact_info: 'Rahul Sharma: +919876543210', image_url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf2', user_id: '10000000-0000-0000-0000-000000000102', type: 'found', pet_name: null, species: 'cat', breed: 'Indie Tabby', color: 'Ginger/Orange', location: 'Indiranagar 8th Cross, Bangalore', latitude: 12.9716, longitude: 77.5946, date: '2026-08-22', description: 'Found a very friendly ginger cat sitting outside our gate. Eating well. Wearing no collar.', contact_info: 'Priya Patel: +919876543211', image_url: 'https://images.unsplash.com/photo-1574158622643-69d34d72650f?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf3', user_id: '10000000-0000-0000-0000-000000000103', type: 'lost', pet_name: 'Gini', species: 'cat', breed: 'Persian', color: 'White', location: 'Andheri West, Mumbai', latitude: 19.0760, longitude: 72.8777, date: '2026-08-18', description: 'Lost our fluffy white cat. She escaped through the balcony. Needs medication.', contact_info: 'Amit Joshi: +919876543212', image_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300', status: 'resolved', created_at: new Date().toISOString() },
  { id: 'lf4', user_id: '10000000-0000-0000-0000-000000000104', type: 'lost', pet_name: 'Buzo', species: 'dog', breed: 'Labrador mix', color: 'Golden/Yellow', location: 'Kothrud, Pune', latitude: 18.5204, longitude: 73.8567, date: '2026-08-24', description: 'Escaped during morning walk. Very friendly, loves treats. Wearing a black harness.', contact_info: 'Neha Kapoor: +919876543213', image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf5', user_id: '10000000-0000-0000-0000-000000000105', type: 'found', pet_name: null, species: 'dog', breed: 'Indie Pup', color: 'Black & White', location: 'Gachibowli, Hyderabad', latitude: 17.3850, longitude: 78.4867, date: '2026-08-23', description: 'Found a young pup roaming around DLF Cybercity. Kept him safe at our clinic.', contact_info: 'Siddharth Rao: +919876543214', image_url: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf6', user_id: '10000000-0000-0000-0000-000000000101', type: 'lost', pet_name: 'Luna', species: 'cat', breed: 'Domestic Shorthair', color: 'Calico', location: 'Dwarka Sector 6, Delhi', latitude: 28.6139, longitude: 77.2090, date: '2026-08-15', description: 'Rescued kitten lost near Dwarka Metro Station. Very playful.', contact_info: 'Rahul Sharma: +919876543210', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf7', user_id: '10000000-0000-0000-0000-000000000103', type: 'found', pet_name: null, species: 'dog', breed: 'Pug', color: 'Fawn', location: 'Bandra West, Mumbai', latitude: 19.0500, longitude: 72.8250, date: '2026-08-25', description: 'Found a lost male Pug. Wearing a blue neckband with no contact details. Safe with us.', contact_info: 'Amit: +919876543212', image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf8', user_id: '10000000-0000-0000-0000-000000000104', type: 'lost', pet_name: 'Zoe', species: 'dog', breed: 'Shih Tzu', color: 'White and Grey', location: 'Sector 35, Chandigarh', latitude: 30.7300, longitude: 76.7600, date: '2026-08-21', description: 'Zoe went missing from our backyard. Very small, wears a green bow.', contact_info: 'Neha: +919876543213', image_url: 'https://images.unsplash.com/photo-1512446813927-4a78aa900df9?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf9', user_id: '10000000-0000-0000-0000-000000000105', type: 'found', pet_name: null, species: 'cat', breed: 'Persian', color: 'Grey', location: 'Banjara Hills, Hyderabad', latitude: 17.4100, longitude: 78.4500, date: '2026-08-24', description: 'Found grey fluffy Persian cat. Seems well-groomed, definitely a lost pet.', contact_info: 'Sid: +919876543214', image_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=300', status: 'active', created_at: new Date().toISOString() },
  { id: 'lf10', user_id: '10000000-0000-0000-0000-000000000102', type: 'lost', pet_name: 'Oreo', species: 'dog', breed: 'German Shepherd mix', color: 'Black/Tan', location: 'Whitefield, Bangalore', latitude: 12.9698, longitude: 77.7499, date: '2026-08-10', description: 'Oreo went missing near ITPL area. Friendly but anxious.', contact_info: 'Priya: +919876543211', image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=300', status: 'resolved', created_at: new Date().toISOString() }
];

// Favorites
let favorites = [
  { user_id: '10000000-0000-0000-0000-000000000101', pet_id: '30000000-0000-0000-0000-000000000002' },
  { user_id: '10000000-0000-0000-0000-000000000101', pet_id: '30000000-0000-0000-0000-000000000003' },
  { user_id: '10000000-0000-0000-0000-000000000102', pet_id: '30000000-0000-0000-0000-000000000001' }
];

// Service Bookings
let serviceBookings = [
  { id: 'sb1', provider_id: '40000000-0000-0000-0000-000000000001', user_id: '10000000-0000-0000-0000-000000000103', pet_type: 'dog', service_type: 'boarding', start_date: '2026-08-30', end_date: '2026-09-02', status: 'confirmed', total_price: 2550.00, created_at: new Date().toISOString() }
];

// Notifications
let notifications = [
  { id: 'n1', user_id: '10000000-0000-0000-0000-000000000101', title: 'Welcome to PetVerse', message: 'Thank you for joining PetVerse! Complete your AI Pet Match profile today.', read: false, created_at: new Date().toISOString() },
  { id: 'n2', user_id: '10000000-0000-0000-0000-000000000101', title: 'Application Submitted', message: 'Your adoption application for Rocky is successfully sent to Delhi Paws Haven.', read: false, created_at: new Date().toISOString() },
  { id: 'n3', user_id: '10000000-0000-0000-0000-000000000102', title: 'Application Under Review', message: 'Delhi Paws Haven has marked your application for Luna as Under Review.', read: false, created_at: new Date().toISOString() },
  { id: 'n4', user_id: '10000000-0000-0000-0000-000000000103', title: 'Adoption Approved!', message: 'Congratulations! Your application for Simba has been approved. Please contact the shelter to schedule pickup.', read: false, created_at: new Date().toISOString() },
  { id: 'n5', user_id: '10000000-0000-0000-0000-000000000201', title: 'New Application Received', message: 'You have received a new adoption application for Rocky.', read: false, created_at: new Date().toISOString() },
  { id: 'n6', user_id: '10000000-0000-0000-0000-000000000101', title: 'Upcoming Care Reminder', message: 'Your pet Sherlock is due for Deworming Tablet tomorrow.', read: false, created_at: new Date().toISOString() }
];

module.exports = {
  users,
  shelters,
  pets,
  userPreferences,
  serviceProviders,
  reviews,
  adoptionApplications,
  userPets,
  healthReminders,
  lostFoundReports,
  favorites,
  serviceBookings,
  notifications
};
