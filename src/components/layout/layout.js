import {Box, SwipeableDrawer} from "@mui/material";
import Header from "../headers/header";
import SidebarContent from "../sidebar/sidebar-content";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";
import BottomNavigationBar from "../bottom-navigation/bottom-navigation-bar";

const Layout = ({children}) => {

    const {drawerOpen} = useSelector(selectUI);
    const dispatch = useDispatch();

    return (
        <Box sx={{backgroundColor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Box>
                <Header/>
            </Box>
            <Box sx={{maxWidth: '100vw', flex: 1,pb: {xs: 6, md: 0}}}>
                {children}
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: {xs: 'block', md: 'none'}
                }}>
                <BottomNavigationBar/>
            </Box>

            <SwipeableDrawer
                onOpen={() => dispatch(openDrawer())}
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer())}>
                <SidebarContent/>
            </SwipeableDrawer>
        </Box>
    )
}

export default Layout;