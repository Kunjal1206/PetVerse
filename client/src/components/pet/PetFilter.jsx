import React from 'react';
import { Search, Filter, RotateCcw, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const PetFilter = ({
  filters,
  onChange,
  onReset,
  totalCount = 0
}) => {
  const cities = ['All Cities', 'Delhi', 'Bangalore', 'Mumbai', 'Pune', 'Chandigarh', 'Hyderabad', 'Jaipur'];

  const handleInputChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-300 p-6 shadow-premium space-y-6">
      
      {/* Top Search & Reset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by pet name, breed, keywords..."
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-cream-50/60 border border-cream-300 rounded-2xl text-xs font-medium text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs font-semibold text-charcoal-600">
            Showing <strong className="text-brand-700">{totalCount}</strong> pets
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-charcoal-500 hover:text-rose-600 px-3 py-1.5 rounded-xl hover:bg-cream-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Species Filter Pills */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2">
          Pet Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: '', label: 'All Pets', icon: '🐾' },
            { id: 'dog', label: 'Dogs Only', icon: '🐶' },
            { id: 'cat', label: 'Cats Only', icon: '🐱' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleInputChange('species', type.id)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                filters.species === type.id
                  ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                  : 'bg-cream-50 border-cream-300 text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Dropdown Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-cream-200">
        
        {/* City Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Location
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-800 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {cities.map((c) => (
              <option key={c} value={c === 'All Cities' ? '' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Gender
          </label>
          <select
            value={filters.gender || ''}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-800 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Size
          </label>
          <select
            value={filters.size || ''}
            onChange={(e) => handleInputChange('size', e.target.value)}
            className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-800 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="">Any Size</option>
            <option value="Small">Small (&lt; 10kg)</option>
            <option value="Medium">Medium (10 - 25kg)</option>
            <option value="Large">Large (&gt; 25kg)</option>
          </select>
        </div>

        {/* Sorting */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs font-medium text-charcoal-800 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="newest">Newest Listed</option>
            <option value="age_asc">Age: Youngest First</option>
            <option value="age_desc">Age: Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PetFilter;
