import ThemeLayout from "../HOC/ThemeLayout";
import DangNhapPage from "../pages/DangNhapPage/DangNhapPage";
import LocationManagement from "../pages/LocationManagement/LocationManagement";
import RoomManagement from "../pages/RoomManagement/RoomManagement";
import UserManagement from "../pages/UserManagement/UserManagement";

export const adminRoutes = [
    {
        path: "/",
        component: <DangNhapPage />,
    },
    {
        path: "/user",
        component: <ThemeLayout Component={UserManagement} />,
    },
    {
        path: "/location",
        component: <ThemeLayout Component={LocationManagement} />,
    },
    {
        path: "/room",
        component: <ThemeLayout Component={RoomManagement} />,
    },
];
