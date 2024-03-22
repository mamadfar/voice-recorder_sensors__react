import {createBrowserRouter, Navigate} from "react-router-dom";
import {Recorder, Sensors} from "../pages";
import MainLayout from "../layouts/MainLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/recorder"/>,
    },
    {
        path: "/recorder",
        element: <MainLayout><Recorder/></MainLayout>,
    },
    {
        path: "/sensors",
        element: <MainLayout><Sensors/></MainLayout>,
    },
]);

export default router;