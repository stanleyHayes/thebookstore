import {
    Box,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import loginLogo from "./../../assets/images/verify-otp.png";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {LoadingButton} from "@mui/lab";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {AUTH_ACTION_CREATORS} from "../../redux/features/auth/auth-slice";
import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";
import {useSnackbar} from "notistack";

const VerifyAccountPage = () => {

    const {token} = useParams();
    console.log(token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.verifyAccount({
                values,
                resetForm,
                setSubmitting,
                navigate,
                showMessage,
                token
            }));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            otp: yup.string().required('OTP required'),
        })
    });

    const [showPin, setShowPin] = useState(false);

    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                overflow: 'hidden'
            }}>
            <Box sx={{display: {xs: 'none', lg: 'block'}, flex: 1, maxHeight: '100vh'}}>
                <Stack justifyContent="center" alignItems="center" sx={{height: '100%'}}>
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
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '100vh',
                    overflowY: {xs: 'scroll', lg: 'hidden'},
                    backgroundColor: 'background.paper'
                }}>
                <Container>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} lg={6}>
                            <Stack direction="column" spacing={2}>

                                <Typography variant="h4" sx={{color: 'secondary.main'}}>
                                    The Book Station
                                </Typography>

                                <Stack mb={2} direction="row" spacing={2}>
                                    <Typography variant="h6" sx={{color: 'secondary.main'}}>
                                        Verify
                                    </Typography>
                                    <Typography variant="h6" sx={{color: 'text.primary'}}>
                                        Account
                                    </Typography>
                                </Stack>

                                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                    One more step to go!
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={4}>
                                        <Box>
                                            <Typography
                                                mb={1} variant="body2"
                                                sx={{color: 'secondary.main', fontWeight: 'bold'}}>
                                                OTP
                                            </Typography>
                                            <FormControl fullWidth={true} variant="outlined">
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    sx={{}}
                                                    value={formik.values.otp}
                                                    id="otp"
                                                    name="otp"
                                                    type={showPin ? 'text' : 'password'}
                                                    helperText={formik.touched.otp && formik.errors.otp}
                                                    error={formik.touched.otp && formik.errors.otp}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter otp"
                                                    required={true}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            {showPin ?
                                                                <VisibilityOff
                                                                    onClick={() => setShowPin(false)}
                                                                    sx={{
                                                                        borderTopRightRadius: 32,
                                                                        borderBottomRightRadius: 0,
                                                                        borderBottomLeftRadius: 32,
                                                                        borderTopLeftRadius: 32,
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        borderRadius: '100%',
                                                                        padding: 1,
                                                                        fontSize: 24,
                                                                    }}
                                                                /> :
                                                                <Visibility
                                                                    onClick={() => setShowPin(true)}
                                                                    sx={{
                                                                        borderTopRightRadius: 32,
                                                                        borderBottomRightRadius: 0,
                                                                        borderBottomLeftRadius: 32,
                                                                        borderTopLeftRadius: 32,
                                                                        cursor: 'pointer',
                                                                        color: 'secondary.main',
                                                                        borderRadius: '100%',
                                                                        padding: 1,
                                                                        fontSize: 24,
                                                                    }}
                                                                />}
                                                        </InputAdornment>
                                                    }
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

                                        <LoadingButton
                                            type="submit"
                                            onClick={formik.handleSubmit}
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
                                            startIcon={formik.isSubmitting ?
                                                <CircularProgress color="secondary"/> : null}
                                            loadingIndicator={formik.isSubmitting ?
                                                <CircularProgress color="secondary"/> : null}
                                            loading={formik.isSubmitting}
                                            fullWidth={true}
                                            variant="contained"
                                            disableElevation={true}>
                                            {formik.isSubmitting ? 'Verifying...' : 'Verify OTP'}
                                        </LoadingButton>
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

export default VerifyAccountPage;