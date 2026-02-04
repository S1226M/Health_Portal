"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
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
  useMediaQuery,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Dashboard,
  LocalHospital,
  People,
  Receipt,
  Category,
  Science,
  Medication,
  Healing,
  Security,
  Payment,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  Event,
  Assignment,
  Person,
  Star,
  Hotel,
  Description,
  AttachMoney,
  MedicalServices,
  Biotech,
  Inventory,
  ShoppingCart,
  LocalPharmacy,
  ContentCut,
  LocationCity,
  Map,
  Public,
  AdminPanelSettings,
  Group,
  Notifications,
  Search,
  Settings
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';


// --- Theme Definition ---
const drawerWidth = 260;
const collapsedDrawerWidth = 72;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Professional Blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0ea5e9', // Sky Blue
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        },
      },
    },
  },
});

// --- Styled Components ---
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const router = useRouter();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
  fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        console.log('IMAGE URL:', data?.ProfileURL)
        setImageUrl(data?.ProfileURL)
      })
  }, [])

  const MyAvtarNavigation = () => {
    router.push('/admin/components/sec/user/4')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBarStyled position="fixed" open={open} color="inherit" sx={{ bgcolor: 'white' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                color: 'primary.main',
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Header Content */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                  Health Hub
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'none', sm: 'block' }, bgcolor: 'background.default', px: 1, py: 0.5, borderRadius: 1 }}>
                  Admin Portal
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <Search />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <Badge badgeContent={4} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                
                <Avatar 
                  onClick={MyAvtarNavigation}
                  src={imageUrl ?? undefined}
                  variant="rounded"
                  sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}
                >
                  A
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
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedDrawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
        >
          <DrawerHeader sx={{ justifyContent: open ? 'space-between' : 'center', px: 2 }}>
            {open && (
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', ml: 1 }}>
                Health<span style={{ color: '#0ea5e9' }}>Hub</span>
              </Typography>
            )}
            <IconButton onClick={handleDrawerClose} sx={{ color: 'text.secondary' }}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <List sx={{ px: 1, pb: 10 }}>
            {/* Dashboard */}
            <SidebarItem title="Dashboard" href="/admin" icon={<Dashboard />} isOpen={open} />

            <SidebarGroupLabel title="HOSPITAL (HOP)" isOpen={open} />
            <SidebarItem title="Appointments" href="/admin/components/hop/appointment" icon={<Event />} isOpen={open} />
            <SidebarItem title="Diagnosis Types" href="/admin/components/hop/diagnosistype" icon={<Assignment />} isOpen={open} />
            <SidebarItem title="Doctors" href="/admin/components/hop/doctor" icon={<LocalHospital />} isOpen={open} />
            <SidebarItem title="Doctor Reviews" href="/admin/components/hop/doctorreview" icon={<Star />} isOpen={open} />
            <SidebarItem title="Hospitals" href="/admin/components/hop/hospital" icon={<LocalHospital />} isOpen={open} />
            <SidebarItem title="Hosp. Treatments" href="/admin/components/hop/hospitaltreatment" icon={<Healing />} isOpen={open} />
            <SidebarItem title="OPD" href="/admin/components/hop/opd" icon={<Hotel />} isOpen={open} />
            <SidebarItem title="OPD Diag. Types" href="/admin/components/hop/opddiagnosistype" icon={<Description />} isOpen={open} />
            <SidebarItem title="Patients" href="/admin/components/hop/patient" icon={<Person />} isOpen={open} />
            <SidebarItem title="Receipts" href="/admin/components/hop/receipt" icon={<Receipt />} isOpen={open} />
            <SidebarItem title="Receipt Tran." href="/admin/components/hop/receipttran" icon={<AttachMoney />} isOpen={open} />
            <SidebarItem title="Specializations" href="/admin/components/hop/specialization" icon={<MedicalServices />} isOpen={open} />
            <SidebarItem title="Sub Treat. Types" href="/admin/components/hop/subtreatmenttype" icon={<Category />} isOpen={open} />
            <SidebarItem title="Treatment Types" href="/admin/components/hop/treatmenttype" icon={<Medication />} isOpen={open} />

            <SidebarGroupLabel title="LABORATORY (LAB)" isOpen={open} />
            <SidebarItem title="Lab Tests" href="/admin/components/lab/labtest" icon={<Science />} isOpen={open} />
            <SidebarItem title="Lab Test Orders" href="/admin/components/lab/labtestorder" icon={<Assignment />} isOpen={open} />
            <SidebarItem title="Lab Test Types" href="/admin/components/lab/labtesttype" icon={<Biotech />} isOpen={open} />

            <SidebarGroupLabel title="PHARMACY (PHM)" isOpen={open} />
            <SidebarItem title="Medicines" href="/admin/components/phm/medicine" icon={<LocalPharmacy />} isOpen={open} />
            <SidebarItem title="Med. Categories" href="/admin/components/phm/medicinecategory" icon={<Inventory />} isOpen={open} />
            <SidebarItem title="Medicine Orders" href="/admin/components/phm/orderofmedicine" icon={<ShoppingCart />} isOpen={open} />
            <SidebarItem title="Payment Type" href="/admin/components/phm/medicineorderpaymenttype" icon={<Payment />} isOpen={open} />

            <SidebarGroupLabel title="SURGERY (SUR)" isOpen={open} />
            <SidebarItem title="Surgeries" href="/admin/components/sur/surgery" icon={<ContentCut />} isOpen={open} />
            <SidebarItem title="Surgery Bookings" href="/admin/components/sur/surgerybooking" icon={<Event />} isOpen={open} />
            <SidebarItem title="Surgery Items" href="/admin/components/sur/surgeryitem" icon={<MedicalServices />} isOpen={open} />

            <SidebarGroupLabel title="LOCATION (LOC)" isOpen={open} />
            <SidebarItem title="Cities" href="/admin/components/loc/city" icon={<LocationCity />} isOpen={open} />
            <SidebarItem title="States" href="/admin/components/loc/state" icon={<Map />} isOpen={open} />
            <SidebarItem title="Countries" href="/admin/components/loc/country" icon={<Public />} isOpen={open} />

            <SidebarGroupLabel title="PAYMENT (PAY)" isOpen={open} />
            <SidebarItem title="Payment Mode" href="/admin/components/pay/paymentmode" icon={<Payment />} isOpen={open} />

            <SidebarGroupLabel title="SECURITY (SEC)" isOpen={open} />
            <SidebarItem title="Roles" href="/admin/components/sec/role" icon={<AdminPanelSettings />} isOpen={open} />
            <SidebarItem title="Users" href="/admin/components/sec/user" icon={<Group />} isOpen={open} />
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', overflowX: 'hidden' }}>
          <DrawerHeader />
          <Fade in={true} timeout={800}>
            <Box>
              {children}
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function SidebarItem({ title, href, icon, isOpen }: { title: string, href: string, icon: React.ReactNode, isOpen: boolean }) {
  return (
    <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
      <Tooltip title={isOpen ? '' : title} placement="right" arrow>
        <ListItemButton
          component={Link}
          href={href}
          sx={{
            minHeight: 48,
            justifyContent: isOpen ? 'initial' : 'center',
            px: 2.5,
            borderRadius: 2,
            mx: 1,
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 2 : 'auto',
              justifyContent: 'center',
              color: 'inherit',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={title} sx={{ opacity: isOpen ? 1 : 0, '& .MuiTypography-root': { fontSize: '0.875rem', fontWeight: 500 } }} />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  )
}

function SidebarGroupLabel({ title, isOpen }: { title: string, isOpen: boolean }) {
  if (!isOpen) return <Divider sx={{ my: 1, mx: 2 }} />;
  return (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        px: 4,
        py: 1.5,
        color: 'primary.main',
        fontWeight: 'bold',
        opacity: 0.8,
        letterSpacing: '0.05em'
      }}
    >
      {title}
    </Typography>
  )
}