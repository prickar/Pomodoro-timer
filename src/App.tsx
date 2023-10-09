// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import Header from "./components/Header/index";
import Settings from "./components/Settings/index";
import Timer from "./components/Timer/index";
import Footer from "./components/Footer";
import { AppSettings } from "./components/Settings/index";

const defaultSettings: AppSettings = {
  workDuration: 25,
  breakDuration: 5,
  notificationSound: "default.mp3",
};

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [timerSettings, setTimerSettings] = useState(defaultSettings);

  const handleSaveSettings = (newSettings: AppSettings) => {
    const mergedSettings: AppSettings = { ...timerSettings, ...newSettings };
    console.log("Merged settings: ", mergedSettings);
    setTimerSettings(mergedSettings);
  };

  return (
    <div className="flex flex-col min-h-screen  bg-lightBeige font-roboto">
      <Header />
      <div className="mt-4">
        <Timer
          workDuration={timerSettings.workDuration}
          breakDuration={timerSettings.breakDuration}
        />
      </div>
      <button
        className="text-darkDarkPurple"
        onClick={() => setShowSettings(!showSettings)}
      >
        {showSettings ? "Hide settings" : "Show settings"}
      </button>
      {showSettings && <Settings onSave={handleSaveSettings} />}
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}

export default App;
