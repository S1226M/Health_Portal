"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Dashboard,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Search,
  Event,
  PendingActions,
  People,
  CalendarMonth,
  LocalHospital,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../actions/logout";
import "./globals.css";

// --- Theme Definition ---
const drawerWidth = 260;
const collapsedDrawerWidth = 72;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#059669", // Emerald-600
      light: "#34d399",
      dark: "#047857",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0ea5e9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: { root: { boxShadow: "none" } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: "4px 0 24px rgba(0,0,0,0.02)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        },
      },
    },
  },
});

// --- Styled Components ---
const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data?.ProfileURL);
      });
  }, []);

  const navItems = [
    { title: "Dashboard", href: "/doctor", icon: <Dashboard /> },
    {
      title: "Pending Appointments",
      href: "/doctor/modules/appointments",
      icon: <PendingActions />,
    },
    {
      title: "All Appointments",
      href: "/doctor/modules/all-appointments",
      icon: <CalendarMonth />,
    },
    {
      title: "My Patients",
      href: "/doctor/modules/patients",
      icon: <People />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <AppBarStyled
          position="fixed"
          open={open}
          color="inherit"
          sx={{ bgcolor: "white" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                color: "primary.main",
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Health Hub
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    display: { xs: "none", sm: "block" },
                    bgcolor: "primary.main",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 700,
                  }}
                >
                  Doctor Portal
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <form action={logout}>
                  <button
                    type="submit"
                    style={{
                      color: "#ef4444",
                      background: "none",
                      border: "none",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    }}
                  >
                    Logout
                  </button>
                </form>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Search />
                </IconButton>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Badge badgeContent={0} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <Avatar
                  src={imageUrl ?? undefined}
                  variant="rounded"
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    fontSize: 14,
                  }}
                >
                  D
                </Avatar>
              </Box>
            </Box>
          </Toolbar>
        </AppBarStyled>

        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedDrawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : collapsedDrawerWidth,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: "hidden",
            },
          }}
        >
          <DrawerHeader
            sx={{ justifyContent: open ? "space-between" : "center", px: 2 }}
          >
            {open && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
                <LocalHospital sx={{ color: "primary.main", fontSize: 28 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  Health<span style={{ color: "#0ea5e9" }}>Hub</span>
                </Typography>
              </Box>
            )}
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ color: "text.secondary" }}
            >
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ borderStyle: "dashed" }} />

          <List sx={{ px: 1, pb: 10, mt: 1 }}>
            <Typography
              variant="caption"
              sx={{
                display: open ? "block" : "none",
                px: 4,
                py: 1,
                color: "primary.main",
                fontWeight: "bold",
                opacity: 0.8,
                letterSpacing: "0.05em",
              }}
            >
              DOCTOR PANEL
            </Typography>
            {!open && <Divider sx={{ my: 1, mx: 2 }} />}
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding sx={{ display: "block", mb: 0.5 }}>
                  <Tooltip title={open ? "" : item.title} placement="right" arrow>
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderRadius: 2,
                        mx: 1,
                        color: isActive ? "white" : "text.secondary",
                        bgcolor: isActive ? "primary.main" : "transparent",
                        "&:hover": {
                          bgcolor: isActive ? "primary.dark" : "primary.light",
                          color: "white",
                          "& .MuiListItemIcon-root": { color: "white" },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: isActive ? "white" : "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          opacity: open ? 1 : 0,
                          "& .MuiTypography-root": {
                            fontSize: "0.875rem",
                            fontWeight: isActive ? 700 : 500,
                          },
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: "100%", overflowX: "hidden" }}
        >
          <DrawerHeader />
          <Fade in={true} timeout={800}>
            <Box>{children}</Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
