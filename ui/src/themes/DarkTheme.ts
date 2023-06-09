import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#19857b',
        },
        secondary: {
            main: '#D4D6B9',
        },
        error: {
            main: red.A400,
        },
    },
});

export default DarkTheme;