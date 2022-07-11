import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {Comment, DeleteForever, Edit, Info, MoreHoriz, ThumbUpOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {UTILS} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import ConfirmationDialog from "../dialogs/confirmation-dialog";
import {BOOKS_ACTION_CREATORS} from "../../redux/features/books/book-slice";

const Book = ({book, variant}) => {

    const {authData} = useSelector(selectAuth);

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleMenuOpen = event => {
        setMenuOpen(true);
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    }


    const handleDeleteClick = () => {
        setDialogOpen(true);
    }

    const dispatch = useDispatch();
    const {token} = useSelector(selectAuth);

    return (
        <Card
            sx={{
                paddingY: 0.1,
                borderTopRightRadius: 32,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 32,
                borderTopLeftRadius: 32
            }}
            variant={variant}
            elevation={0}>
            <CardHeader
                title={
                    <Typography variant="body2" sx={{color: 'text.primary'}}>
                        {book.user.fullName}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 500}}>
                        {book.category}
                    </Typography>
                }
                avatar={
                    <Avatar
                        sx={{
                            backgroundColor: 'light.secondary',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            cursor: 'pointer'
                        }}>
                        <Typography
                            sx={{color: 'secondary.main'}}
                            variant="h6">
                            {UTILS.getInitials(book.user.fullName)}
                        </Typography>
                    </Avatar>
                }
                action={authData._id === book.user._id && (
                    <MoreHoriz
                        color="secondary"
                        onClick={handleMenuOpen}
                        sx={{
                            backgroundColor: 'light.secondary',
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32
                        }}/>
                )}
            />
            <CardMedia
                src={book.image.url}
                component="img"
                sx={{height: 200, objectFit: 'cover', objectPosition: 'center'}}
            />

            <CardContent>
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        sx={{textTransform: 'capitalize', color: 'text.primary', fontWeight: 500}}>
                        {book.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                        {book.caption}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider variant="fullWidth"/>
            <CardActionArea sx={{p: 1}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Button
                        color="secondary"
                        size="small"
                        variant="text"
                        sx={{textTransform: 'capitalize'}}
                        startIcon={<ThumbUpOutlined/>}>
                        Like
                    </Button>
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                        <Button
                            color="secondary"
                            size="small"
                            variant="text"
                            sx={{textTransform: 'capitalize'}}
                            startIcon={<Comment color="secondary"/>}>
                            Comment
                        </Button>
                    </Link>
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                        <Button
                            color="secondary"
                            size="small"
                            variant="text"
                            sx={{textTransform: 'capitalize'}}
                            startIcon={<Info color="secondary"/>}>
                            View
                        </Button>
                    </Link>
                </Stack>
            </CardActionArea>

            <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleMenuClose} variant="menu" elevation={1}>
                <MenuItem>
                    <Link to="/books/:bookID/update" style={{textDecoration: 'none'}}>
                        <Button
                            size="large"
                            sx={{
                                justifyContent: 'flex-start',
                                color: 'text.primary',
                                textTransform: 'capitalize'
                            }}
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <Edit
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
                            Update Trailer
                        </Button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Button
                        size="large"
                        sx={{
                            justifyContent: 'flex-start',
                            color: 'text.primary',
                            textTransform: 'capitalize'
                        }}
                        fullWidth={true}
                        variant="text"
                        startIcon={
                            <DeleteForever
                                onClick={handleDeleteClick}
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
                        Delete Trailer
                    </Button>
                </MenuItem>
            </Menu>

            {dialogOpen && (
                <ConfirmationDialog
                    onClose={() => setDialogOpen(false)}
                    open={dialogOpen}
                    message={`Are you sure you want to delete ${book.name}?`}
                    handleDelete={() => dispatch(BOOKS_ACTION_CREATORS.deleteBook({
                        id: book._id,
                        token
                    }))}/>
            )}
        </Card>
    )
}

export default Book;