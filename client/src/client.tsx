import React, { useState, useEffect } from 'react';
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
    Icon,
    TextField, // Added TextField for better input
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'

interface Message {
    id: number;
    text: string;
}

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#5D88BB',
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

const TypedGridItem: React.FC <any> = Grid;
const openedWidth = 240;
const closedWidth = 60;


function App() {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const toggleDrawer = () => {
        setOpen(prev => !prev);
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch('/messages');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Message[] = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []); // Empty dependency array means this runs once on mount

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (inputValue.trim() === '') {
            return; // Don't send empty messages
        }

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setInputValue(''); // Clear the input field
            fetchMessages(); // Re-fetch messages to update the list
        } catch (error) {
            console.error("Error posting message:", error);
        }
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
                    {open ? <ChevronLeftOutlinedIcon /> : <MenuIcon/>}
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
                                Messages
                            </Typography>
                            <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
                                {messages.length > 0 ? (
                                    <List dense>
                                        {messages.map((message) => (
                                            <ListItem key={message.id}>
                                                <ListItemText primary={message.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No messages yet.
                                    </Typography>
                                )}
                            </Box>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id='textInput'
                                    label='Enter Message'
                                    variant='outlined'
                                    fullWidth
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    sx={{ mb: 1 }}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Send Message
                                </Button>
                            </form>
                        </Box>
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
