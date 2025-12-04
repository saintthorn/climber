import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, ThemeProvider, createTheme } from '@mui/material';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#FDFBD4',
        },
        secondary: {
            main: '#272757',
        },
        // tertiary: {
        //     main: '#D4AF37',
        // },
    },
});

function App() {
    return (
        <div className="App">
            <h1 style={
                { textAlign: 'center' }
            }>
                Hello, World!
            </h1>
            <Button variant="contained" color="secondary">
                Click Me!
            </Button>
        </div>
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