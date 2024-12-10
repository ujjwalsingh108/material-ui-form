import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../molecules/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
