import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {
    AppBar,
    Box,
    Collapse,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import { PmmRoute } from "../../routes/DefaultRoutes";

type SNSizeProperties = {
    openSideNavWidth: string,
    closedSideNavWidth: string,
    sideNavOpen: boolean
}

type SideNavProperties = {
    sizeProperties: SNSizeProperties,
    navRoutes: Array<PmmRoute>,
    handleSideNavChange: any
}

const SideNav: React.FC<SideNavProperties> = (props: SideNavProperties) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [subRoutesOpen, setSubRoutesOpen] = React.useState([]);

    React.useEffect(() => {
        setSubRoutesOpen(props.navRoutes.map((route) => ({name: route.name, open: false})));
    }, [props.navRoutes]);

    function handleItemClick(route: PmmRoute) {
        let updated = props.navRoutes.map((navRoute) => {
            if (navRoute.name === route.name) {
                return {name: navRoute.name, open: true}
            } else {
                return {name: navRoute.name, open: false}
            }
        });

        setSubRoutesOpen(updated);

        navigate('/' + route['name'].replace(/\s+/g, ''));
    }

    function checkOpenState(routeName: string) {
        let check = subRoutesOpen[subRoutesOpen.findIndex(x => x.name === routeName)];

        if (check !== null && check !== undefined) {
            return check.open;
        } else {
            return false;
        }
    }

    function checkSelected(route: PmmRoute) {
        if (route !== null) {
            return location.pathname.toLowerCase().includes('/' + route['name'].replace(/\s+/g, '').toLowerCase()) || location.pathname.toLowerCase().includes('/' + route['key'].replace(/\s+/g, '').toLowerCase())
        } else {
            return false;
        }
    }

    return (
        <Drawer
            sx={{
                flexShrink: 0,
                ...(props.sizeProperties.sideNavOpen && {
                    width: props.sizeProperties.openSideNavWidth,
                    '& .MuiDrawer-paper': {
                        width: props.sizeProperties.openSideNavWidth,
                        boxSizing: 'border-box',
                    },
                }),
                ...(!props.sizeProperties.sideNavOpen && {
                    width: props.sizeProperties.closedSideNavWidth,
                    '& .MuiDrawer-paper': {
                        width: props.sizeProperties.closedSideNavWidth,
                        boxSizing: 'border-box',
                    },
                })
            }}
            variant="permanent"
            anchor="left"
        >
            <AppBar position="static" color="primary" enableColorOnDark
                sx={{
                    ...(props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.openSideNavWidth}px`
                    }),
                    ...(!props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.closedSideNavWidth}px`
                    })
                }}
            >
                <Container>
                    <Toolbar disableGutters
                             // onClick={props.handleSideNavChange}
                    >
                        {props.sizeProperties.sideNavOpen ?
                            <Box component="span" sx={{
                                    display: 'inline-flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                                onClick={() => navigate('/')}
                            >
                                <ShareIcon fontSize={"large"}/>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{marginLeft: '10px'}}
                                >
                                    PMM
                                </Typography>
                            </Box>
                            :
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                // sx={{
                                //     marginRight: 0,
                                //     ...(props.sizeProperties.sideNavOpen && {
                                //         display: 'none'
                                //     }),
                                // }}
                            >
                                <MenuIcon />
                            </IconButton>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Divider />
            <List
                sx={{
                    ...(props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.openSideNavWidth}px`
                    }),
                    ...(!props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.closedSideNavWidth}px`
                    })
                }}
            >
                {props.navRoutes.filter(route => route['standardNav']).map((route) => (
                    !props.sizeProperties.sideNavOpen ?
                        <ListItemButton key={route['name']} onClick={() => navigate('/' + route['name'].replace(/\s+/g, ''))} >
                            <IconButton
                                color="inherit"
                                edge="start"
                                sx={{
                                    marginLeft: '-3px',
                                    ...(props.sizeProperties.sideNavOpen && {
                                        display: 'none'
                                    }),
                                }}
                            >
                                {route['icon'] ? <route.icon /> : null}
                            </IconButton>
                        </ListItemButton>
                    :
                        // Bottom of list not showing collapse
                        route.subRoutes && route.subRoutes.length > 0 ?
                            <div key={route['name'] + '_div'}>
                                <ListItemButton key={route['name']} onClick={() => handleItemClick(route)} selected={checkSelected(route)} >
                                    <ListItemIcon>
                                        {route['icon'] ? <route.icon/> : null}
                                    </ListItemIcon>
                                    <ListItemText primary={route['name'].replace(/\s+/g, '')}/>
                                </ListItemButton>
                                <Collapse in={checkOpenState(route.name) && checkSelected(route)} timeout="auto" mountOnEnter unmountOnExit>
                                    <List component="div" disablePadding>
                                        {route.subRoutes.map((subRoute) => (
                                            <ListItemButton key={subRoute['name']}
                                                      onClick={() => navigate('/' + route['name'].replace(/\s+/g, '') + '/' + subRoute['name'].replace(/\s+/g, ''))}
                                                      sx={{pl: 4}}
                                                      selected={checkSelected(subRoute)}
                                            >
                                                <ListItemIcon>
                                                    {subRoute['icon'] ? <subRoute.icon/> : null}
                                                </ListItemIcon>
                                                <ListItemText primary={subRoute['name']}/>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                            :
                            <ListItemButton key={route['name']} onClick={() => navigate('/' + route['name'].replace(/\s+/g, ''))}>
                                <ListItemIcon>
                                    {route['icon'] ? <route.icon /> : null}
                                </ListItemIcon>
                                <ListItemText primary={route['name']}/>
                            </ListItemButton>
                ))}
            </List>
            {props.navRoutes.filter(route => !route['standardNav']).length > 0 &&
                <Divider />
            }
            <List
                sx={{
                    ...(props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.openSideNavWidth}px`
                    }),
                    ...(!props.sizeProperties.sideNavOpen && {
                        width: `${props.sizeProperties.closedSideNavWidth}px`
                    })
                }}
            >
                {props.navRoutes.filter(route => !route['standardNav']).map((route) => (
                    !props.sizeProperties.sideNavOpen ?
                        <ListItemButton key={route['name']} onClick={() => navigate('/' + route['name'].replace(/\s+/g, ''))} >
                            <IconButton
                                color="inherit"
                                edge="start"
                                sx={{
                                    marginLeft: '-3px',
                                    ...(props.sizeProperties.sideNavOpen && {
                                        display: 'none'
                                    }),
                                }}
                            >
                                {route['icon'] ? <route.icon /> : null}
                            </IconButton>
                        </ListItemButton>
                    :
                        // Bottom of list not showing collapse
                        route.subRoutes && route.subRoutes.length > 0 ?
                            <div key={route['name'] + '_div'}>
                                <ListItemButton key={route['name']} onClick={() => handleItemClick(route)} selected={checkSelected(route)} >
                                    <ListItemIcon>
                                        {route['icon'] ? <route.icon/> : null}
                                    </ListItemIcon>
                                    <ListItemText primary={route['name'].replace(/\s+/g, '')}/>
                                </ListItemButton>
                                <Collapse in={checkOpenState(route.name) && checkSelected(route)} timeout="auto" mountOnEnter unmountOnExit>
                                    <List component="div" disablePadding>
                                        {route.subRoutes.map((subRoute) => (
                                            <ListItemButton key={subRoute['name']}
                                                            onClick={() => navigate('/' + route['name'].replace(/\s+/g, '') + '/' + subRoute['name'].replace(/\s+/g, ''))}
                                                            sx={{pl: 4}}
                                                            selected={checkSelected(subRoute)}
                                            >
                                                <ListItemIcon>
                                                    {subRoute['icon'] ? <subRoute.icon/> : null}
                                                </ListItemIcon>
                                                <ListItemText primary={subRoute['name']}/>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        :
                            <ListItemButton key={route['name']} onClick={() => navigate('/' + route['name'].replace(/\s+/g, ''))} selected={checkSelected(route)} >
                                <ListItemIcon>
                                    {route['icon'] ? <route.icon /> : null}
                                </ListItemIcon>
                                <ListItemText primary={route['name']}/>
                            </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}

export default SideNav;