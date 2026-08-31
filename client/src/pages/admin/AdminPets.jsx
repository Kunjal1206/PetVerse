import React, { useState, useEffect } from 'react';
import { getPets, deletePet } from '../../services/petService';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { PawPrint, Trash2, Search, MapPin, Building2 } from 'lucide-react';

const AdminPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error('Failed to load pets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this pet listing as admin?')) return;
    try {
      await deletePet(id);
      fetchPets();
    } catch (err) {
      console.error('Failed to delete pet:', err);
    }
  };

  const filteredPets = pets.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.breed?.toLowerCase().includes(search.toLowerCase()) ||
    p.shelter_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            Platform Pet Listings Moderation
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Overview of all dogs and cats listed by rescue shelters across India.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            placeholder="Search pet or shelter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading pet listings...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={pet.image_url}
                    alt={pet.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-cream-300"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-charcoal-900">{pet.name}</h3>
                    <p className="text-xs text-charcoal-500">{pet.species} • {pet.breed} • {pet.age}</p>
                    <Badge variant={pet.adoption_status === 'available' ? 'success' : 'warning'} size="sm">
                      {pet.adoption_status}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-charcoal-600 line-clamp-2 bg-cream-50 p-2.5 rounded-xl">
                  {pet.about}
                </p>

                <div className="text-[11px] text-charcoal-500 flex items-center justify-between pt-1 border-t border-cream-200">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-brand-500" /> {pet.shelter_name}
                  </span>
                  <span>{pet.shelter_city}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(pet.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Moderate / Delete</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPets;
