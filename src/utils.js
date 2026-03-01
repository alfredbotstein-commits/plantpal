export function getPlantStatus(plant) {
  if (!plant.nextWateringDate) return { status: 'healthy', text: 'No schedule set', days: 0 };
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const next = new Date(plant.nextWateringDate);
  next.setHours(0, 0, 0, 0);
  const diffMs = next.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { status: 'overdue', text: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`, days: diffDays };
  }
  if (diffDays === 0) {
    return { status: 'due', text: 'Water today!', days: 0 };
  }
  return { status: 'healthy', text: `Water in ${diffDays} day${diffDays !== 1 ? 's' : ''}`, days: diffDays };
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatFullDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export const FREE_PLANT_LIMIT = 5;

export const LOCATIONS = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Outdoor', 'Balcony'];

export function getSpeciesIcon(species) {
  if (!species) return '🌿';
  const s = species.toLowerCase();
  if (s.includes('cactus') || s.includes('succulent') || s.includes('aloe') || s.includes('agave')) return '🌵';
  if (s.includes('palm')) return '🌴';
  if (s.includes('lily') || s.includes('orchid') || s.includes('violet') || s.includes('flower') || s.includes('hibiscus') || s.includes('rose')) return '🌸';
  if (s.includes('fern')) return '🌿';
  return '🪴';
}
