import { useEffect, useState, FC } from "react";

interface SensorData {
    x: number;
    y: number;
    z: number;
}

interface ISensorDataProps {
    sensorType: "accelerationIncludingGravity" | "orientation" | "acceleration";
}

const SensorData: FC<ISensorDataProps> = ({ sensorType }) => {
    const [sensorData, setSensorData] = useState<SensorData>({
        x: 0,
        y: 0,
        z: 0,
    });

    useEffect(() => {
        const handleSensorData = (
            event: (DeviceMotionEvent | DeviceOrientationEvent)
        ) => {
            if (event instanceof DeviceMotionEvent && sensorType !== "orientation") {
                const sensorEvent = event[sensorType];
                if (sensorEvent) {
                    setSensorData({
                        x: sensorEvent.x ? parseFloat(sensorEvent.x.toFixed(2)) : 0,
                        y: sensorEvent.y ? parseFloat(sensorEvent.y.toFixed(2)) : 0,
                        z: sensorEvent.z ? parseFloat(sensorEvent.z.toFixed(2)) : 0,
                    });
                }
            } else if (event instanceof DeviceOrientationEvent && sensorType === "orientation") {
                setSensorData({
                    x: event.alpha ? parseFloat(event.alpha.toFixed(2)) : 0,
                    y: event.beta ? parseFloat(event.beta.toFixed(2)) : 0,
                    z: event.gamma ? parseFloat(event.gamma.toFixed(2)) : 0,
                });
            }
        };

        if (
            window.DeviceMotionEvent &&
            sensorType === "accelerationIncludingGravity"
        ) {
            window.addEventListener("devicemotion", handleSensorData, false);
        } else if (window.DeviceOrientationEvent && sensorType === "orientation") {
            window.addEventListener("deviceorientation", handleSensorData, false);
        } else if (window.DeviceOrientationEvent && sensorType === "acceleration") {
            window.addEventListener("devicemotion", handleSensorData, false);
        } else {
            console.error("Sensor not supported on this device.");
        }

        return () => {
            if (sensorType === "accelerationIncludingGravity") {
                window.removeEventListener("devicemotion", handleSensorData);
            } else if (sensorType === "orientation") {
                window.removeEventListener("deviceorientation", handleSensorData);
            }
        };
    }, [sensorType]);

    return (
        <div className="my-8">
            <h2 className="text-lg my-2"><b className="underline">{sensorType}</b> Data:</h2>
            <p>X: {sensorData.x}</p>
            <p>Y: {sensorData.y}</p>
            <p>Z: {sensorData.z}</p>
        </div>
    );
};

export default SensorData;
