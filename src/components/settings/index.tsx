import { useState } from "react"

export interface AppSettings {
    workDuration: number, 
    breakDuration: number, 
    notificationSound: string
}

interface SettingsProps {
    onSave: (newSettings: AppSettings) => void;
  }

const Settings: React.FC<SettingsProps> = ({ onSave }) => {

    const [settings, setSettings] = useState<AppSettings> ({
        workDuration: 25, 
        breakDuration: 5, 
        notificationSound: "default.mp3",
    })

    const handleWorkDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newWorkDuration = newValue ? parseInt(newValue, 10) : 0;
        setSettings({ ...settings, workDuration: newWorkDuration });
    }

    const handleBreakDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const newBreakDuration = newValue ? parseInt(newValue, 10) : 0;
    setSettings({ ...settings, breakDuration: newBreakDuration })
    }

    const saveSettings = () => {
        onSave({
            ...settings, 
            workDuration: parseInt(settings.workDuration.toString(), 10),
        })
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const newValue = event.target.value.replace(/^0+/, '');
        event.target.value = newValue;
    }

    return (
        <>
        <form className="text-darkDarkPurple">
            <div>
                <label htmlFor="workDuration">Work duration (minutes):</label>
                <input
                type="number"
                id="workDuration"
                value={settings.workDuration}
                onChange={handleWorkDurationChange}
                onBlur={handleBlur}
                />
            </div>
            <div>
                <label htmlFor="breakDuration">Break duration(minutes):</label>
                <input
                type="number"
                id="breakDuration"
                value={settings.breakDuration}
                onChange={handleBreakDurationChange}
                onBlur={handleBlur}
                />
            </div>

        </form>
        <button className="text-darkDarkPurple" onClick={saveSettings}>Save Settings</button>
        </>
    )
}

export default Settings