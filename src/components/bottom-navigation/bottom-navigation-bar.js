import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import {
    Add,
    AddOutlined,
    Book, BookOnline, BookOnlineOutlined,
    BookOutlined,
    Face,
    FaceOutlined,
    Home,
    HomeOutlined,
    Info,
    InfoOutlined
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {changePath, selectUI} from "../../redux/features/ui/ui-slice";
import {useNavigate} from "react-router";

const BottomNavigationBar = () => {
    const {activePath} = useSelector(selectUI);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event, path) => {
        navigate(path);
        dispatch(changePath(path));
    }

    return (
        <BottomNavigation sx={{
            borderTopWidth: 1,
            borderTopStyle: 'solid',
            borderTopColor: 'divider'
        }}>
            <BottomNavigationAction onClick={() => handleClick('/')} label="Home" icon={activePath === '/' ? (
                <Home
                    onClick={() => handleClick('/')}
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
                    onClick={() => handleClick('/')}
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
            )}/>

            <BottomNavigationAction
                onClick={() => handleClick('/trailer/new')}
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
                            fontSize: 24,
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
                            fontSize: 24
                        }}/>
                )}/>

            <BottomNavigationAction
                onClick={() => handleClick('/books')}
                label="Books"
                icon={activePath === '/books' ? (
                    <BookOnline
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
                    <BookOnlineOutlined
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
                )}/>

        </BottomNavigation>
    )
}

export default BottomNavigationBar;