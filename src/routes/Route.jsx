import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../private_pages/Dashboard";
import Student from "../pages/StudentPage/Student";
import Student2 from "../pages/StudentPage/Student2";
import CreateSession from "../pages/TutorPage/CreateSession";
import ViewAllSession from "../pages/TutorPage/ViewAllSession";
import UploadMaterials from "../pages/TutorPage/UploadMaterials";
import ViewAllMaterials from "../pages/TutorPage/ViewUserByEmail";
import PrivateTutor from "./PrivateTutor";
import AllUsers from "../pages/AdminPage/AllUsers";
import AllStudySession from "../pages/AdminPage/AllStudySession";
import AllMaterials from "../pages/AdminPage/AllMaterials";
import PrivateAdmin from "./PrivateAdmin";
import ViewUserByEmail from "../pages/TutorPage/ViewUserByEmail";
import SessionDetails from "../pages/Home/SessionDetails";
import PaymentPage from "../components/Stripe/PaymentPage";
import PrivetStudent from "./PrivetStudent";
import ViewBookedSessions from "../pages/StudentPage/ViewBookedSessions";
import CreateNotes from "../pages/StudentPage/CreateNotes";
import ManageNotes from "../pages/StudentPage/ManageNotes";
import StudyMaterials from "../pages/StudentPage/StudyMaterials";
import RoleBasedRedirect from "../components/RoleBasedRedirect";
import AllApprovedSessions from "../pages/AllSessions/AllApprovedSessions";
import SessionDetailsPage from "../pages/StudentPage/SessionDetailsPage";
import StudentMaterials from "../pages/StudentPage/StudentMaterials";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/session/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/approvedSessions",
        element: (
          <PrivateRoute>
            <AllApprovedSessions />
          </PrivateRoute>
        ),
      },
      {
        path: "/approvedSessions/:id",
        element: (
          <PrivateRoute>
            <SessionDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:sessionId",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true, // Default route redirects based on role
            element: <RoleBasedRedirect />,
          },
          // Admin routes
          {
            path: "admin/allUsers",
            element: (
              <PrivateAdmin>
                <AllUsers />
              </PrivateAdmin>
            ),
          },
          {
            path: "admin/allStudySessions",
            element: (
              <PrivateAdmin>
                <AllStudySession />
              </PrivateAdmin>
            ),
          },
          {
            path: "admin/allMaterials",
            element: (
              <PrivateAdmin>
                <AllMaterials />
              </PrivateAdmin>
            ),
          },
          // Student routes
          {
            path: "student/viewBookedSessions",
            element: (
              <PrivetStudent>
                <ViewBookedSessions />
              </PrivetStudent>
            ),
          },
          {
            path: "student/createNotes",
            element: (
              <PrivetStudent>
                <CreateNotes />
              </PrivetStudent>
            ),
          },
          {
            path: "student/manageNotes",
            element: (
              <PrivetStudent>
                <ManageNotes />
              </PrivetStudent>
            ),
          },
          {
            path: "student/studyMaterials",
            element: (
              <PrivetStudent>
                <StudyMaterials />
              </PrivetStudent>
            ),
          },
          {
            path: "sessionDetailsPage/:id",
            element: <SessionDetailsPage />,
          },
          {
            path: "viewMaterialsPage/:id",
            element: (
              <PrivetStudent>
                <StudentMaterials />
              </PrivetStudent>
            ),
          },
          // Tutor routes
          {
            path: "tutor/createSession",
            element: (
              <PrivateTutor>
                <CreateSession />
              </PrivateTutor>
            ),
          },
          {
            path: "tutor/viewAllSession",
            element: (
              <PrivateTutor>
                <ViewAllSession />
              </PrivateTutor>
            ),
          },
          {
            path: "tutor/uploadMaterials",
            element: (
              <PrivateTutor>
                <UploadMaterials />
              </PrivateTutor>
            ),
          },
          {
            path: "tutor/viewAllMaterials",
            element: (
              <PrivateTutor>
                <ViewUserByEmail />
              </PrivateTutor>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
