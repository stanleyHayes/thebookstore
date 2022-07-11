import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {
    Add,
    AddOutlined,
    Face,
    FaceOutlined,
    Home,
    HomeOutlined,
    Videocam,
    VideocamOutlined
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {changePath, selectUI} from "../../redux/features/ui/ui-slice";
import {useLocation, useNavigate} from "react-router";
import {useState} from "react";
import {selectAuth} from "../../redux/features/auth/auth-slice";

const BottomNavigationBar = () => {
    const {activePath} = useSelector(selectUI);
    const {authData} = useSelector(selectAuth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [selectedTab, setSelectedTab] = useState(() => {
        return location?.pathname?.slice(1)
    });

    const handleTabChange = (event, value) => {
        navigate(`/${value}`);
        dispatch(changePath(`/${value}`));
        setSelectedTab(value);
    }

    return (
        <BottomNavigation
            color="secondary"
            defaultValue=""
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
            borderTopWidth: 1,
            borderTopStyle: 'solid',
            borderTopColor: 'divider'
        }}>
            <BottomNavigationAction value=""  label="Home" icon={activePath === '/' ? (
                <Home
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
                <HomeOutlined

                    sx={{
                        cursor: 'pointer',
                        color: 'text.secondary',
                        borderTopRightRadius: 32,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 32,
                        borderTopLeftRadius: 32,
                        padding: 1,
                        fontSize: 18
                    }}/>
            )}/>

            <BottomNavigationAction
                value="trailer/new"
                label="Create"
                icon={activePath === '/trailer/new' ? (
                    <Add
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
                    <AddOutlined
                        sx={{
                            cursor: 'pointer',
                            color: 'text.secondary',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            padding: 1,
                            fontSize: 18
                        }}/>
                )}/>

            <BottomNavigationAction
                label="Trailers"
                value="books"
                icon={activePath === '/books' ? (
                    <Videocam
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
                    <VideocamOutlined
                        sx={{
                            cursor: 'pointer',
                            color: 'text.secondary',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            padding: 1,
                            fontSize: 18
                        }}/>
                )}/>
            {authData && (
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
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
                                fontSize: 18,
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
                                fontSize: 18
                            }}/>
                    )}/>

            )}
        </BottomNavigation>
    )
}

export default BottomNavigationBar;