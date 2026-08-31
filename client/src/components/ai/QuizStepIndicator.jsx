import React from 'react';
import { motion } from 'framer-motion';

const QuizStepIndicator = ({ currentStep = 1, totalSteps = 7, stepTitle = '' }) => {
  const progressPercent = ((currentStep) / totalSteps) * 100;

  return (
    <div className="w-full space-y-3 max-w-xl mx-auto mb-8">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-charcoal-500 font-medium">
          {Math.round(progressPercent)}% Completed
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2.5 bg-cream-300 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {stepTitle && (
        <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal-900 text-center pt-2">
          {stepTitle}
        </h2>
      )}
    </div>
  );
};

export default QuizStepIndicator;
