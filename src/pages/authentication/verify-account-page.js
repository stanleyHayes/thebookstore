import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import loginLogo from "./../../assets/images/login-background-smoke.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {LoadingButton} from "@mui/lab";
import Overlay from "../../components/shared/overlay";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const VerifyAccountPage = () => {

    const formik = useFormik({
        initialValues: {
            pin: ''
        },
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            pin: yup.string().required('Pin required'),
        })
    });

    const [showPin, setShowPin] = useState(false);

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
            <Box sx={{display: {xs: 'none', lg: 'block'}, flex: 1, maxHeight: '100vh'}}>
                <Overlay
                    image={
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
                    children={
                        <Box
                            sx={{
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                            }}>
                            <Container>
                                <Typography
                                    sx={{color: 'white'}}
                                    align="center"
                                    variant="h2">
                                    <span style={{color: theme.palette.secondary.main}}>Sons</span>{' '}
                                    and{' '}
                                    <span style={{color: theme.palette.secondary.main}}>Daughters</span>
                                    {' '}of the{' '}
                                    <span style={{color: theme.palette.secondary.main}}>most High</span>
                                </Typography>

                                <Typography
                                    sx={{color: 'white', mb: 2}}
                                    align="center"
                                    variant="h6">
                                    Get as high as your father in heaven.
                                </Typography>
                                <Typography
                                    sx={{color: 'white'}}
                                    align="center"
                                    variant="body1">
                                    Order through Ruderalis
                                </Typography>
                            </Container>
                        </Box>
                    }
                />

            </Box>
            <Box sx={{flex: 1}}>
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
                                            <img
                                                src={logo}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    objectFit: 'contain',
                                                    objectPosition: 'center'
                                                }}
                                                alt="Ruderalis Logo"
                                            />
                                            <Typography
                                                sx={{color: 'text.primary'}}
                                                fontFamily="EuclidCircularA"
                                                variant="h4">Ruderalis</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item={true} md="auto">
                                        <Divider variant="fullWidth" orientation="vertical"/>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'secondary.main'}}>
                                            The safest way to Nevada
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Stack direction="column" spacing={2}>

                                    <Stack direction="row" spacing={2}>
                                        <Typography variant="h3" sx={{color: 'secondary.main'}}>
                                            Verify
                                        </Typography>
                                        <Typography variant="h3" sx={{color: 'text.primary'}}>
                                            Account
                                        </Typography>
                                    </Stack>

                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                        One more step to go!
                                    </Typography>

                                    <Card
                                        elevation={1}
                                        sx={{
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}>
                                        <CardContent>
                                            <Stack direction="column" spacing={2}>
                                                <Box>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel htmlFor="otp">OTP</InputLabel>
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

                                                <LoadingButton
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
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default VerifyAccountPage;