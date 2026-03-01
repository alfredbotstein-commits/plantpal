import Dexie from 'dexie';

export const db = new Dexie('PlantPalDB');

db.version(1).stores({
  plants: '++id, name, species, location, wateringIntervalDays, nextWateringDate, createdAt',
  healthEntries: '++id, plantId, date, type',
  settings: 'key'
});

// Initialize default settings
export async function initSettings() {
  const existing = await db.settings.get('app');
  if (!existing) {
    await db.settings.put({
      key: 'app',
      defaultReminderTime: '09:00',
      soundEnabled: true,
      overdueRemindersEnabled: true,
      darkMode: 'auto',
      isPremium: false,
      onboardingDone: false
    });
  }
}

export async function getSettings() {
  return (await db.settings.get('app')) || {
    key: 'app',
    defaultReminderTime: '09:00',
    soundEnabled: true,
    overdueRemindersEnabled: true,
    darkMode: 'auto',
    isPremium: false,
    onboardingDone: false
  };
}

export async function updateSettings(updates) {
  const current = await getSettings();
  await db.settings.put({ ...current, ...updates });
}

export async function addPlant(plant) {
  const now = new Date().toISOString();
  return db.plants.add({
    ...plant,
    createdAt: now,
    photoURLs: plant.photoURLs || []
  });
}

export async function deletePlant(id) {
  await db.healthEntries.where('plantId').equals(id).delete();
  await db.plants.delete(id);
}

export async function markWatered(plantId) {
  const plant = await db.plants.get(plantId);
  if (!plant) return;
  const now = new Date();
  const next = new Date(now);
  next.setDate(next.getDate() + (plant.wateringIntervalDays || 7));
  
  await db.plants.update(plantId, {
    lastWateredDate: now.toISOString(),
    nextWateringDate: next.toISOString()
  });
  
  await db.healthEntries.add({
    plantId,
    date: now.toISOString(),
    type: 'watered',
    note: null,
    photoURL: null
  });
}

export async function snoozePlant(plantId, days = 1) {
  const plant = await db.plants.get(plantId);
  if (!plant) return;
  const next = new Date(plant.nextWateringDate || new Date());
  next.setDate(next.getDate() + days);
  await db.plants.update(plantId, { nextWateringDate: next.toISOString() });
}
