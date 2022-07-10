import {Avatar, Box, Button, Divider, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, selectUI, toggleTheme} from "../../redux/features/ui/ui-slice";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import SidebarLink from "../shared/sidebar-link";

import {
    Book,
    BookOnline,
    ChevronRight,
    Close,
    DarkMode,
    DeleteForever,
    Edit,
    EditOutlined,
    ExitToApp,
    Face,
    FaceOutlined,
    Home,
    HomeOutlined,
    Info,
    InfoOutlined,
    LightMode,
    Lock,
    LockOutlined,
    Settings,
    SettingsOutlined
} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import {Link} from "react-router-dom";

const SidebarContent = () => {

    const {activePath, themeVariant} = useSelector(selectUI);
    const {authData} = useSelector(selectAuth);

    const dispatch = useDispatch();

    return (
        <Box sx={{minHeight: '100vh', minWidth: "80vw", py: 3}}>
            <Stack divider={<Divider variant="fullWidth"/>} direction="column" spacing={2}>
                <Stack sx={{px: 4}} direction="row" alignItems="center" justifyContent="space-between">
                    {themeVariant === 'light' ? (
                        <DarkMode
                            onClick={() => dispatch(toggleTheme())}
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                padding: 1,
                                fontSize: 18,
                                backgroundColor: 'light.secondary'
                            }}/>
                    ) : (
                        <LightMode
                            onClick={() => dispatch(toggleTheme())}
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                padding: 1,
                                fontSize: 18,
                                backgroundColor: 'light.secondary'
                            }}/>
                    )}

                    <Close
                        onClick={() => dispatch(closeDrawer())}
                        sx={{
                            cursor: 'pointer',
                            color: 'secondary.main',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            padding: 1,
                            fontSize: 18,
                            backgroundColor: 'light.secondary'
                        }}/>

                </Stack>
                <Stack sx={{px: 4}} direction="column" spacing={1}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            backgroundColor: 'light.secondary'
                        }}>
                        <Typography sx={{color: 'secondary.main'}} variant="h2">{UTILS.getInitials(authData.fullName)}</Typography>
                    </Avatar>
                    <Typography sx={{color: 'text.primary'}} variant="h6">{authData.fullName}</Typography>
                    <Typography sx={{color: 'text.primary'}} variant="body2">{authData.username}</Typography>
                </Stack>
                <Stack direction="column">
                    <SidebarLink
                        active={activePath === '/'}
                        label="Home"
                        path="/"
                        icon={activePath === '/' ? (
                            <Home
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <HomeOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )}
                    />

                    <SidebarLink
                        active={activePath === '/books'}
                        label="Books"
                        path="/books"
                        icon={activePath === '/books' ? (
                            <Book
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <BookOnline
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                    <SidebarLink
                        active={activePath === '/about'}
                        label="About"
                        path="/about"
                        icon={activePath === '/about' ? (
                            <Info
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <InfoOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                </Stack>
                <Stack direction="column">
                    <Link to="/trailer/new" style={{textDecoration: 'none', marginLeft: 8, marginRight: 8}}>
                        <Button
                            color="secondary"
                            fullWidth={true}
                            sx={{textTransform: 'capitalize',
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                            }}
                            variant="contained"
                            disableElevation={true}>
                            Create Trailer
                        </Button>
                    </Link>
                </Stack>
                <Stack direction="column">

                    <SidebarLink
                        active={activePath === '/profile'}
                        label="Profile"
                        path="/profile"
                        icon={activePath === '/profile' ? (
                            <Face
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <FaceOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />

                    <SidebarLink
                        active={activePath === '/settings'}
                        label="Settings"
                        path="/"
                        icon={activePath === '/settings' ? (
                            <Settings
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <SettingsOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                </Stack>
                <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button
                            size="large"
                            sx={{
                                px: 3,
                                justifyContent: 'flex-start',
                                color: 'secondary.main',
                                textTransform: 'capitalize'
                            }}
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <ExitToApp
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                        padding: 1,
                                        fontSize: 24,
                                        backgroundColor: 'light.secondary'
                                    }}/>}>
                            Logout
                        </Button>

                        <ChevronRight
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderRadius: '1%',
                                padding: 1,
                                fontSize: 24,
                            }}/>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button
                            size="large"
                            sx={{
                                px: 3,
                                justifyContent: 'flex-start',
                                color: red[800],
                                textTransform: 'capitalize'
                            }}
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <DeleteForever
                                    sx={{
                                        cursor: 'pointer',
                                        color: red[800],
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                        padding: 1,
                                        fontSize: 24,
                                        backgroundColor: red[100]
                                    }}/>}>
                            Disable Account
                        </Button>
                        <ChevronRight
                            sx={{
                                cursor: 'pointer',
                                color: red[800],
                                borderRadius: '1%',
                                padding: 1,
                                fontSize: 24,
                            }}/>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SidebarContent;