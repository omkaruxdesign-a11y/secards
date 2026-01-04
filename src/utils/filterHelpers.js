/**
 * Filters cards based on FD amount
 * @param {Array} cards - Array of card objects
 * @param {number} amount - FD amount to filter by
 * @param {boolean} isMinimum - If true, filters cards where minFD <= amount; if false, filters where minFD >= amount
 * @returns {Array} Filtered array of cards
 */
export function filterByFDAmount(cards, amount, isMinimum = true) {
  if (!amount || amount <= 0) return cards;

  return cards.filter(card => {
    if (isMinimum) {
      // Find cards where user's FD amount is >= card's minimum requirement
      return card.minFD <= amount;
    } else {
      // Find cards where minimum FD is >= specified amount
      return card.minFD >= amount;
    }
  });
}

/**
 * Sorts cards by minimum FD amount
 * @param {Array} cards - Array of card objects
 * @param {boolean} ascending - If true, sorts low to high; if false, sorts high to low
 * @returns {Array} Sorted array of cards
 */
export function sortByFD(cards, ascending = true) {
  return [...cards].sort((a, b) => {
    if (ascending) {
      return a.minFD - b.minFD;
    } else {
      return b.minFD - a.minFD;
    }
  });
}

/**
 * Gets a single card by its ID
 * @param {Array} cards - Array of card objects
 * @param {string} id - Card ID to search for
 * @returns {Object|null} Card object if found, null otherwise
 */
export function getCardById(cards, id) {
  return cards.find(card => card.id === id) || null;
}

/**
 * Filters cards by network type
 * @param {Array} cards - Array of card objects
 * @param {string} network - Network type (e.g., "VISA", "RuPay", "Mastercard")
 * @returns {Array} Filtered array of cards
 */
export function filterByNetwork(cards, network) {
  if (!network) return cards;

  return cards.filter(card =>
    card.network.some(n => n.toLowerCase() === network.toLowerCase())
  );
}

/**
 * Filters cards with zero fees
 * @param {Array} cards - Array of card objects
 * @returns {Array} Cards with no joining and annual fees
 */
export function getZeroFeeCards(cards) {
  return cards.filter(card => card.joiningFee === 0 && card.annualFee === 0);
}

/**
 * Gets cards by bank name
 * @param {Array} cards - Array of card objects
 * @param {string} bankName - Bank name to filter by
 * @returns {Array} Filtered array of cards
 */
export function filterByBank(cards, bankName) {
  if (!bankName) return cards;

  return cards.filter(card =>
    card.bankName.toLowerCase().includes(bankName.toLowerCase())
  );
}
