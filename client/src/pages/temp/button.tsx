import { useEffect, useState } from "react";
import { useInterval } from '../../hooks/useInterval';

const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
];

type ButtonColor = "green" | "red";

const ButtonPage = () => {
    const [selectedInterval, setSelectedInterval] = useState<string>("second");
    const [isColorChanging, setIsColorChanging] = useState<Boolean>(false);
    const [buttonColor, setButtonColor] = useState<ButtonColor>("red");
    const [secondsToChange, setSecondsToChange] = useState<number>(0);

    useInterval(() => {
        if (!isColorChanging) return;

        if (secondsToChange <= 0) {
            changeColor();
        }

        setSecondsToChange((seconds) => seconds - 1);
    }, 1000);

    useEffect(() => {
        setSelectedInterval(localStorage.getItem("selectedInterval") || "second");

        setIsColorChanging(localStorage.getItem("isColorChanging") === "true");

        setButtonColor((localStorage.getItem("buttonColor") as ButtonColor) || "red");

        setSecondsToChange(parseInt(localStorage.getItem("secondsToChange")) || 0);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedInterval", selectedInterval);

        localStorage.setItem("isColorChanging", String(isColorChanging));

        localStorage.setItem("buttonColor", buttonColor);

        localStorage.setItem("secondsToChange", secondsToChange.toString());
    }, [selectedInterval, isColorChanging, buttonColor, secondsToChange]);

    const handleIntervalChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedInterval(event.currentTarget.value);

        setIsColorChanging(false);

        setSecondsToChange(getIntervalSecondsByLabel(event.currentTarget.value));
    };

    const handleButtonClick = () => {
        setIsColorChanging((previousValue) => !previousValue);
    };

    const changeColor = () => {
        if (buttonColor === "green") {
            setButtonColor("red");
        } else {
            setButtonColor("green");
        }

        setSecondsToChange(getIntervalSecondsByLabel(selectedInterval));

        setIsColorChanging(false);
    };

    const toUpperCase = (value: string) => {
        return value[0].toUpperCase() + value.substring(1);
    };

    const getIntervalSecondsByLabel = (label: string) => {
        return intervals.filter((interval) => interval.label === label)[0].seconds;
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <select onChange={handleIntervalChange} value={selectedInterval}>
                    {intervals.map((interval) => (
                        <option key={interval.label} value={interval.label}>
                            {toUpperCase(interval.label)}
                        </option>
                    ))}
                </select>

                <button onClick={handleButtonClick} style={{ marginTop: "1rem", background: buttonColor, color: "white" }}>
                    {isColorChanging ? "Stop interval" : "Start interval"}
                </button>
            </div>
        </div>
    );
};

export default ButtonPage;
