import {
    Alert,
    AlertTitle,
    Box,
    Button,
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
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate, useParams} from "react-router";
import loginLogo from "../../assets/images/verify-otp.png";
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";

const VerifyOtpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useParams();
    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.verifyOTP(
                {values, token, navigate, resetForm, showMessage, setSubmitting}
            ));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            otp: yup.string().required('otp required'),
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
                backgroundColor: 'background.default',
                overflow: 'hidden'
            }}>
            {authLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{display: {xs: 'none', lg: 'block'}, flex: 1, maxHeight: '100vh'}}>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{height: '100%'}}>
                    <img
                        style={{
                            maxHeight: '100vh',
                            width: '50%',
                            height: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                        alt=""
                        src={loginLogo}
                    />
                </Stack>
            </Box>
            <Box sx={{flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'background.paper'}}>
                <Container>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} lg={8}>
                            <Stack
                                sx={{py: 4}}
                                direction="column"
                                justifyContent="space-between"
                                spacing={2}>
                                <Grid
                                    spacing={1}
                                    container={true}
                                    alignItems="center">
                                    <Grid item={true} xs={12} md="auto">
                                        <Stack alignItems="center" direction="row" spacing={2}>
                                            <Link to="/" style={{textDecoration: 'none'}}>
                                                <img
                                                    src={logo}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'contain',
                                                        objectPosition: 'center'
                                                    }}
                                                    alt="The Book Station Logo"
                                                />
                                            </Link>
                                            <Link to="/" style={{textDecoration: 'none'}}>
                                                <Typography
                                                    sx={{color: 'text.primary'}}
                                                    variant="h4">The Book Station</Typography>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={2}>
                                        {authLoading && <LinearProgress variant="query" color="secondary"/>}
                                        <Stack direction="column" spacing={2}>
                                            <Stack direction="row" spacing={2}>
                                                <Typography variant="h3" sx={{color: 'secondary.main'}}>
                                                    Verify
                                                </Typography>
                                                <Typography variant="h3" sx={{color: 'text.primary'}}>
                                                    OTP
                                                </Typography>
                                            </Stack>
                                            {authError && (
                                                <Alert
                                                    sx={{
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }} severity="error">
                                                    <AlertTitle>{authError}</AlertTitle>
                                                </Alert>
                                            )}

                                            {authMessage && (
                                                <Alert
                                                    sx={{
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }}
                                                    severity="error">
                                                    <AlertTitle>{authMessage}</AlertTitle>
                                                </Alert>
                                            )}

                                            <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                Enter OTP you received in your email
                                            </Typography>

                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="otp">OTP</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        id="otp"
                                                        value={formik.values.otp}
                                                        name="otp"
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                        }}
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment
                                                                sx={{
                                                                    borderTopRightRadius: 32,
                                                                    borderBottomRightRadius: 0,
                                                                    borderBottomLeftRadius: 32,
                                                                    borderTopLeftRadius: 32
                                                                }}
                                                                position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        onClick={() => setShowPassword(false)}
                                                                        sx={{
                                                                            borderTopRightRadius: 32,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 32,
                                                                            borderTopLeftRadius: 32,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            backgroundColor: 'light.secondary',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        onClick={() => setShowPassword(true)}
                                                                        sx={{
                                                                            borderTopRightRadius: 32,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 32,
                                                                            borderTopLeftRadius: 32,
                                                                            cursor: 'pointer',
                                                                            backgroundColor: 'light.secondary',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                        error={Boolean(formik.touched.otp && formik.errors.otp)}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter otp"
                                                        required={true}
                                                        label="OTP"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.otp && formik.errors.otp && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.otp}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>

                                            {authError && (

                                                <Link
                                                    style={{
                                                        color: theme.palette.secondary.main,
                                                        textDecoration: 'none'
                                                    }}
                                                    to="/auth/otp/resend">
                                                    <Button
                                                        color="secondary"
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                        }}>
                                                        Resend OTP
                                                    </Button>
                                                </Link>
                                            )}

                                            <LoadingButton
                                                type="submit"
                                                size="large"
                                                color="secondary"
                                                sx={{
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    textTransform: 'capitalize',
                                                    py: 1.2
                                                }}
                                                loadingPosition="start"
                                                startIcon={authLoading ?
                                                    <CircularProgress color="secondary"/> : null}
                                                loadingIndicator={authLoading ?
                                                    <CircularProgress color="secondary"/> : null}
                                                loading={authLoading}
                                                fullWidth={true}
                                                variant="contained"
                                                disableElevation={true}>
                                                {authLoading ? 'Submitting...' : 'Submit'}
                                            </LoadingButton>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default VerifyOtpPage;