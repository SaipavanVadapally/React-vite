import React, { useState, useEffect } from 'react';
import './App.css'; // Importing the CSS file

const PomodoroApp = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => {
                    if (timeLeft >= 1) return timeLeft - 1;
                    clearInterval(interval);
                    return 0;
                });
            }, 1000);
        } else if (!isRunning && timeLeft !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => setTimeLeft(25 * 60);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="pomodoro">
            <h2>Pomodoro Timer</h2>
            <div className="timer">{formatTime(timeLeft)}</div>
            <div className="controls">
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default PomodoroApp;
