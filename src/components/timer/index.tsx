import { useEffect, useRef, useState } from "react";
import notificationSound from "../../assets/zapsplat_household_doorbell_small_traditional_swinging_ring_001_99375.mp3";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface TimerProps {
  workDuration: number;
  breakDuration: number;
}

const Timer = ({ workDuration, breakDuration }: TimerProps) => {
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(workDuration * 60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [audio] = useState(new Audio(notificationSound));

  const prevWorkDuration = useRef(workDuration);
  const prevBreakDuration = useRef(breakDuration);

  const toggleTimer = () => {
    console.log("Toggle Timer Clicked");

    if (!timerRunning) {
      startTimer();
    } else {
      pauseTimer();
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
    const newIntervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      } else {
        clearInterval(newIntervalId);
        switchPhase();
        playNoticiationSound();
      }
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const switchPhase = () => {
    if (phase === "work") {
      setPhase("break");
      setRemainingTime(breakDuration * 60);
    } else {
      setPhase("work");
      setRemainingTime(workDuration * 60);
    }
  };

  const resetTimer = () => {
    console.log("Reset Timer Clicked");

    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimerRunning(false);
    setPhase("work");
    setRemainingTime(workDuration * 60);
  };

  const playNoticiationSound = () => {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log("Audio play error:", error);
    });
  };

  useEffect(() => {
    if (
      prevWorkDuration.current !== workDuration ||
      prevBreakDuration.current !== breakDuration
    ) {
      setRemainingTime(workDuration * 60);
      prevWorkDuration.current = workDuration;
      prevBreakDuration.current = breakDuration;

      if (timerRunning) {
        pauseTimer();
        startTimer();
      }
    }
  }, [workDuration, breakDuration, timerRunning]);

  useEffect(() => {
    console.log("Timer Running:", timerRunning);
    console.log("Remaining Time:", remainingTime);
    console.log("Phase:", phase);
    console.log("Work Duration:", workDuration);
    console.log("Break Duration:", breakDuration);

    if (timerRunning && remainingTime === 0) {
      pauseTimer();
      switchPhase();
      playNoticiationSound();
    }
  }, [remainingTime, timerRunning]);

  useEffect(() => {
    if (phase === "break" && !timerRunning) {
      startTimer();
    }
  }, [phase, timerRunning]);

  return (
    <div>
      <p className="text-darkDarkPurple text-center text-2xl">
        {phase === "work" ? "Work" : "Break"}
      </p>
      <div className="circular-progress-container w-80 h-80 mx-auto mt-4">
        <CircularProgressbar
          value={
            (phase === "work"
              ? 1 - remainingTime / (workDuration * 60)
              : 1 - remainingTime / (breakDuration * 60)) * 100
          }
          text={`${Math.floor(remainingTime / 60)
            .toString()
            .padStart(2, "0")}:${(remainingTime % 60)
            .toString()
            .padStart(2, "0")}`}
          strokeWidth={5}
          styles={buildStyles({
            textSize: "20px",
            pathColor:
              phase === "work" ? `rgb(244, 238, 224)` : `rgb(244, 238, 224)`,
            trailColor: "rgb(57, 54, 70)",
            textColor: "#393646",
          })}
        />
      </div>
      <div className="timer-controls flex flex-col text-darkDarkPurple">
        <button onClick={toggleTimer}>
          {timerRunning ? "Pause" : "Start/Resume"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
