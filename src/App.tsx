// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/header/index'
import Settings from './components/settings/index'
import Timer from './components/timer/index'
import Footer from './components/footer'
import  {AppSettings}  from './components/settings/index'; 

const defaultSettings: AppSettings = {
  workDuration: 25,
  breakDuration: 5,
  notificationSound: 'default.mp3',
};

function App () {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [timerSettings, setTimerSettings] = useState(defaultSettings);


  const handleSaveSettings = (newSettings: AppSettings) => {
    const mergedSettings: AppSettings = { ...timerSettings, ...newSettings };
    console.log('Merged settings: ', mergedSettings)
    setTimerSettings(mergedSettings);
  }

  return (
    
    <div className='flex flex-col space-y-10 bg-lightBeige'>
    <Header />
    <Timer 
    workDuration={timerSettings.workDuration} 
    breakDuration={timerSettings.breakDuration} 
     />
    <button className='text-darkDarkPurple' onClick={() => setShowSettings(!showSettings)}>
      {showSettings ? 'Hide settings' : 'Show settings'}
    </button>
    {showSettings && <Settings onSave={handleSaveSettings} />} 
    <Footer />
    </div>
  
  )
}

export default App
