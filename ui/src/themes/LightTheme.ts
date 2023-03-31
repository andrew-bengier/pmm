import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#5C1EE2',
        },
        secondary: {
            main: '#be1ee2',
        },
        error: {
            main: red.A400,
        },
    },
});

export default LightTheme;