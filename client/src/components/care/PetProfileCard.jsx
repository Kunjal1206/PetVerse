import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Calendar, Trash2, ShieldCheck, Heart, Sparkles, Scale } from 'lucide-react';

const PetProfileCard = ({ pet, onDelete, onAddReminder }) => {
  return (
    <Card className="p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Photo */}
        <div className="relative shrink-0">
          <img
            src={pet.photo_url || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300'}
            alt={pet.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-cream-300 shadow-sm"
          />
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-brand-500 text-white font-bold text-[10px] uppercase rounded-lg shadow-xs">
            {pet.species}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal-900">
                {pet.name}
              </h3>
              <p className="text-xs text-charcoal-500 font-medium">
                {pet.breed || 'Mixed Breed'} • {pet.gender || 'Unknown'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="success" dot size="sm">
                {pet.vaccination_status || 'Vaccinated'}
              </Badge>
              {onDelete && (
                <button
                  onClick={() => onDelete(pet.id)}
                  className="p-1.5 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove Pet"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div className="p-2 bg-cream-100 rounded-xl flex items-center gap-1.5 text-charcoal-700">
              <Scale className="w-3.5 h-3.5 text-brand-500" />
              <span>Weight: <strong>{pet.weight ? `${pet.weight} kg` : 'N/A'}</strong></span>
            </div>
            <div className="p-2 bg-cream-100 rounded-xl flex items-center gap-1.5 text-charcoal-700">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              <span>Born: <strong>{pet.dob ? new Date(pet.dob).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'N/A'}</strong></span>
            </div>
            <div className="p-2 bg-cream-100 rounded-xl col-span-2 sm:col-span-1 flex items-center gap-1.5 text-charcoal-700">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
              <span className="truncate">Care: <strong>Active</strong></span>
            </div>
          </div>

          {pet.medical_notes && (
            <p className="text-xs text-charcoal-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 leading-relaxed">
              <strong>Medical Notes:</strong> {pet.medical_notes}
            </p>
          )}
        </div>
      </div>

      {onAddReminder && (
        <div className="mt-4 pt-4 border-t border-cream-200 flex justify-end">
          <Button variant="outline" size="sm" icon={Sparkles} onClick={() => onAddReminder(pet)}>
            Set Reminder for {pet.name}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PetProfileCard;
