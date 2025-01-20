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
          // Admin routes is here-->
          {
            path: "allUsers",
            element: (
              <PrivateAdmin>
                <AllUsers />
              </PrivateAdmin>
            ),
          },
          {
            path: "allStudySessions",
            element: (
              <PrivateAdmin>
                <AllStudySession />
              </PrivateAdmin>
            ),
          },
          {
            path: "allMaterials",
            element: (
              <PrivateAdmin>
                <AllMaterials />
              </PrivateAdmin>
            ),
          },
          // Students routes is here-->
          {
            path: "student",
            element: <Student />,
          },
          {
            path: "student2",
            element: <Student2 />,
          },
          // Tutor routes is here-->
          {
            path: "createSession",
            element: (
              <PrivateTutor>
                <CreateSession />
              </PrivateTutor>
            ),
          },
          {
            path: "viewAllSession",
            element: (
              <PrivateTutor>
                <ViewAllSession />
              </PrivateTutor>
            ),
          },
          {
            path: "uploadMaterials",
            element: (
              <PrivateTutor>
                <UploadMaterials />
              </PrivateTutor>
            ),
          },
          {
            path: "viewAllMaterials",
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

  ////////////
  {
    path: "*",
    element: <Error></Error>,
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
