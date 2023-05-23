import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Dojo from "./Components/Dojo";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dojo />} />
    </Routes>
  );
};

export default AppRoutes;
