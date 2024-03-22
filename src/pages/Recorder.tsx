import React, { useState } from "react";
import { ReactMic } from "react-mic";

interface RecordedAudio {
    id: string;
    blobURL: string;
}

const Recorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordedAudios, setRecordedAudios] = useState<RecordedAudio[]>([]);

    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onData = () => {
        // Do nothing for now, you can handle onData event if needed
    };

    const onStop = (recordedBlob: { blobURL: string }) => {
        const newRecordedAudio: RecordedAudio = {
            id: Date.now().toString(),
            blobURL: recordedBlob.blobURL,
        };
        setRecordedAudios(prevState => [...prevState, newRecordedAudio]);
    };

    const playRecording = (blobURL: string) => {
        const audio = new Audio(blobURL);
        audio.play();
    };

    const removeRecording = (id: string) => {
        const updatedRecordedAudios = recordedAudios.filter(
            (audio) => audio.id !== id
        );
        setRecordedAudios(updatedRecordedAudios);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Voice Recorder</h2>
            <div className="flex justify-center gap-8 mb-4">
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={startRecording}
                    disabled={isRecording}
                >
                    Start Recording
                </button>
                <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${!isRecording ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={stopRecording}
                    disabled={!isRecording}
                >
                    Stop Recording
                </button>
            </div>
            <ReactMic
                record={isRecording}
                onStop={onStop}
                onData={onData}
                mimeType="audio/webm"
                className="w-full h-32 border border-gray-300 rounded-lg mb-4"
            />
            {recordedAudios.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Recorded Audios:</h3>
                    <ul>
                        {recordedAudios.map((audio) => (
                            <li key={audio.id} className="mb-2">
                                <audio controls src={audio.blobURL} className="mx-auto my-4"></audio>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
                                    onClick={() => playRecording(audio.blobURL)}
                                >
                                    Play
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                                    onClick={() => removeRecording(audio.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Recorder;
