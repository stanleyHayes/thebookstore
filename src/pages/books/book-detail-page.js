import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardContent, CardMedia,
    Chip,
    CircularProgress,
    Container,
    Grid,
    LinearProgress,
    Rating,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import LoadingItem from "../../components/shared/loading-text";
import {UTILS} from "../../utils/utils";
import moment from "moment";
import RatingSummary from "../../components/shared/rating-summary";
import {useEffect, useState} from "react";
import Reviews from "../../components/tabs/reviews";
import ReviewForm from "../../components/dialogs/review-form";
import {useFormik} from "formik";
import * as yup from "yup";
import {LoadingButton} from "@mui/lab";
import {useParams} from "react-router";
import {BOOKS_ACTION_CREATORS, selectBook} from "../../redux/features/books/book-slice";
import Comments from "../../components/tabs/comments";
import video from "./../../assets/videos/Egyptian King Mo Salah - Marc Kenny (Lyric Video).mp4";

const BookDetailPage = () => {
    const {bookLoading, bookError, bookDetail} = useSelector(selectBook);
    const {bookID} = useParams();

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

    const formik = useFormik({
        validationSchema: yup.object({
            text: yup.string().max(200, "Can't exceed 200 characters").required('Review required'),
            rating: yup.string().min(0, "Can't go beneath 0").max(5, "Can't exceed 5").required('Review required')
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
        },
        initialValues: {
            text: '',
            rating: '',
        }
    });

    const [selectedTab, setSelectedTab] = useState("comments");
    const handleTabChange = (event, value) => {
        setSelectedTab(value);
    }

    const renderTabs = selectedTab => {
        switch (selectedTab) {
            case 'reviews':
                return <Reviews reviews={bookDetail?.reviews}/>;
            case 'comments':
                return <Comments comments={bookDetail?.comments}/>;
            default:
                return <Comments comments={bookDetail?.comments}/>;
        }
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBook({id: bookID}));
    }, [bookID]);

    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 2}}>
                {bookError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{bookError}</AlertTitle>
                    </Alert>
                )}
                <Box sx={{pt: 4}}>
                    <Grid sx={{mb: 4}} container={true} spacing={4}>
                        <Grid item={true} xs={12} md={6} sx={{width: '100%', height: '100%'}}>
                            <LoadingItem
                                mb={2}
                                item={
                                    <img
                                        src={bookDetail?.image}
                                        title={`${bookDetail?.name} book`}
                                        alt={`${bookDetail?.name} book`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}
                                    />
                                }
                                loading={bookLoading}
                                skeleton={
                                    <Skeleton
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}
                                        variant="rectangular"
                                        animation="wave"
                                    />}
                            />

                            <Card
                                variant="outlined"
                                sx={{
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                }} elevation={0}>
                                <CardMedia
                                    controls={true}
                                    component="video"
                                    image={video}
                                    autoPlay={false}
                                    allowAutoPlay={true}
                                />
                            </Card>

                        </Grid>
                        <Grid item={true} xs={12} md={6}>
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
                            <Stack mb={2} direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {moment(bookDetail.createdAt).fromNow()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{color: 'text.secondary'}}>
                                    &#8226;
                                </Typography>
                                <Chip
                                    sx={{
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        padding: 1,
                                        backgroundColor: 'light.secondary',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}
                                    label={bookDetail.category.toUpperCase()} variant="outlined"/>
                                <Typography
                                    variant="body1"
                                    sx={{color: 'text.secondary'}}>
                                    &#8226;
                                </Typography>
                                <Avatar
                                    sx={{
                                        backgroundColor: 'light.secondary',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}>
                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="h6">
                                        {UTILS.getInitials(bookDetail?.user?.fullName)}
                                    </Typography>
                                </Avatar>
                            </Stack>

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

                            <Grid container={true} spacing={2} mb={2}>
                                <Grid item={true} xs={12} md={6}>
                                    <Button
                                        fullWidth={true}
                                        onClick={() => setReviewDialogOpen(true)}
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        disableElevation={true}
                                        sx={{
                                            textTransform: 'capitalize',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32
                                        }}>
                                        Write a Review
                                    </Button>
                                </Grid>
                                <Grid item={true} xs={12} md={6}>
                                    <Button
                                        fullWidth={true}
                                        onClick={() => setReviewDialogOpen(true)}
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
                                </Grid>
                            </Grid>
                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        {bookDetail && bookDetail.description}
                                    </Typography>
                                }
                                loading={bookLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />

                            <Box>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}>
                                    <CardContent>
                                        <RatingSummary rating={bookDetail?.rating}/>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <Tabs
                            sx={{textTransform: 'capitalize'}}
                            variant="scrollable"
                            color="secondary"
                            indicatorColor="secondary"
                            defaultValue="comments"
                            value={selectedTab}
                            onChange={handleTabChange}>
                            <Tab
                                sx={{textTransform: 'capitalize'}}
                                title="Comments"
                                value="comments"
                                label={`Comments (${bookDetail?.comments?.length})`}/>
                            <Tab
                                sx={{textTransform: 'capitalize'}}
                                title="Reviews"
                                value="reviews"
                                label={`Reviews (${bookDetail?.reviews?.length})`}
                            />
                        </Tabs>
                        <Box sx={{py: 2}}>
                            {renderTabs(selectedTab)}
                        </Box>
                    </Box>
                </Box>
            </Container>

            {reviewDialogOpen && (
                <ReviewForm
                    open={reviewDialogOpen}
                    handleClose={() => setReviewDialogOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h6" sx={{color: 'text.primary'}}>
                                Write a review for {bookDetail?.name}
                            </Typography>
                            <TextField
                                required={true}
                                label="Review"
                                name="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth={true}
                                multiline={true}
                                minRows={4}
                                placeholder="Write a review..."
                                value={formik.values.text}
                                error={formik.touched.text && formik.errors.text}
                                helperText={formik.touched.text && formik.errors.text}
                            />
                            <Box>
                                <Typography variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                    Click or drag to rate
                                </Typography>
                                <Rating
                                    name="rating"
                                    size="large"
                                    onChange={formik.handleChange}
                                    defaultValue={0}
                                    value={Number(formik.values.rating)}
                                    precision={0.1}
                                    max={5}
                                    min={0}
                                    draggable={true}
                                    color="secondary"
                                />
                            </Box>
                            <LoadingButton
                                loading={formik.isSubmitting}
                                loadingPosition="start"
                                loadingIndicator={formik.isSubmitting &&
                                    <CircularProgress color="secondary" size={20}/>}
                                fullWidth={true}
                                onClick={() => setReviewDialogOpen(true)}
                                size="medium"
                                variant="outlined"
                                sx={{
                                    color: 'secondary.main',
                                    textTransform: 'capitalize',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    backgroundColor: 'light.secondary',
                                    py: 1.5
                                }}>
                                Write a Review
                            </LoadingButton>
                        </Stack>
                    </form>
                </ReviewForm>
            )}
        </Layout>
    )
}

export default BookDetailPage;