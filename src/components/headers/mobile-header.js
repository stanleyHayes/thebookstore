import {Badge, Box, Stack, Toolbar, Typography} from "@mui/material";
import {Add, Menu, Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {openDrawer} from "../../redux/features/ui/ui-slice";
import {useDispatch} from "react-redux";

const MobileHeader = () => {

    const dispatch = useDispatch();

    return (
        <Toolbar variant="regular">
            <Stack sx={{width: '100%'}} direction="row" alignItems="center" justifyContent="space-between">
                <Menu
                    onClick={() => dispatch(openDrawer())}
                    sx={{
                        cursor: 'pointer',
                        color: 'secondary.main',
                        borderTopRightRadius: 32,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 32,
                        borderTopLeftRadius: 32,
                        padding: 0.5,
                        fontSize: 20,
                        backgroundColor: 'light.secondary'
                    }}/>
                <Box>
                    <Link to="/" style={{textDecoration: 'none'}}>
                        <Typography
                            sx={{color: 'text.primary', fontWeight: 'bold'}}
                            variant="body1">The Book Station</Typography>
                    </Link>
                </Box>
                <Badge
                    max={100}
                    badgeContent={999}
                    variant="dot"
                    sx={{color: 'secondary.main'}}>
                    <Notifications
                        sx={{
                            cursor: 'pointer',
                            color: 'secondary.main',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            padding: 0.5,
                            fontSize: 20,
                            backgroundColor: 'light.secondary'
                        }}/>
                </Badge>
            </Stack>
        </Toolbar>
    )
}

export default MobileHeader;