import {isMobile} from 'react-device-detect';
import {SensorData} from "../components";

const Sensors = () => {
    return (
        <div className="text-center">
            {isMobile ? (
                <>
                    <SensorData sensorType="accelerationIncludingGravity"/>
                    <SensorData sensorType="orientation"/>
                    <SensorData sensorType="acceleration"/>
                </>
            ) : (
                <div className="mt-10">
                    <p className="font-bold text-xl">This content is available only on mobile.</p>
                </div>
            )}
        </div>
    );
};

export default Sensors;
