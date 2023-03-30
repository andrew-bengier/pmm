import React from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import LightTheme from "./themes/LightTheme";
import DarkTheme from "./themes/DarkTheme";

import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';

import {ToastContainer} from "react-toastify";
import {BrowserRouter} from 'react-router-dom';

import Header from "./layouts/header/Header";
import SideNav from "./layouts/sideNav/SideNav";
import { getSyncServices } from './services/api/SettingsService';
import { toast } from "react-toastify";

const openSideNavWidth = '240';
const closedSideNavWidth = '64';

function App() {
    const [darkMode, setDarkMode] = React.useState(false);
    const [sideNavOpen, setSideNavOpen] = React.useState(true);

    let snSizeProps = {
        openSideNavWidth,
        closedSideNavWidth,
        sideNavOpen
    };

    function handleSideNavChange() {
        setSideNavOpen(!sideNavOpen);
    }

    function handleThemeToggle(toggle: boolean | ((prevState: boolean) => boolean)) {
      setDarkMode(toggle);
    }

    // [TEST]
    React.useEffect(() => {
        const fetchSyncServices = async () => {
            const response = await toast.promise(
                getSyncServices(),
                {
                    pending: "Retrieving sync services...",
                    success: "Retrieved sycn services",
                    error: "Error retrieving sync services"
                }
            );
            if (response.status === 200) {
                console.log(response.data);
            }
        }

        fetchSyncServices().then();
    }, []);

    return (
        <ThemeProvider theme={ darkMode ? DarkTheme : LightTheme}>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                closeOnClick={true}
                pauseOnFocusLoss={false}
                theme={ darkMode ? "dark" : "colored"}
            />
            <BrowserRouter>
                <Box sx={{ display: 'flex' }}>
                    <Header openSideNavWidth={openSideNavWidth} closedSideNavWidth={closedSideNavWidth} sideNavOpen={sideNavOpen} handleThemeToggle={handleThemeToggle}/>
                    <SideNav sizeProperties={snSizeProps} navRoutes={[]} handleSideNavChange={handleSideNavChange}/>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, backgroundColor: 'background.default', p: 3, paddingTop: '64px',
                            ...(sideNavOpen && {
                            paddingLeft: `${openSideNavWidth}px`
                            }),
                            ...(!sideNavOpen && {
                            paddingLeft: `${closedSideNavWidth}px`
                            })
                        }}
                    >
                        <div>TEST Typescript</div>
                    </Box>
                </Box>
            </BrowserRouter>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default App;
