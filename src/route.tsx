import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import AuthPage from "./pages/Auth/AuthPage";
import DashLayout from "./layout/DashLayout";
import Overview from "./pages/Overview/Overview";
import MeetingDetails from "./pages/MeetingDetails/MeetingDetails";
import Upcoming from "./pages/Upcoming/Upcoming";
import PreviousMeetings from "./pages/PreviousMeetings/PreviousMeetings";
import Visitors from "./pages/Visitors/Visitors";
import PreviousDetails from "./pages/PreviousMeetings/PreviousDetails";
import AddNewMeeting from "./pages/AddNewMeeting/AddNewMeeting";
import UpcomingDetails from "./pages/UpcomingDetails/UpcomingDetails";
import StaffManagement from "./pages/StaffManagement/StaffManagement";
import AuthWrapper from "./components/AuthWrapper";
import { useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Navigate to="/login" replace />, 
    },
    {
        path: '/login',
        element: (
          <AuthWrapper>
            <AuthPage />
          </AuthWrapper>
        )
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/admin',
        element: (
          <AuthWrapper>
            <ProtectedRoute />
          </AuthWrapper>
        ),
        children: [
          {
            element: <DashLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="overview" replace />
              },
              {
                path: 'overview',
                element: <Overview />
              },
              {
                path: "meetingDetails/:id",
                element: <MeetingDetails />
              },
              {
                path: "upcoming",
                element: <Upcoming />
              },
            {
                path : "previous",
                element : <PreviousMeetings/>
            },
            {
                path : "previousDetails/:id",
                element : <PreviousDetails/>
            },
            {
                path : "visitors",
                element : <Visitors/>
            },
            {
                path : "addNewMeeting",
                element : <AddNewMeeting/>
            },
            {
                path : "upcomingDetails/:id",
                element : <UpcomingDetails/>
            },
            {
                path : "staff",
                element : <StaffManagement/>
            }
            ]
          }
        ]
    }
]);

export default router;