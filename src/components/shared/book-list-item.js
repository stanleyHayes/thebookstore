import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {UTILS} from "../../utils/utils";
import {
    CommentOutlined,
    DeleteForever,
    Edit,
    MoreHoriz,
    PlaylistAdd,
    ShareOutlined,
    ThumbUp,
    ThumbUpOutlined,
    WatchLater
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import ConfirmationDialog from "../dialogs/confirmation-dialog";
import {BOOKS_ACTION_CREATORS} from "../../redux/features/books/book-slice";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {hasLikedTrailer, LIKES_ACTION_CREATORS, selectLike} from "../../redux/features/likes/like-slice";
import {useSnackbar} from "notistack";

const BookListItem = ({book, variant}) => {

    const {authData} = useSelector(selectAuth);
    const {likes} = useSelector(selectLike);

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const {enqueueSnackbar} = useSnackbar();

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

    const handleShareClick = () => {
        window.navigator.clipboard.writeText(`View the trailer of the book ${book.name} by ${book.user.fullName} using the link https://thebookstation.vercel.app/books/${book._id}`).then(() => {
            enqueueSnackbar('Like copied', {variant: 'success'});
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }

    return (
        <Card sx={{height: '100%'}} elevation={0} variant={variant}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{flexBasis: '30%'}}>
                    <CardMedia
                        src={book.image.url}
                        component="img"
                        sx={{
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',

                        }}
                    />
                </Box>
                <Box sx={{flexBasis: '70%'}}>
                    <Stack sx={{height: '100%'}} direction="column" divider={<Divider variant="fullWidth"/>}>
                        <CardHeader
                            title={
                                <Link style={{textDecoration: 'none'}} to={`/channels/${book.user.username}`}>
                                    <Typography variant="body2" sx={{color: 'text.primary'}}>
                                        {book.user.fullName}
                                    </Typography>
                                </Link>
                            }
                            subheader={
                                <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 700}}>
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
                                        borderTopLeftRadius: 32
                                    }}>

                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="h6">
                                        {UTILS.getInitials(book.user.fullName)}
                                    </Typography>
                                </Avatar>
                            }
                            action={authData && (authData._id === book.user._id && (
                                <MoreHoriz
                                    color="secondary"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        backgroundColor: 'light.secondary',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                        cursor: 'pointer'
                                    }}/>
                            ))}
                        />
                        <CardContent sx={{flex: 1}}>
                            <Stack spacing={1}>
                                <Tooltip title={`Watch  trailer for ${book.name}`}>
                                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                                        <Typography
                                            variant="h6"
                                            sx={{textTransform: 'capitalize', color: 'text.primary', fontWeight: 500}}>
                                            {book.name}
                                        </Typography>
                                    </Link>
                                </Tooltip>
                                <Typography
                                    variant="body2"
                                    sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                                    {book.caption}
                                </Typography>
                            </Stack>
                        </CardContent>
                        <Box sx={{p: 1}}>
                            <Grid container={true} spacing={1} alignItems="center">
                                <Grid item={true}>
                                    <Typography
                                        variant="caption"
                                        sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                                        {`${book?.likes.length} Likes`}
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Typography
                                        variant="body1"
                                        sx={{color: 'text.secondary'}}>
                                        &#8226;
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Typography
                                        variant="caption"
                                        sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                                        {`${book?.comments.length} Comments`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Tooltip title={`Like ${book.name} to appreciate ${book.user.fullName}`}>
                                    <Button
                                        onClick={() => dispatch(LIKES_ACTION_CREATORS.toggleLike({
                                            token,
                                            book: book._id
                                        }))}
                                        color="secondary"
                                        size="small"
                                        variant="text"
                                        sx={{textTransform: 'capitalize'}}
                                        startIcon={hasLikedTrailer(likes, authData._id, book._id) ? <ThumbUp/> : <ThumbUpOutlined/>}>
                                        Like
                                    </Button>
                                </Tooltip>
                                <Tooltip title={`Comment on ${book.name} to appreciate ${book.user.fullName}`}>
                                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                                        <Button
                                            color="secondary"
                                            size="small"
                                            variant="text"
                                            sx={{textTransform: 'capitalize'}}
                                            startIcon={<CommentOutlined color="secondary"/>}>
                                            Comment
                                        </Button>
                                    </Link>
                                </Tooltip>
                                <Tooltip title={`Share ${book.name} if you enjoyed it`}>
                                    <Button
                                        onClick={handleShareClick}
                                        color="secondary"
                                        size="small"
                                        variant="text"
                                        sx={{textTransform: 'capitalize'}}
                                        startIcon={<ShareOutlined color="secondary"/>}>
                                        Share
                                    </Button>
                                </Tooltip>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>

            <Menu
                open={menuOpen}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                variant="menu"
                elevation={1}>
                {authData && (authData._id === book.user._id && (
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
                                            fontSize: 18,
                                        }}/>}>
                                Update Trailer
                            </Button>
                        </Link>
                    </MenuItem>
                ))}
                {authData && (authData._id === book.user._id && (
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
                                        fontSize: 18,
                                    }}/>}>
                            Delete Trailer
                        </Button>
                    </MenuItem>
                ))}
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
                            <WatchLater
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 18,
                                }}/>}>
                        Save to Watch Later
                    </Button>
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
                            <PlaylistAdd
                                onClick={handleDeleteClick}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 18,
                                }}/>}>
                        Save to playlist
                    </Button>
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
                            <ShareOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 18,
                                }}/>}>
                        Share
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

export default BookListItem;
