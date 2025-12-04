import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage";
import AuthLayout from "../AuthlayOut/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Rider from "../Pages/Rider";
import PrivetRout from "../Routs/PrivetRout";
import SendPercel from "../Pages/SendPercel";
import Dashboard from "../DashboarLayout/Dashboard";
import MyParcels from "../Pages/Dashbord/MyParcels";
import Payment from "../Pages/Dashbord/Payment";
import PaymentSuccess from "../Pages/Dashbord/PaymentSuccess";
import PaymentCancled from "../Pages/Dashbord/PaymentCancled";
import PaymentHistory from "../Pages/Dashbord/PaymentHistory/PaymentHistory";
import ApproveRider from "../Pages/Dashbord/ApproveRider";
import UsersManagement from "../Pages/Dashbord/UsersManagement";
import AdminRout from "../Routs/AdminRout";
import AssignRiders from "../Pages/Dashbord/AssignRiders";
import AssignDeliveries from "../Pages/Dashbord/AssignDeliveries";
import RiderRout from "../Routs/RiderRout";
import CompletedDeliveries from "../Pages/Dashbord/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashbordHome from "../Pages/Dashbord/DashboardHome/DashbordHome";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/rider",
        element: (
          <PrivetRout>
            <Rider></Rider>
          </PrivetRout>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivetRout>
            <SendPercel></SendPercel>
          </PrivetRout>
        ),
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/service-center.json").then((res) => res.json()),
      },
      {
        path: "parcel-track/:trackingId",
        Component: ParcelTrack,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRout>
        <Dashboard></Dashboard>
      </PrivetRout>
    ),
    children: [
      {
        index: true,
        Component: DashbordHome,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancled,
      },

      //rider only routes
      {
        path: "assign-deliveries",
        element: (
          <RiderRout>
            <AssignDeliveries></AssignDeliveries>
          </RiderRout>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRout>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRout>
        ),
      },

      //admin only routs
      {
        path: "approve-rider",
        element: (
          <AdminRout>
            <ApproveRider></ApproveRider>
          </AdminRout>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRout>
            <AssignRiders></AssignRiders>
          </AdminRout>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRout>
            <UsersManagement></UsersManagement>
          </AdminRout>
        ),
      },
    ],
  },
]);
export default router;
