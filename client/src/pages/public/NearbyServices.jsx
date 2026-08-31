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
  Star
} from 'lucide-react';

// Fix leaflet default marker icon issue in React
const customIcon = (color = '#1e3f3b') =>
  L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28]
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
      city: 'Delhi',
      address: 'Sector 10, Dwarka, Delhi',
      lat: 28.5823,
      lng: 77.0500,
      phone: '+91 99999 9901',
      rating: 4.9,
      hours: '9:00 AM - 6:00 PM',
      color: '#1e3f3b'
    },
    {
      id: 'n2',
      name: 'Dr. Chawla Pet Clinic & Diagnostic',
      category: 'vet',
      city: 'Delhi',
      address: 'Green Park Extension, New Delhi',
      lat: 28.5580,
      lng: 77.2025,
      phone: '+91 98100 12345',
      rating: 4.8,
      hours: '24/7 Emergency',
      color: '#0d9488'
    },
    {
      id: 'n3',
      name: 'Groom & Glow Pet Spa',
      category: 'grooming',
      city: 'Delhi',
      address: 'Vasant Vihar Community Centre',
      lat: 28.5600,
      lng: 77.1600,
      phone: '+91 98111 22334',
      rating: 4.7,
      hours: '10:00 AM - 7:00 PM',
      color: '#d97706'
    },
    {
      id: 'n4',
      name: 'Siri Fort Dog & Agility Park',
      category: 'park',
      city: 'Delhi',
      address: 'August Kranti Marg, Siri Fort',
      lat: 28.5500,
      lng: 77.2200,
      phone: 'Public Park',
      rating: 4.6,
      hours: '6:00 AM - 8:00 PM',
      color: '#059669'
    },
    {
      id: 'n5',
      name: 'Bangalore Pet Sanctuary & Vet',
      category: 'shelter',
      city: 'Bangalore',
      address: 'Indiranagar 100ft Road, Bangalore',
      lat: 12.9716,
      lng: 77.5946,
      phone: '+91 99999 9903',
      rating: 4.9,
      hours: '8:00 AM - 8:00 PM',
      color: '#1e3f3b'
    },
    {
      id: 'n6',
      name: 'Care 24x7 Veterinary Hospital',
      category: 'vet',
      city: 'Bangalore',
      address: 'Koramangala 4th Block, Bangalore',
      lat: 12.9352,
      lng: 77.6245,
      phone: '+91 80255 33445',
      rating: 4.9,
      hours: '24/7 Emergency',
      color: '#0d9488'
    },
    {
      id: 'n7',
      name: 'Mumbai Hope Rescue Center',
      category: 'shelter',
      city: 'Mumbai',
      address: 'Andheri West, Link Road, Mumbai',
      lat: 19.1300,
      lng: 72.8300,
      phone: '+91 99999 9904',
      rating: 4.8,
      hours: '9:00 AM - 7:00 PM',
      color: '#1e3f3b'
    },
    {
      id: 'n8',
      name: 'Karan Homestay Boarding',
      category: 'boarding',
      city: 'Mumbai',
      address: 'Bandra West, Mumbai',
      lat: 19.0550,
      lng: 72.8350,
      phone: '+91 98765 43212',
      rating: 4.9,
      hours: '24 Hours',
      color: '#8b5cf6'
    }
  ];

  const filteredList = nearbyList.filter((item) => {
    const matchCity = item.city.toLowerCase() === selectedCity.toLowerCase();
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchCity && matchCat;
  });

  const activeCenter = cityCoordinates[selectedCity] || [28.6139, 77.2090];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-bold border border-brand-200 mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>OpenStreetMap Geolocation</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Nearby Pet Services & Map
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Find veterinary clinics, rescue shelters, groomers, and dog parks near your location.
          </p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-charcoal-700 uppercase">City:</label>
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

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'all', label: 'All Services', icon: MapPin },
          { id: 'vet', label: 'Veterinary Clinics', icon: Stethoscope },
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
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white border-brand-500 shadow-xs'
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[620px]">
        
        {/* Left Side: Filtered Directory List */}
        <div className="lg:col-span-5 h-full overflow-y-auto space-y-3 pr-1">
          {filteredList.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-cream-300 text-xs text-charcoal-400">
              No services found in this category for {selectedCity}. Try selecting "All Services".
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedService(item)}
                className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer ${
                  selectedService?.id === item.id
                    ? 'border-brand-500 ring-2 ring-brand-100 shadow-premium-hover'
                    : 'border-cream-300 hover:border-brand-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-display font-bold text-sm text-charcoal-900">
                    {item.name}
                  </h4>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                </div>

                <p className="text-xs text-charcoal-600 flex items-center gap-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                  <span>{item.address}</span>
                </p>

                <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-brand-500" /> {item.phone}
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.hours}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Interactive Leaflet Map */}
        <div className="lg:col-span-7 h-full rounded-3xl overflow-hidden border border-cream-300 shadow-premium relative bg-cream-200">
          <MapContainer
            center={activeCenter}
            zoom={12}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <ChangeMapView center={activeCenter} zoom={12} />
            
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
                  <div className="p-1 space-y-1 font-sans text-xs">
                    <p className="font-bold text-charcoal-900">{item.name}</p>
                    <p className="text-charcoal-600">{item.address}</p>
                    <p className="text-emerald-700 font-semibold">{item.hours}</p>
                    <p className="text-brand-700 font-medium">📞 {item.phone}</p>
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
