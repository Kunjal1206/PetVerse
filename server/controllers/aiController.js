const petService = require('../services/petService');
require('dotenv').config();

// AI Pet Match - Weighted Scoring Algorithm
async function matchPets(req, res, next) {
  try {
    const preferences = req.body;
    
    // Validate request
    if (!preferences || Object.keys(preferences).length === 0) {
      return res.status(400).json({ message: 'Quiz preferences are required.' });
    }

    const allPets = await petService.getPets({ status: 'available' });
    const scoredPets = [];

    for (const pet of allPets) {
      let score = 80; // Starting baseline score
      const reasons = [];

      // 1. Preferred Pet Type (dog/cat/either)
      if (preferences.petType && preferences.petType !== 'either') {
        if (pet.species.toLowerCase() !== preferences.petType.toLowerCase()) {
          score -= 40;
        } else {
          score += 5;
          reasons.push(`✓ Perfect species match (${pet.species})`);
        }
      }

      // 2. Home Type & Size/Species (apartment/house)
      if (preferences.homeType === 'apartment') {
        if (pet.size === 'Large') {
          score -= 20;
        } else if (pet.size === 'Small' || pet.species === 'cat') {
          score += 8;
          reasons.push('✓ Great size for apartment living');
        }
      } else if (preferences.homeType === 'house') {
        if (pet.size === 'Large' || pet.temperament.includes('Active')) {
          score += 10;
          reasons.push('✓ House has ideal space for active needs');
        }
      }

      // 3. Activity Level
      const petIsActive = pet.temperament.toLowerCase().includes('active') || pet.temperament.toLowerCase().includes('playful');
      const petIsCalm = pet.temperament.toLowerCase().includes('calm') || pet.temperament.toLowerCase().includes('quiet') || pet.temperament.toLowerCase().includes('gentle');

      if (preferences.activityLevel === 'high') {
        if (petIsActive) {
          score += 12;
          reasons.push('✓ Matches your highly active lifestyle');
        } else if (petIsCalm) {
          score -= 5;
        }
      } else if (preferences.activityLevel === 'low') {
        if (petIsActive) {
          score -= 15;
        } else if (petIsCalm) {
          score += 12;
          reasons.push('✓ Matches your calm and relaxed lifestyle');
        }
      } else { // Moderate
        score += 5;
      }

      // 4. Away Hours & Age/Species
      const isYoungPuppyKitten = pet.age.includes('month') || parseInt(pet.age) < 1;
      if (preferences.awayHours === '6+') {
        if (isYoungPuppyKitten) {
          score -= 25;
        } else if (pet.species === 'cat') {
          score += 10;
          reasons.push('✓ Independent cat fits your away schedule');
        } else {
          score -= 10;
        }
      } else if (preferences.awayHours === '0-2' || preferences.awayHours === '2-6') {
        score += 5;
        reasons.push('✓ Fits your daily home availability');
      }

      // 5. Children
      const isKidFriendly = pet.temperament.toLowerCase().includes('friendly') || pet.temperament.toLowerCase().includes('gentle') || pet.temperament.toLowerCase().includes('social');
      if (preferences.hasChildren) {
        if (isKidFriendly) {
          score += 10;
          reasons.push('✓ Gentle and friendly with children');
        } else {
          score -= 10;
        }
      }

      // 6. Other Pets
      if (preferences.hasOtherPets) {
        if (pet.temperament.toLowerCase().includes('social') || pet.temperament.toLowerCase().includes('friendly')) {
          score += 8;
          reasons.push('✓ Social nature helps integrate with other pets');
        }
      }

      // 7. Preferred Size
      if (preferences.preferredSize && preferences.preferredSize !== 'any') {
        if (pet.size.toLowerCase() === preferences.preferredSize.toLowerCase()) {
          score += 8;
          reasons.push(`✓ Matches your preferred size (${pet.size})`);
        } else {
          score -= 10;
        }
      }

      // 8. Temperament matching
      if (preferences.preferredTemperament && preferences.preferredTemperament.length > 0) {
        let tempMatches = 0;
        preferences.preferredTemperament.forEach(temp => {
          if (pet.temperament.toLowerCase().includes(temp.toLowerCase())) {
            tempMatches++;
          }
        });
        if (tempMatches > 0) {
          score += tempMatches * 4;
          reasons.push(`✓ Fits your preference for a ${preferences.preferredTemperament.slice(0, 2).join('/')} pet`);
        }
      }

      // Ensure score is bounded between 40% and 98%
      score = Math.max(40, Math.min(98, score));

      // Make sure there are at least 2 default good reasons if score is decent
      if (score >= 70 && reasons.length < 2) {
        reasons.push('✓ Safe and manageable care requirements');
        reasons.push('✓ Friendly and adaptable personality');
      }

      scoredPets.push({
        ...pet,
        compatibilityScore: score,
        matchReasons: reasons.slice(0, 4) // Return top 4 reasons
      });
    }

    // Sort by compatibility score descending
    scoredPets.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json(scoredPets);
  } catch (error) {
    next(error);
  }
}

// AI Assistant Chatbot
async function chat(req, res, next) {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    const systemPrompt = `You are "PetVerse Assistant", an empathetic, expert AI pet care assistant on the PetVerse platform. 
    You help users with pet care advice, health checkup guidelines, training tips, and explaining which pets are suitable for them.
    DISCLAIMER: Always include a polite reminder that your advice is for general info and not a substitute for professional veterinary advice if the user asks about symptoms or medical issues. Keep your replies structured, clear, and warm.`;

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        // Query Gemini API using fetch
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt }] },
              ...(history || []).map(h => ({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              })),
              { role: 'user', parts: [{ text: message }] }
            ]
          })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
          const text = data.candidates[0].content.parts[0].text;
          return res.json({ text });
        }
      } catch (geminiError) {
        console.error('Gemini API call failed, falling back to rule-based engine:', geminiError.message);
      }
    }

    // Fallback Rule-Based Chat Assistant
    const msg = message.toLowerCase();
    let reply = "Hello! I am your PetVerse Care Assistant. How can I help you care for your pet today?";

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      reply = "Hi there! Welcome to PetVerse! 🐾 I am here to help you with pet care tips, training guidelines, and adoption questions. What's on your mind?";
    } else if (msg.includes('sick') || msg.includes('vomit') || msg.includes('fever') || msg.includes('blood') || msg.includes('cough') || msg.includes('injury') || msg.includes('vet') || msg.includes('doctor')) {
      reply = "I'm sorry to hear that your pet might be feeling unwell. 😟 \n\n*DISCLAIMER: I provide general advice and am not a substitute for professional veterinary care.*\n\nPlease monitor your pet's eating, drinking, and energy levels. If symptoms persist for more than 24 hours, or if they are in distress, please visit a veterinary doctor immediately. You can search for verified clinics on our **Nearby Services** page.";
    } else if (msg.includes('adopt') || msg.includes('how to adopt')) {
      reply = "Adopting is simple with PetVerse! \n\n1. Browse available pets on our **Adopt** page.\n2. Click on a pet profile to read their details.\n3. Take the **AI Pet Match** quiz to see if they fit your home.\n4. Click **Apply to Adopt** and fill out the questionnaire. The shelter will review your request and get back to you! 🏡";
    } else if (msg.includes('feed') || msg.includes('food') || msg.includes('diet')) {
      reply = "Proper nutrition is key to a long, happy life! 🍎\n\n* **Dogs**: High-quality kibble matched to their size and age. Avoid chocolate, onions, grapes, and cooked bones.\n* **Cats**: A balance of wet food (for hydration) and dry food. Cats are obligate carnivores, so they need meat-based proteins.\n\nMake sure fresh water is always available!";
    } else if (msg.includes('train') || msg.includes('potty') || msg.includes('bite')) {
      reply = "Training takes patience and consistency! 🐕\n\n* Use **positive reinforcement** (treats and praise) rather than scolding.\n* Keep training sessions short (5-10 minutes) so they don't lose focus.\n* For potty training, take them out immediately after meals and sleep, and reward success instantly.";
    } else if (msg.includes('cat') && msg.includes('groom')) {
      reply = "Grooming cats is essential, especially long-hair breeds like Persians!\n\n* Brush them 2-3 times a week (daily for long-hairs) to prevent matting and reduce hairballs.\n* Trim their nails every 2-3 weeks.\n* Clean their ears with a damp cotton ball if dirty.";
    } else if (msg.includes('puppy') || msg.includes('kitten')) {
      reply = "Caring for young ones is a big responsibility! 🍼\n\n* Puppies and kittens need multiple vaccinations (Rabies, DHLPP/FVRCP) starting around 6-8 weeks.\n* Feed them puppy/kitten specific food 3-4 times a day.\n* Socialize them early with sights, sounds, and gentle people.";
    } else {
      reply = "That's a great question! While I am learning more about pet care every day, I recommend checking our **Pet Care Services** page for professional trainers and groomers, or scheduling a visit with a veterinarian for detailed health assessments. Let me know if you have other general care questions!";
    }

    res.json({ text: reply });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  matchPets,
  chat
};
