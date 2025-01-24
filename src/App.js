import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/tailwind.output.css";
import React from "react";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PortalWrapper from "./pages/PortalWrapper";
import NavRoutes from "./Navroutes";
import OnSpotRegistrationContextProvider from "./context/OnSpotRegistrationContext";
import PaymentStatus from "./pages/PaymentWrapper";

const App = () => {
  return (
    <React.Fragment>
      <Toaster />
      <OnSpotRegistrationContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/payment" element={<PaymentStatus />} />
            <Route path="login" element={<Login />} />
            <Route path="" element={<PortalWrapper />}>
              {NavRoutes.map((n) => (
                <Route path={n.href} element={n.element} />
              ))}
              <Route path="*" element={<p></p>} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </OnSpotRegistrationContextProvider>
    </React.Fragment>
  );
};

export default App;
