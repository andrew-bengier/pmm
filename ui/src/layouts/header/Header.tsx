import * as React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person'

type HeaderProperties = {
    openSideNavWidth: string,
    closedSideNavWidth: string,
    sideNavOpen: boolean,
    handleThemeToggle: Function
}

const Header: React.FC<HeaderProperties> = (props: HeaderProperties) => {
    const [darkMode, setDarkMode] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const changeTheme = (dark: boolean | ((prevState: boolean) => boolean)) => {
        setDarkMode(dark);
        props.handleThemeToggle(dark);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);

        if (setting === 'Dark Mode') {
            changeTheme(!darkMode);
        }
    };

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTheme(event.target.checked);
        setAnchorElUser(null);
    }

    return (
        <AppBar position="fixed" color="primary" enableColorOnDark
            sx={{
                ...(props.sideNavOpen && {
                    width: `calc(100% - ${props.openSideNavWidth}px)`,
                    ml: `${props.openSideNavWidth}px`
                }),
                ...(!props.sideNavOpen && {
                    width: `calc(100% - ${props.closedSideNavWidth}px)`,
                    ml: `${props.closedSideNavWidth}px`
                })
            }}
        >
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                </Box>
                <Box sx={{
                    flexGrow: 0,
                    marginRight: '20px'
                }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <PersonIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key={'Dark Mode'} onClick={() => handleCloseUserMenu('Dark Mode')}>
                            <Switch
                                checked={darkMode}
                                onChange={handleThemeChange}
                                size="small"
                            />
                            <Typography textAlign="center">{'Dark Mode'}</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;