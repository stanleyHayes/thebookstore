import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {changePath} from "../../redux/features/ui/ui-slice";

const NavLink = ({path, label, active}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changePath(path));
    }
    return (
        <Link to={path} onClick={handleClick} style={{textDecoration: 'none'}}>
            <Button
                size="large"
                variant="text"
                sx={{
                    fontSize: 18,
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                    color: active ? 'secondary.main': 'text.secondary',
                    backgroundColor: active ? 'light.secondary': false,
                    textTransform: 'capitalize',
                }}>
                {label}
            </Button>
        </Link>
    )
}

export default NavLink;