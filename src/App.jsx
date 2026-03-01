import React, { useState, useEffect, useCallback } from 'react';
import { db, getSettings, updateSettings, initSettings } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import ErrorBoundary from './components/ErrorBoundary';
import Onboarding from './screens/Onboarding';
import MyPlants from './screens/MyPlants';
import PlantDetail from './screens/PlantDetail';
import AddPlant from './screens/AddPlant';
import EditPlant from './screens/EditPlant';
import Schedule from './screens/Schedule';
import Settings from './screens/Settings';
import Premium from './screens/Premium';
import TabBar from './components/TabBar';

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [selectedPlantId, setSelectedPlantId] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    (async () => {
      await initSettings();
      const s = await getSettings();
      setSettings(s);
      setScreen(s.onboardingDone ? 'home' : 'onboarding');
    })();
  }, []);

  useEffect(() => {
    if (!settings) return;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = settings.darkMode === 'dark' || (settings.darkMode === 'auto' && prefersDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [settings]);

  const refreshSettings = useCallback(async () => {
    const s = await getSettings();
    setSettings(s);
  }, []);

  const navigate = useCallback((s, plantId) => {
    setScreen(s);
    if (plantId !== undefined) setSelectedPlantId(plantId);
  }, []);

  if (screen === 'loading' || !settings) {
    return <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><span style={{ fontSize: 48 }}>🌿</span></div>;
  }

  const showTabs = ['home', 'schedule', 'settings'].includes(screen);

  return (
    <ErrorBoundary>
      <div className="app-container">
        {screen === 'onboarding' && (
          <Onboarding onDone={async () => {
            await updateSettings({ onboardingDone: true });
            await refreshSettings();
            navigate('home');
          }} />
        )}
        {screen === 'home' && <MyPlants navigate={navigate} settings={settings} />}
        {screen === 'detail' && <PlantDetail plantId={selectedPlantId} navigate={navigate} settings={settings} />}
        {screen === 'add' && <AddPlant navigate={navigate} settings={settings} />}
        {screen === 'edit' && <EditPlant plantId={selectedPlantId} navigate={navigate} />}
        {screen === 'schedule' && <Schedule navigate={navigate} />}
        {screen === 'settings' && <Settings settings={settings} refreshSettings={refreshSettings} navigate={navigate} />}
        {screen === 'premium' && <Premium settings={settings} refreshSettings={refreshSettings} navigate={navigate} />}
        {showTabs && <TabBar screen={screen} navigate={navigate} />}
      </div>
    </ErrorBoundary>
  );
}
