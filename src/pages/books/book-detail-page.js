import Layout from "../../components/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import LoadingItem from "../../components/shared/loading-text";
import moment from "moment";
import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {BOOKS_ACTION_CREATORS, selectBook} from "../../redux/features/books/book-slice";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Link as MUILink,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Comment, Delete, Edit, Share, ThumbUp, ThumbUpOutlined} from "@mui/icons-material";
import Comments from "../../components/tabs/comments";
import Empty from "../../components/shared/empty";
import {COMMENTS_ACTION_CREATORS, selectComment} from "../../redux/features/comments/comment-slice";
import {
    countBookLikes,
    hasLikedTrailer,
    LIKES_ACTION_CREATORS,
    selectLike
} from "../../redux/features/likes/like-slice";
import {useSnackbar} from "notistack";

const BookDetailPage = () => {
    const {bookLoading, bookError, bookDetail} = useSelector(selectBook);
    const {likes} = useSelector(selectLike);
    const {commentLoading, commentError, comments} = useSelector(selectComment);

    const {enqueueSnackbar} = useSnackbar();

    const {bookID} = useParams();
    const {authData, token} = useSelector(selectAuth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBook({id: bookID}));
    }, [bookID]);

    useEffect(() => {
        dispatch(COMMENTS_ACTION_CREATORS.getComments({book: bookID}));
    }, [bookID]);

    useEffect(() => {
        dispatch(LIKES_ACTION_CREATORS.getLikes({book: bookID}));
    }, [bookID]);

    const commentFormik = useFormik({
        validationSchema: yup.object().shape({
            text: yup.string().required('Comment required')
        }),
        initialValues: {
            text: ''
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(COMMENTS_ACTION_CREATORS.createComment({
                token,
                comment: {...values, book: bookID},
                resetForm,
                setSubmitting
            }));
        }
    });


    const handleShareClick = () => {
        window.navigator.clipboard.writeText(`View the trailer of the book ${bookDetail?.name} by ${bookDetail?.user?.fullName} using the link https://thebookstation.vercel.app/books/${bookDetail?._id}`).then(() => {
            enqueueSnackbar('Like copied', {variant: 'success'});
        }).catch(error => {
            enqueueSnackbar(error, {variant: 'error'});
        });
    }


    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container maxWidth="xl" sx={{py: 2}}>
                {bookError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{bookError}</AlertTitle>
                    </Alert>
                )}
                <Box sx={{pt: 4}}>
                    <Box sx={{mb: 4, display: 'flex', flexDirection: {xs: 'column', lg: 'row'}}}>
                        <Box sx={{flexBasis: '70%', mr: {xs: 0, lg: 4}, mb: {xs: 4, lg: 0}}}>
                            <Card
                                variant="outlined"
                                sx={{
                                    flex: 1,
                                    mb: 4,
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                }} elevation={0}>
                                <CardMedia
                                    controls={true}
                                    component="video"
                                    image={bookDetail?.trailer?.url}
                                    autoPlay={false}
                                />
                            </Card>

                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="h5" sx={{color: 'text.primary'}}>
                                        {bookDetail?.name}
                                    </Typography>
                                }
                                loading={bookLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />

                            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                            <Grid container={true} alignItems="center" justifyContent="space-between">
                                <Grid item={true}>
                                    <LoadingItem
                                        item={
                                            <MUILink href={bookDetail?.link} underline="none" target="_blank">
                                                <Typography variant="body2" sx={{color: 'secondary.main'}}>
                                                    Purchase Book
                                                </Typography>
                                            </MUILink>
                                        }
                                        loading={bookLoading}
                                        skeleton={<Skeleton variant="text" animation="wave"/>}
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <Typography
                                        variant="body2"
                                        sx={{color: 'text.secondary'}}>
                                        &#8226;
                                    </Typography>
                                </Grid>
                                {authData ? (
                                    <Grid item={true}>
                                        <Button
                                            onClick={() => dispatch(LIKES_ACTION_CREATORS.toggleLike({
                                                token,
                                                book: bookDetail._id
                                            }))}
                                            color="secondary"
                                            size="small"
                                            variant="text"
                                            sx={{textTransform: 'capitalize'}}
                                            startIcon={hasLikedTrailer(likes, authData._id, bookDetail?._id) ?
                                                <ThumbUp/> : <ThumbUpOutlined/>}>
                                            {`${countBookLikes(likes, bookDetail?._id)} Like${countBookLikes(likes, bookDetail?._id) === 1 ? '' : 's'}`}
                                        </Button>
                                    </Grid>

                                ) : (
                                    <Grid item={true}>
                                        <Button
                                            color="secondary"
                                            size="small"
                                            variant="text"
                                            sx={{textTransform: 'capitalize'}}>
                                            {`${bookDetail?.likes.length} Like${bookDetail?.likes.length === 1 ? '' : 's'}`}
                                        </Button>
                                    </Grid>
                                )}
                                <Grid item={true}>
                                    <Typography
                                        variant="body1"
                                        sx={{color: 'text.secondary'}}>
                                        &#8226;
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Button
                                        color="secondary"
                                        size="small"
                                        variant="text"
                                        sx={{textTransform: 'capitalize'}}
                                        startIcon={<Comment color="secondary"/>}>
                                        {`${bookDetail?.comments.length} Comment${bookDetail?.comments.length === 1 ? '' : 's'}`}
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    <Typography
                                        variant="body1"
                                        sx={{color: 'text.secondary'}}>
                                        &#8226;
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    <Button
                                        onClick={handleShareClick}
                                        color="secondary"
                                        size="small"
                                        variant="text"
                                        sx={{textTransform: 'capitalize'}}
                                        startIcon={<Share color="secondary"/>}>
                                        Share
                                    </Button>
                                </Grid>
                                {authData?._id === bookDetail?.user?._id && (
                                    <React.Fragment>
                                        <Grid item={true}>
                                            <Typography
                                                variant="body1"
                                                sx={{color: 'text.secondary'}}>
                                                &#8226;
                                            </Typography>
                                        </Grid>
                                        <Grid item={true}>
                                            <Button
                                                color="secondary"
                                                size="small"
                                                variant="text"
                                                sx={{textTransform: 'capitalize'}}
                                                startIcon={<Edit color="secondary"/>}>
                                                Update
                                            </Button>
                                        </Grid>
                                        <Grid item={true}>
                                            <Typography
                                                variant="body1"
                                                sx={{color: 'text.secondary'}}>
                                                &#8226;
                                            </Typography>
                                        </Grid>
                                        <Grid item={true}>
                                            <Button
                                                color="secondary"
                                                size="small"
                                                variant="text"
                                                sx={{textTransform: 'capitalize'}}
                                                startIcon={<Delete color="secondary"/>}>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                )}
                            </Grid>

                            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {bookDetail?.caption}
                                    </Typography>
                                }
                                loading={bookLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />

                            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {bookDetail?.description}
                                    </Typography>
                                }
                                loading={bookLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />

                            <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                            <Stack mb={2} direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {`Created ${moment(bookDetail?.createdAt).fromNow()}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{color: 'text.secondary'}}>
                                    &#8226;
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{color: 'text.secondary'}}>
                                    {bookDetail?.category}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{color: 'text.secondary'}}>
                                    &#8226;
                                </Typography>

                                <Link to={`/channels/${bookDetail?.user?.username}`} style={{textDecoration: 'none'}}>
                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="body2">
                                        {bookDetail?.user?.fullName}
                                    </Typography>
                                </Link>
                            </Stack>
                        </Box>

                        <Box sx={{flexBasis: '30%'}}>
                            {commentLoading && <LinearProgress variant="query" color="secondary"/>}
                            {commentError && (
                                <Alert sx={{my: 2}} severity="error">
                                    <AlertTitle>{commentError}</AlertTitle>
                                </Alert>
                            )}
                            <Typography
                                size="small"
                                variant="h6"
                                sx={{textTransform: 'capitalize', color: 'text.primary'}}>
                                {`${bookDetail?.comments?.length} Comment${bookDetail?.comments?.length === 1 ? '' : 's'}`}
                            </Typography>
                            <Divider sx={{my: 2}} light={true} variant="fullWidth"/>
                            {authData ? (
                                <form onSubmit={commentFormik.handleSubmit}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="Write a comment"
                                            fullWidth={true}
                                            name="text"
                                            required={true}
                                            variant="outlined"
                                            value={commentFormik.values.text}
                                            error={Boolean(commentFormik.touched.text && commentFormik.errors.text)}
                                            helperText={commentFormik.errors.text}
                                            type="text"
                                            size="medium"
                                            placeholder="Write a comment..."
                                            onChange={commentFormik.handleChange}
                                            onBlur={commentFormik.handleBlur}
                                            multiline={true}
                                            minRows={2}
                                        />
                                        {commentFormik.values.text && (
                                            <Button
                                                type="submit"
                                                fullWidth={true}
                                                size="medium"
                                                variant="outlined"
                                                color="secondary"
                                                disableElevation={true}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}>
                                                Write a Comment
                                            </Button>
                                        )}
                                    </Stack>
                                </form>
                            ) : (
                                <Box>
                                    <Link to={`/auth/login?redirect=/books/${bookDetail?._id}`}
                                          style={{textDecoration: 'none'}}>
                                        <Button
                                            type="submit"
                                            fullWidth={true}
                                            size="medium"
                                            variant="outlined"
                                            color="secondary"
                                            disableElevation={true}
                                            sx={{
                                                textTransform: 'capitalize',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}>
                                            Login to comment
                                        </Button>
                                    </Link>
                                </Box>
                            )}
                            <Stack direction="column" spacing={2} sx={{width: '100%'}}>
                                {bookDetail?.comments?.length === 0 ? (
                                    <Box>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No comments
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to write a comment
                                            </Typography>}
                                        />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Divider sx={{my: 2}} light={true} variant="fullWidth"/>
                                        <Comments comments={comments}/>
                                    </Box>

                                )}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default BookDetailPage;
