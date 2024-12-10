import React from "react";
import { Box, Drawer, List, ListItemIcon, ListItemText } from "@mui/material";
import { ClipboardPen, ListCheck } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import ListItemButton from "@mui/material/ListItemButton";

const menuItems = [
  { text: "Job Queries", icon: <ClipboardPen />, path: "/" },
  { text: "Leads", icon: <ListCheck />, path: "/leads" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "rgba(253, 224, 239, 0.8)",
        },
      }}
    >
      <Box sx={{ overflow: "auto", padding: 2 }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListItemButton component="a" href="/">
              <ListItemIcon sx={{ fontSize: 25 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Hunar"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: "medium",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
          }
        >
          {menuItems.map((item) => (
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
