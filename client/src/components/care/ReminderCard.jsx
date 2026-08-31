import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2, Calendar, Pill, Syringe, Scissors, Stethoscope, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

const ReminderCard = ({
  reminder,
  onToggleComplete,
  onDelete
}) => {
  const isPastDue = new Date(reminder.due_date) < new Date() && !reminder.completed;
  
  const typeIcons = {
    vaccination: { icon: Syringe, variant: 'brand', label: 'Vaccine' },
    medication: { icon: Pill, variant: 'warning', label: 'Medication' },
    vet_appointment: { icon: Stethoscope, variant: 'info', label: 'Vet Visit' },
    grooming: { icon: Scissors, variant: 'neutral', label: 'Grooming' },
    deworming: { icon: Sparkles, variant: 'success', label: 'Deworming' },
    general: { icon: Calendar, variant: 'neutral', label: 'Care' }
  };

  const typeConfig = typeIcons[reminder.type] || typeIcons.general;
  const Icon = typeConfig.icon;

  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
        reminder.completed
          ? 'bg-cream-100/60 border-cream-300 opacity-70'
          : isPastDue
          ? 'bg-rose-50/40 border-rose-200 shadow-xs'
          : 'bg-white border-cream-300 shadow-premium'
      }`}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Toggle Complete Checkbox */}
        <button
          onClick={() => onToggleComplete && onToggleComplete(reminder)}
          className={`mt-0.5 p-0.5 rounded-lg transition-transform active:scale-90 ${
            reminder.completed
              ? 'text-emerald-600'
              : 'text-charcoal-300 hover:text-emerald-500'
          }`}
          title={reminder.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {reminder.completed ? (
            <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Content */}
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={`text-sm font-bold ${
                reminder.completed
                  ? 'line-through text-charcoal-500'
                  : 'text-charcoal-900'
              }`}
            >
              {reminder.title}
            </h4>
            <Badge variant={typeConfig.variant} size="sm" dot>
              {typeConfig.label}
            </Badge>
          </div>

          {reminder.notes && (
            <p className="text-xs text-charcoal-600 leading-relaxed">
              {reminder.notes}
            </p>
          )}

          <div className="flex items-center gap-2 text-[11px] text-charcoal-500 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span className={isPastDue ? 'text-rose-600 font-semibold' : ''}>
              Due: {new Date(reminder.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {isPastDue && (
              <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-100 px-1.5 py-0.2 rounded">
                Overdue
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delete button */}
      {onDelete && (
        <button
          onClick={() => onDelete(reminder.id)}
          className="p-1.5 text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          title="Delete Reminder"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ReminderCard;
