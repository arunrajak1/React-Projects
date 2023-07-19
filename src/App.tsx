import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { DashboardLayout } from './layouts/dashboard-layout/DashboardLayout';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';

export default function MainApp() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'light' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={{ colors:{'calfus':[
  "#D1F0EB",
  "#A5E2D8",
  "#7FD5C7",
  "#5DCAB9",
  "#40C1AC",
  "#36A593",
  "#2E8C7D",
  "#27776A",
  "#21655A",
  "#1C564D",
]}, primaryColor:'calfus', defaultGradient:{from: 'cyan', to:'yellow'}, colorScheme:'light'}}>
        <DashboardLayout>
            <Routes>
              <Route path="/home" element={ <HomePage className="page-content" /> } />
              <Route path="/" element={ <HomePage className="page-content"/> } />
              <Route path="/settings" element={ <SettingsPage className="page-content"/> } />
            </Routes>            
        </DashboardLayout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
