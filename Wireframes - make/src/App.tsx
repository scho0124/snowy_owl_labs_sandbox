import { useState } from "react";
import { KioskLanding } from "./components/KioskLanding";
import { Explore } from "./components/Explore";
import { Destination } from "./components/Destination";
import { Help } from "./components/Help";
import { NavigationPreferences } from "./components/NavigationPreferences";
import { DemographicSurvey } from "./components/DemographicSurvey";
import { FloorMap } from "./components/FloorMap";

type Screen =
  | "kiosk"
  | "explore"
  | "destination"
  | "help"
  | "preferences"
  | "survey"
  | "floorMap";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("kiosk");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<number>(2);
  const [history, setHistory] = useState<Screen[]>(["kiosk"]);

  const handleNavigate = (
    screen: Screen,
    destination?: string,
    floor?: number,
  ) => {
    if (destination) {
      setSelectedDestination(destination);
    }
    if (floor !== undefined) {
      setSelectedFloor(floor);
    }
    setCurrentScreen(screen);
    setHistory((prev) => [...prev, screen]);
  };

  const handleGoBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "kiosk":
        return <KioskLanding onNavigate={handleNavigate} />;
      case "explore":
        return <Explore onNavigate={handleNavigate} onGoBack={handleGoBack} />;
      case "destination":
        return (
          <Destination
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
            destination={selectedDestination}
          />
        );
      case "help":
        return <Help onNavigate={handleNavigate} onGoBack={handleGoBack} />;
      case "preferences":
        return (
          <NavigationPreferences
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        );
      case "survey":
        return (
          <DemographicSurvey
            onNavigate={handleNavigate}
            onGoBack={handleGoBack}
          />
        );
      case "floorMap":
        return (
          <FloorMap
            onGoBack={handleGoBack}
            floor={selectedFloor}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <KioskLanding onNavigate={handleNavigate} />;
    }
  };

  return <div className="min-h-screen bg-white">{renderScreen()}</div>;
}
