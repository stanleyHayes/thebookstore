import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    FormControl,
    Grid,
    Input,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BOOKS_ACTION_CREATORS, selectBook} from "../../redux/features/books/book-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import {CloudUpload, Remove} from "@mui/icons-material";
import imageUpload from "./../../assets/images/upload-photo.png";
import videoUpload from "./../../assets/images/upload-video.png";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const CreateBookPage = () => {
    const {bookLoading, bookError} = useSelector(selectBook);
    const {token} = useSelector(selectAuth);
    const [cover, setCover] = useState(undefined);
    const [base64Cover, setBase64Cover] = useState(null);
    const [base64Trailer, setBase64Trailer] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [trailerPreview, setTrailerPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        validationSchema: yup.object().shape({
            name: yup.string().required('Book name required'),
            caption: yup.string().required('Book caption required'),
            category: yup.string().required('Book category required'),
            link: yup.string().required('Book link required'),
            description: yup.string().required('Book description required')
        }),
        initialValues: {
            name: '',
            caption: '',
            category: '',
            link: '',
            description: ''
        },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            dispatch(BOOKS_ACTION_CREATORS.createBook({
                book: {...values, trailer: base64Trailer, image: base64Cover},
                token,
                setSubmitting,
                resetForm,
                navigate,
                setBase64Trailer,
                setBase64Cover,
                setCoverPreview,
                setTrailerPreview,
                showMessage
            }));
        }
    });

    useEffect(() => {
        if (!cover) {
            setCoverPreview(undefined);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(cover);
        reader.onload = () => {
            setBase64Cover(reader.result);
        }

        const coverURL = URL.createObjectURL(cover);
        setCoverPreview(coverURL);

        return () => URL.revokeObjectURL(coverURL);
    }, [cover]);

    useEffect(() => {
        if (!trailer) {
            setTrailerPreview(undefined);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(trailer);
        reader.onload = () => {
            setBase64Trailer(reader.result);
        }
        const trailerURL = URL.createObjectURL(trailer);
        setTrailerPreview(trailerURL);

        return () => URL.revokeObjectURL(trailerURL);
    }, [trailer]);

    const handleCoverSelected = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setCover(undefined);
            return;
        }
        setCover(event.target.files[0]);
    }

    const handleTrailerSelected = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setTrailer(undefined);
            return;
        }
        setTrailer(event.target.files[0]);
    }

    const handleCoverRemoved = () => {
        setCoverPreview(undefined);
        setCover(undefined);
        setBase64Cover(undefined);
    }

    const handleTrailerRemoved = () => {
        setTrailerPreview(undefined);
        setTrailer(undefined);
        setBase64Trailer(undefined);
    }

    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container>

                <Box sx={{py: 4}}>
                    <Grid container={true} spacing={4} justifyContent="space-between">
                        <Grid item={true}>
                            <Typography sx={{color: 'text.primary'}} variant="h4">
                                New Trailer
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider variant="fullWidth" light={true} sx={{my: 4}}/>
                    {bookError && (
                        <Alert severity="error">
                            <AlertTitle>{bookError}</AlertTitle>
                        </Alert>
                    )}

                    <Grid container={true} spacing={4}>
                        <Grid item={true} xs={12} md={3}>
                            <Stack direction="column" spacing={2} justifyContent="space-between" sx={{height: '100%'}}>
                                {coverPreview ? (
                                    <Card
                                        sx={{display: 'flex', flexDirection: 'column'}}
                                        variant="outlined">
                                        <CardMedia
                                            component="img"
                                            sx={{objectFit: 'cover', objectPosition: 'center', flexGrow: 1}}
                                            image={base64Cover}/>
                                        <CardContent>
                                            <Button
                                                onClick={handleCoverRemoved}
                                                color="secondary"
                                                fullWidth={true}
                                                endIcon={<Remove/>}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="outlined"
                                                disableElevation={true}>
                                                Remove Image
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <label
                                        style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1
                                        }}
                                        htmlFor="upload-image">
                                        <Input onChange={handleCoverSelected} sx={{display: 'none'}} id="upload-image"
                                               accept="image/*" type="file"/>
                                        <Card sx={{flex: 1, borderWidth: 2, borderStyle: 'dashed'}}
                                              variant="outlined">
                                            <CardContent>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        objectFit: 'cover',
                                                        objectPosition: 'center',
                                                        mb: 2,
                                                        height: '100%',
                                                        width: '100%'
                                                    }}
                                                    src={imageUpload}/>
                                                <Button
                                                    color="secondary"
                                                    fullWidth={true}
                                                    endIcon={<CloudUpload/>}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }}
                                                    variant="outlined"
                                                    disableElevation={true}>
                                                    Browse book cover
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </label>
                                )}

                                {trailerPreview ? (
                                    <Card sx={{display: 'flex', flexDirection: 'column', flex: 1}}
                                          variant="outlined">
                                        <CardMedia
                                            sx={{flexGrow: 1,}}
                                            muted={true}
                                            controls={true}
                                            autoPlay={true}
                                            allow="autoPlay"
                                            component="video"
                                            src={trailerPreview}
                                        />
                                        <CardContent>
                                            <Button
                                                onClick={handleTrailerRemoved}
                                                color="secondary"
                                                fullWidth={true}
                                                endIcon={<Remove/>}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="outlined"
                                                disableElevation={true}>
                                                Remove Trailer
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <label
                                        style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1
                                        }}
                                        htmlFor="upload-video">
                                        <Input onChange={handleTrailerSelected} sx={{display: 'none'}} id="upload-video"
                                               accept="video/*" type="file"/>
                                        <Card variant="outlined"
                                              sx={{flexGrow: 1, borderWidth: 2, borderStyle: 'dashed'}}>
                                            <CardContent>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        objectFit: 'cover',
                                                        objectPosition: 'center',
                                                        mb: 2,
                                                        height: '100%',
                                                        width: '100%'
                                                    }}
                                                    src={videoUpload}
                                                />
                                                <Button
                                                    color="secondary"
                                                    fullWidth={true}
                                                    endIcon={<CloudUpload/>}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }}
                                                    variant="outlined"
                                                    disableElevation={true}>
                                                    Browse book trailer
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </label>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item={true} xs={12} md={9}>
                            <form onSubmit={formik.handleSubmit}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Stack direction="column" spacing={3}>
                                            <TextField
                                                label="Name"
                                                fullWidth={true}
                                                name="name"
                                                required={true}
                                                variant="outlined"
                                                value={formik.values.name}
                                                error={Boolean(formik.touched.name && formik.errors.name)}
                                                helperText={formik.errors.name}
                                                type="text"
                                                size="medium"
                                                placeholder="Enter book name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            <TextField
                                                label="Affiliate Link"
                                                fullWidth={true}
                                                name="link"
                                                required={true}
                                                variant="outlined"
                                                value={formik.values.link}
                                                error={Boolean(formik.touched.link && formik.errors.link)}
                                                helperText={formik.errors.link}
                                                type="text"
                                                size="medium"
                                                placeholder="Enter book link"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />

                                            <FormControl variant="outlined" fullWidth={true}>
                                                <InputLabel htmlFor="genre">Category</InputLabel>
                                                <Select
                                                    id="genre"
                                                    margin="dense"
                                                    name="category"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    elevation={1}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.category}
                                                    label="Select category"
                                                    variant="outlined">
                                                    <MenuItem value="">Select book category</MenuItem>
                                                    <MenuItem value="action">Action</MenuItem>
                                                    <MenuItem value="adventure">Adventure</MenuItem>
                                                    <MenuItem value="classic">Classic</MenuItem>
                                                    <MenuItem value="comic">Comic</MenuItem>
                                                    <MenuItem value="fantasy">Fantasy</MenuItem>
                                                    <MenuItem value="horror">Horror</MenuItem>
                                                    <MenuItem value="romance">Romance</MenuItem>
                                                    <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                                                    <MenuItem value="thrillers">Thrillers</MenuItem>
                                                    <MenuItem value="crime">Crime</MenuItem>
                                                    <MenuItem value="drama">Drama</MenuItem>
                                                    <MenuItem value="fairytale">Fairytale</MenuItem>
                                                    <MenuItem value="other">Other</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <TextField
                                                label="Caption"
                                                fullWidth={true}
                                                name="caption"
                                                required={true}
                                                variant="outlined"
                                                value={formik.values.caption}
                                                error={Boolean(formik.touched.caption && formik.errors.caption)}
                                                helperText={formik.errors.caption}
                                                type="text"
                                                size="medium"
                                                placeholder="Enter book caption"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                multiline={true}
                                                minRows={2}
                                            />

                                            <TextField
                                                label="Description"
                                                fullWidth={true}
                                                name="description"
                                                required={true}
                                                variant="outlined"
                                                value={formik.values.description}
                                                error={Boolean(formik.touched.description && formik.errors.description)}
                                                helperText={formik.errors.description}
                                                type="text"
                                                size="medium"
                                                placeholder="Enter book description"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                minRows={5}
                                                multiline={true}
                                            />

                                            <Button
                                                onClick={formik.handleSubmit}
                                                type="submit"
                                                color="secondary"
                                                fullWidth={true}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                disabled={bookLoading}
                                                variant="contained"
                                                disableElevation={true}>
                                                {bookLoading ? 'Creating trailer...': 'Create Trailer'}
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Layout>
    )
}

export default CreateBookPage;