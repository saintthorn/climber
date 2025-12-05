import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
    Box, 
    Grid, 
    Drawer, 
    Toolbar,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CssBaseline, 
    Typography, 
    Button, 
    ThemeProvider, 
    createTheme, 
    Menu,
    Icon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#272757',
        },
        secondary: {
            main: '#D4AF37',
        },
        background: {
            default: '#FAFAFA',
            paper: '#FFFFFF',
        }
        // tertiary: {
        //     main: '#D4AF37',
        // },
    },
});

const drawerWidth = 100;
const TypedGridItem: React.FC <any> = Grid;
const openedWidth = 240;
const closedWidth = 60;


function App() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };
    const DrawerList = (
        <List>
            <ListItem>
                <IconButton>
                    <HomeOutlinedIcon />
                </IconButton>
                {open && <ListItemText primary="Home" sx={{ ml: 2 }} />}
            </ListItem>
            <ListItem>
                <IconButton>
                    <InfoOutlineIcon />
                </IconButton>
                {open && <ListItemText primary="About" sx={{ ml: 2}} />}
            </ListItem>
            {/* Add more items as needed */}
        </List>
    )
    return (
        <Box sx={{ 
            display: 'flex', 
            backgroundColor: 'background.default', 
            minHeight: '100vh',
        }}>
            <CssBaseline/>

            {/* Sidebar (Drawer)*/}
            <Drawer variant='permanent' sx={{
                width: open ? openedWidth : closedWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? openedWidth : closedWidth,
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                    transition: customTheme.transitions.create('width', {
                        easing: customTheme.transitions.easing.sharp,
                        duration: customTheme.transitions.duration.standard,
                    }),
                    backgroundColor: '#EFEFEF',
                    color: 'text.primary',
                },
            }}>
                <IconButton onClick={toggleDrawer} sx={{ ml: 1, my: 1}}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{ p: 0 }}>
                    {DrawerList}
                </Box>
            </Drawer>

            {/* Main Content*/}
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                marginLeft: open ? `${openedWidth}px`: `${closedWidth}px`,
                width: `calc(100% - ${open ? openedWidth : closedWidth}px)`,
                transition: customTheme.transitions.create(['margin', 'width'], {
                    easing: customTheme.transitions.easing.sharp,
                    duration: customTheme.transitions.duration.leavingScreen,
                })
            }}>
                <Grid container spacing={3}>
                    {/* Placeholder for Graph component*/}
                    <TypedGridItem xs={12} component="div">
                        <Box sx={{
                            height: 400,
                            p: 2,
                            boxShadow: 3,
                            borderRadius: 1,
                            backgroundColor: 'background.paper'
                        }}>
                            <Typography variant="h4" gutterBottom>
                                Graph/Chart area
                            </Typography>
                            {/* Actual graphing component*/}
                            <Button variant="contained" color="primary">
                                Main Action
                            </Button>
                        </Box>
                    </TypedGridItem>
                    <TypedGridItem xs={6} component="div">
                        <Typography>Additional data card</Typography>
                    </TypedGridItem>
                </Grid>
            </Box>
        </Box>
    );
}

const container = document.getElementById('root');

if (!container) {
    throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

export default App;