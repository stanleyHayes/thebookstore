import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import loginLogo from "./../../assets/images/dizzy-designer.png";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {KeyboardArrowLeft, MailOutline, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            usernameOrEmailOrPhone: '',
            password: '',
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.login({values, navigate, resetForm, showMessage, setSubmitting}));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            usernameOrEmailOrPhone: yup.string().required('usernameOrEmailOrPhone required'),
            password: yup.string().required('Password required'),
        })
    });

    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();

    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
                overflow: 'hidden'
            }}>
            <Box
                sx={{
                    display: {xs: 'none', lg: 'block'},
                    flex: 1,
                    maxHeight: '100vh',
                    backgroundColor: 'background.default'
                }}>
                <img
                    style={{
                        maxHeight: '100vh',
                        width: '100%',
                        height: '100vh',
                        objectFit: 'contain',
                        objectPosition: 'center'
                    }}
                    alt=""
                    src={loginLogo}
                />
                }
            </Box>
            <Box sx={{flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'background.paper'}}>
                {authLoading && <LinearProgress variant="query" color="secondary"/>}
                <Grid container={true} justifyContent="center">
                    <Grid item={true} xs={12}>
                        <Container>
                            <Stack direction="column" sx={{minHeight: '100vh', py: 4}} justifyContent="space-between">
                                <Box mb={4}>
                                    <Button
                                        size="large"
                                        sx={{textTransform: 'capitalize'}}
                                        onClick={() => navigate(-1)}
                                        variant="text"
                                        startIcon={<KeyboardArrowLeft/>}>
                                        Back
                                    </Button>
                                </Box>
                                <Box sx={{alignItems: "center", display: 'flex'}} flexGrow={1}>
                                    <Container maxWidth="sm">
                                        <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                            <Box>
                                                {authError && (
                                                    <Alert severity="error">
                                                        <AlertTitle>{authError}</AlertTitle>
                                                    </Alert>
                                                )}

                                                {authMessage && (
                                                    <Alert severity="error">
                                                        <AlertTitle>{authMessage}</AlertTitle>
                                                    </Alert>
                                                )}

                                                <Typography mb={2} variant="h5" sx={{color: 'text.secondary'}}>
                                                    Welcome
                                                </Typography>

                                                <Stack mb={4} alignItems="center" direction="row" spacing={2}>
                                                    <Typography variant="h4" sx={{color: 'secondary.main'}}>
                                                        Ruderalis
                                                    </Typography>
                                                    <Chip
                                                        variant="filled"
                                                        label="Vendor"
                                                        sx={{
                                                            backgroundColor: 'light.secondary',
                                                            fontWeight: 'bold',
                                                            color: 'secondary.main'
                                                        }}
                                                    />
                                                </Stack>

                                                <Stack mb={4} direction="row" spacing={2} alignItems="center">
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: 'text.secondary', fontWeight: 500}}>
                                                        Don't have an account?
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{color: 'text.secondary', fontWeight: 500}}>
                                                        <Link
                                                            style={{
                                                                color: theme.palette.secondary.main,
                                                                textDecoration: 'none'
                                                            }}
                                                            to="/auth/register">
                                                            Sign Up
                                                        </Link>
                                                    </Typography>
                                                </Stack>

                                                <Box mb={4}>
                                                    <Typography mb={1} variant="body2"
                                                                sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                        Email
                                                    </Typography>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel
                                                            htmlFor="usernameOrEmailOrPhone">Email</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth={true}
                                                            value={formik.values.usernameOrEmailOrPhone}
                                                            id="usernameOrEmailOrPhone"
                                                            name="usernameOrEmailOrPhone"
                                                            type="text"
                                                            endAdornment={
                                                                <InputAdornment
                                                                    position="end">
                                                                    <MailOutline
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            padding: 1,
                                                                            fontSize: 32,
                                                                        }}
                                                                    />
                                                                </InputAdornment>
                                                            }
                                                            error={formik.touched.usernameOrEmailOrPhone && formik.errors.usernameOrEmailOrPhone}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter username or email or phone"
                                                            required={true}
                                                            label="Email"
                                                            size="medium"
                                                            margin="dense"
                                                        />
                                                        {formik.touched.usernameOrEmailOrPhone && formik.errors.usernameOrEmailOrPhone && (
                                                            <FormHelperText
                                                                error={true}>
                                                                {formik.errors.usernameOrEmailOrPhone}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Box>

                                                <Box mb={4}>
                                                    <Typography mb={1} variant="body2"
                                                                sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                        Password
                                                    </Typography>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel htmlFor="password">Password</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth={true}
                                                            id="password"
                                                            value={formik.values.password}
                                                            name="password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment
                                                                    position="end">
                                                                    {showPassword ?
                                                                        <VisibilityOff
                                                                            onClick={() => setShowPassword(false)}
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 32,
                                                                            }}
                                                                        /> :
                                                                        <Visibility
                                                                            onClick={() => setShowPassword(true)}
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 32,
                                                                            }}
                                                                        />}
                                                                </InputAdornment>
                                                            }
                                                            error={formik.touched.password && formik.errors.password}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter password"
                                                            required={true}
                                                            label="Password"
                                                            size="medium"
                                                            margin="dense"
                                                        />
                                                        {formik.touched.password && formik.errors.password && (
                                                            <FormHelperText
                                                                error={true}>
                                                                {formik.errors.password}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Box>

                                                <Typography mb={4} variant="body2" sx={{color: 'text.secondary'}}>
                                                    <Link
                                                        style={{
                                                            color: theme.palette.secondary.main,
                                                            textDecoration: 'none'
                                                        }}
                                                        to="/auth/forgot-password">
                                                        I forgot my password
                                                    </Link>
                                                </Typography>

                                                <LoadingButton
                                                    type="submit"
                                                    size="large"
                                                    color="primary"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        py: 1.2,
                                                        mb: 2,
                                                        borderRadius: 32,
                                                        display: 'inline-block',
                                                        width: {
                                                            xs: '100%',
                                                            md: '30%'
                                                        }
                                                    }}
                                                    fullWidth={false}
                                                    loadingPosition="start"
                                                    startIcon={authLoading ?
                                                        <CircularProgress color="secondary"/> : null}
                                                    loadingIndicator={authLoading ?
                                                        <CircularProgress color="secondary"/> : null}
                                                    loading={authLoading}
                                                    variant="contained"
                                                    disableElevation={true}>
                                                    {authLoading ? 'Signing In...' : 'Sign In'}
                                                </LoadingButton>
                                            </Box>
                                        </form>
                                    </Container>
                                </Box>
                                <Typography align="center" variant="body2" sx={{color: 'text.primary'}}>
                                    By registering, you agree to our {' '}
                                    <Link
                                        style={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: 'none'
                                        }} to="/terms">Terms of Service</Link>,{' '}
                                    <Link
                                        style={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: 'none'
                                        }} to="/privacy">Privacy
                                        Policy</Link> {' '} and our {' '}
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: theme.palette.secondary.main
                                        }} to="/acceptable-use-policy">
                                        Acceptable Use Policy
                                    </Link>
                                </Typography>
                            </Stack>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default LoginPage;