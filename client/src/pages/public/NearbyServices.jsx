import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  MapPin, 
  Phone, 
  Navigation, 
  Search, 
  Stethoscope, 
  Building2, 
  Sparkles, 
  Trees, 
  Home,
  Star,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Fix leaflet default marker icon issue in React
const customIcon = (color = '#1e3f3b') =>
  L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

// Component to dynamically change map view
const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const NearbyServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [selectedService, setSelectedService] = useState(null);

  const cityCoordinates = {
    Delhi: [28.6139, 77.2090],
    Bangalore: [12.9716, 77.5946],
    Mumbai: [19.0760, 72.8777],
    Pune: [18.5204, 73.8567],
    Chandigarh: [30.7333, 76.7794],
    Hyderabad: [17.3850, 78.4867],
    Jaipur: [26.9124, 75.7873]
  };

  const nearbyList = [
    {
      id: 'n1',
      name: 'Delhi Paws Rescue Shelter',
      category: 'shelter',
      categoryLabel: 'Rescue Shelter',
      city: 'Delhi',
      address: 'Sector 10, Dwarka, Delhi',
      lat: 28.5823,
      lng: 77.0500,
      phone: '+91 99999 9901',
      rating: 4.9,
      hours: '9:00 AM - 6:00 PM',
      color: '#1e3f3b',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'n2',
      name: 'Dr. Chawla Pet Clinic & Diagnostic',
      category: 'vet',
      categoryLabel: '24/7 Emergency Vet',
      city: 'Delhi',
      address: 'Green Park Extension, New Delhi',
      lat: 28.5580,
      lng: 77.2025,
      phone: '+91 98100 12345',
      rating: 4.8,
      hours: '24/7 Emergency Open',
      color: '#0d9488',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200 font-bold'
    },
    {
      id: 'n3',
      name: 'Groom & Glow Pet Spa',
      category: 'grooming',
      categoryLabel: 'Pet Grooming & Spa',
      city: 'Delhi',
      address: 'Vasant Vihar Community Centre',
      lat: 28.5600,
      lng: 77.1600,
      phone: '+91 98111 22334',
      rating: 4.7,
      hours: '10:00 AM - 7:00 PM',
      color: '#d97706',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'n4',
      name: 'Siri Fort Dog & Agility Park',
      category: 'park',
      categoryLabel: 'Canine Play Park',
      city: 'Delhi',
      address: 'August Kranti Marg, Siri Fort',
      lat: 28.5500,
      lng: 77.2200,
      phone: 'Public Park (Free Entry)',
      rating: 4.6,
      hours: '6:00 AM - 8:00 PM',
      color: '#059669',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      id: 'n5',
      name: 'Bangalore Pet Sanctuary & Vet',
      category: 'shelter',
      categoryLabel: 'Rescue Shelter & Clinic',
      city: 'Bangalore',
      address: 'Indiranagar 100ft Road, Bangalore',
      lat: 12.9716,
      lng: 77.5946,
      phone: '+91 99999 9903',
      rating: 4.9,
      hours: '8:00 AM - 8:00 PM',
      color: '#1e3f3b',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'n6',
      name: 'Care 24x7 Veterinary Hospital',
      category: 'vet',
      categoryLabel: '24/7 Trauma Center',
      city: 'Bangalore',
      address: 'Koramangala 4th Block, Bangalore',
      lat: 12.9352,
      lng: 77.6245,
      phone: '+91 80255 33445',
      rating: 4.9,
      hours: '24/7 Emergency Open',
      color: '#0d9488',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200 font-bold'
    },
    {
      id: 'n7',
      name: 'Mumbai Hope Rescue Center',
      category: 'shelter',
      categoryLabel: 'Rescue Shelter',
      city: 'Mumbai',
      address: 'Andheri West, Link Road, Mumbai',
      lat: 19.1300,
      lng: 72.8300,
      phone: '+91 99999 9904',
      rating: 4.8,
      hours: '9:00 AM - 7:00 PM',
      color: '#1e3f3b',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'n8',
      name: 'Karan Homestay Boarding',
      category: 'boarding',
      categoryLabel: 'Cage-Free Homestay',
      city: 'Mumbai',
      address: 'Bandra West, Mumbai',
      lat: 19.0550,
      lng: 72.8350,
      phone: '+91 98765 43212',
      rating: 4.9,
      hours: '24 Hours Attended',
      color: '#8b5cf6',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    }
  ];

  const filteredList = nearbyList.filter((item) => {
    const matchCity = item.city.toLowerCase() === selectedCity.toLowerCase();
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchCity && matchCat;
  });

  const activeCenter = selectedService 
    ? [selectedService.lat, selectedService.lng]
    : (cityCoordinates[selectedCity] || [28.6139, 77.2090]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-cream-300 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-200 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Interactive Geolocation Explorer</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Nearby Pet Services & Emergency Clinics
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Instant directions, phone numbers, and operating hours for 24/7 clinics, shelters, and dog parks.
          </p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2.5 bg-cream-100 p-2 rounded-2xl border border-cream-300 shrink-0">
          <label className="text-xs font-bold text-charcoal-700 uppercase pl-2">City:</label>
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedService(null);
            }}
            className="bg-white border border-cream-300 rounded-xl px-3 py-2 text-xs font-bold text-charcoal-900 shadow-xs focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {Object.keys(cityCoordinates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All Places', icon: MapPin },
          { id: 'vet', label: '24/7 Vet Clinics', icon: Stethoscope },
          { id: 'shelter', label: 'Rescue Shelters', icon: Building2 },
          { id: 'grooming', label: 'Grooming Spas', icon: Sparkles },
          { id: 'park', label: 'Dog Parks', icon: Trees },
          { id: 'boarding', label: 'Boarding Hosts', icon: Home },
        ].map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white border-brand-500 shadow-sm ring-2 ring-brand-200'
                  : 'bg-white border-cream-300 text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Split Map & List View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[660px]">
        
        {/* Left Side: Directory List (High Contrast, Always Visible Before Hover) */}
        <div className="lg:col-span-5 h-full overflow-y-auto space-y-3.5 pr-1">
          {filteredList.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-3xl border border-cream-300 text-xs text-charcoal-500 space-y-2">
              <p className="font-bold text-sm text-charcoal-700">No places found in this category</p>
              <p>Try switching to "All Places" or selecting another city from the top dropdown.</p>
            </div>
          ) : (
            filteredList.map((item) => {
              const isSelected = selectedService?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedService(item)}
                  className={`p-5 rounded-3xl bg-white border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-brand-500 ring-2 ring-brand-200 shadow-premium bg-brand-50/20'
                      : 'border-cream-300 hover:border-brand-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${item.badgeColor || 'bg-cream-200 text-charcoal-700'}`}>
                        {item.categoryLabel}
                      </span>
                      <h4 className="font-display font-bold text-base text-charcoal-900 leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 flex items-start gap-1.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{item.address}</span>
                  </p>

                  <div className="p-3 bg-cream-100/80 rounded-2xl border border-cream-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-charcoal-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-charcoal-500 shrink-0" />
                      <span className="font-semibold text-emerald-800">{item.hours}</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-800 font-bold">
                      <Phone className="w-3 h-3 text-brand-600 shrink-0" />
                      <span>{item.phone}</span>
                    </div>
                  </div>

                  {/* Always-visible action bar */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className={`font-bold ${isSelected ? 'text-brand-700' : 'text-charcoal-500'}`}>
                      {isSelected ? '● Selected on Map' : 'Click to View on Map'}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-800 font-bold transition-all flex items-center gap-1"
                    >
                      <span>Show Pin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Interactive Leaflet Map */}
        <div className="lg:col-span-7 h-full rounded-3xl overflow-hidden border border-cream-300 shadow-premium relative bg-cream-200">
          <MapContainer
            center={activeCenter}
            zoom={selectedService ? 14 : 12}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <ChangeMapView center={activeCenter} zoom={selectedService ? 14 : 12} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredList.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={customIcon(item.color)}
                eventHandlers={{
                  click: () => setSelectedService(item)
                }}
              >
                <Popup>
                  <div className="p-2 space-y-1.5 font-sans text-xs">
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-brand-50 text-brand-800">
                      {item.categoryLabel}
                    </span>
                    <p className="font-bold text-sm text-charcoal-900">{item.name}</p>
                    <p className="text-charcoal-600">{item.address}</p>
                    <p className="text-emerald-700 font-bold">⏱️ {item.hours}</p>
                    <p className="text-brand-700 font-semibold">📞 {item.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default NearbyServices;
