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
import loginLogo from "./../../assets/images/sign-up.png";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {
    CallOutlined,
    KeyboardArrowLeft,
    MailOutline,
    PersonOutline,
    PersonOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined
} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            pin: '',
            phone: '',
            confirmPassword: '',
            email: ''
        },
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            firstName: yup.string().required('First name required'),
            lastName: yup.string().required('Last name required'),
            username: yup.string().required('username required'),
            email: yup.string().email('Invalid email').required('username required'),
            password: yup.string().required('Password required'),
            pin: yup.string().required('Pin required'),
            confirmPassword: yup.string()
                .required('confirm password required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            phone: yup.string().phone('Enter valid phone number').required('Phone number required')
        })
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);

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
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                    alt=""
                    src={loginLogo}
                />
                }
            </Box>
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                minHeight: '100vh',
                overflowY: {xs: 'scroll'}
            }}>
                {authLoading && <LinearProgress variant="query" color="secondary"/>}
                <Container>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} md={8}>
                                <Box sx={{alignItems: "center", display: 'flex'}} flexGrow={1}>
                                    <form
                                        style={{width: '100%'}}
                                        autoComplete="off"
                                        onSubmit={formik.handleSubmit}>
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

                                            <Box mb={4}>
                                                <Button
                                                    color="secondary"
                                                    size="large"
                                                    sx={{textTransform: 'capitalize'}}
                                                    onClick={() => navigate(-1)}
                                                    variant="text"
                                                    startIcon={<KeyboardArrowLeft/>}>
                                                    Back
                                                </Button>
                                            </Box>

                                            <Typography mb={2} variant="h5" sx={{color: 'text.primary'}}>
                                                Sign Up
                                            </Typography>

                                            <Typography variant="h4" sx={{color: 'secondary.main', mb: 4}}>
                                                The Book Station
                                            </Typography>


                                            <Stack mb={4} direction="row" spacing={2} alignItems="center">
                                                <Typography
                                                    variant="body2"
                                                    sx={{color: 'text.secondary', fontWeight: 500}}>
                                                    Already have an account?
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{color: 'text.secondary', fontWeight: 500}}>
                                                    <Link
                                                        style={{
                                                            color: theme.palette.secondary.main,
                                                            textDecoration: 'none'
                                                        }}
                                                        to="/auth/login">
                                                        Sign In
                                                    </Link>
                                                </Typography>
                                            </Stack>

                                            <Grid mb={4} container={true} spacing={2} alignItems="center">
                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1}
                                                            variant="body2"
                                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                            First Name
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="firstName"
                                                                value={formik.values.firstName}
                                                                name="firstName"
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        <PersonOutlined
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 24,
                                                                            }}
                                                                        />
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.firstName && formik.errors.firstName}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter first name"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.firstName && formik.errors.firstName && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.firstName}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>

                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1} variant="body2"
                                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                            Last Name
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="lastName"
                                                                value={formik.values.lastName}
                                                                name="lastName"
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        <PersonOutlined
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 24,
                                                                            }}
                                                                        />
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.lastName && formik.errors.lastName}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter last name"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.lastName && formik.errors.lastName && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.lastName}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Grid mb={4} container={true} spacing={2} alignItems="center">
                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1}
                                                            variant="body2"
                                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                            Email
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="email"
                                                                value={formik.values.email}
                                                                name="email"
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        <MailOutline
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 24,
                                                                            }}
                                                                        />
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.email && formik.errors.email}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter email"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.email && formik.errors.email && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.email}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>

                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1} variant="body2"
                                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                            Username
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="username"
                                                                value={formik.values.username}
                                                                name="username"
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        <PersonOutline
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 24,
                                                                            }}
                                                                        />
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.username && formik.errors.username}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter username"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.username && formik.errors.username && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.username}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Grid mb={4} container={true} spacing={2} alignItems="center">
                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1}
                                                            variant="body2"
                                                            sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                            Phone
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="phone"
                                                                value={formik.values.phone}
                                                                name="phone"
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        <CallOutlined
                                                                            sx={{
                                                                                cursor: 'pointer',
                                                                                color: 'secondary.main',
                                                                                padding: 1,
                                                                                fontSize: 24,
                                                                            }}
                                                                        />
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.phone && formik.errors.phone}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter phone"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.phone && formik.errors.phone && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.phone}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>

                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1} variant="body2"
                                                            sx={{
                                                                color: 'secondary.main',
                                                                fontWeight: 'bold'
                                                            }}>
                                                            Pin
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="pin"
                                                                value={formik.values.pin}
                                                                name="pin"
                                                                type={showPassword ? 'text' : 'password'}
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        {showPin ?
                                                                            <VisibilityOffOutlined
                                                                                onClick={() => setShowPin(false)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            /> :
                                                                            <VisibilityOutlined
                                                                                onClick={() => setShowPin(true)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            />}
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.pin && formik.errors.pin}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter pin"
                                                                required={true}
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.pin && formik.errors.pin && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.pin}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Grid mb={4} container={true} spacing={2} alignItems="center">
                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1} variant="body2"
                                                            sx={{
                                                                color: 'secondary.main',
                                                                fontWeight: 'bold'
                                                            }}>
                                                            Password
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
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
                                                                            <VisibilityOffOutlined
                                                                                onClick={() => setShowPassword(false)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            /> :
                                                                            <VisibilityOutlined
                                                                                onClick={() => setShowPassword(true)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            />}
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.password && formik.errors.password}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter password"
                                                                required={true}
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
                                                </Grid>

                                                <Grid item={true} xs={12} md={6}>
                                                    <Box>
                                                        <Typography
                                                            mb={1} variant="body2"
                                                            sx={{
                                                                color: 'secondary.main',
                                                                fontWeight: 'bold'
                                                            }}>
                                                            Confirm Password
                                                        </Typography>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <InputLabel htmlFor="password">Confirm Password</InputLabel>
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="confirmPassword"
                                                                value={formik.values.confirmPassword}
                                                                name="confirmPassword"
                                                                type={showPassword ? 'text' : 'password'}
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        position="end">
                                                                        {showPassword ?
                                                                            <VisibilityOffOutlined
                                                                                onClick={() => setShowPassword(false)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            /> :
                                                                            <VisibilityOutlined
                                                                                onClick={() => setShowPassword(true)}
                                                                                sx={{
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            />}
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter confirm password"
                                                                required={true}
                                                                label="Confirm Password"
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.confirmPassword}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <LoadingButton
                                                type="submit"
                                                size="large"
                                                color="secondary"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    py: 1.2,
                                                    mb: 2,
                                                    borderRadius: 24,
                                                    display: 'inline-block',
                                                    width: {
                                                        xs: '100%',
                                                        md: '50%'
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
                                                {authLoading ? 'Creating account...' : 'Create an account'}
                                            </LoadingButton>
                                        </Box>
                                    </form>
                                </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default RegisterPage;