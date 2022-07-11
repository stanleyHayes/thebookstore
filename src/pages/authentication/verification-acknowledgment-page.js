import {Box, Button, Container, Grid, Stack, Typography, useTheme} from "@mui/material";
import loginLogo from "./../../assets/images/account-success.png";
import "yup-phone";
import {Link} from "react-router-dom";
import Overlay from "../../components/shared/overlay";
import Carousel from "react-material-ui-carousel";
import {THE_BOOK_STORE_DATA} from "../../utils/data";
import BannerSliderItem from "../../components/shared/banner-slider-item";

const VerificationAcknowledgmentPage = () => {

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
                <Container maxWidth="sm">
                    <Typography mb={3} variant="h6" sx={{color: 'text.secondary'}}>
                        Welcome to
                    </Typography>
                    <Typography mb={3} variant="h4" sx={{color: 'secondary.main'}}>
                        The Book Station
                    </Typography>
                    <Typography mb={4} variant="body1" sx={{color: 'text.secondary', fontWeight: 400}}>
                        Need a book ?
                        With Book Station, we provide you with a short trailer of a book and the link to the book next
                        to it. After you watch a trailer, grab your book with ease.
                    </Typography>
                    <Box>
                        <Grid container={true} spacing={2} alignItems="center">
                            <Grid item={true} xs={12} md="auto">
                                <Link to="/auth/register" style={{textDecoration: 'none'}}>
                                    <Button
                                        fullWidth={true}
                                        sx={{
                                            backgroundColor: 'secondary.main',
                                            color: 'white',
                                            borderRadius: 32
                                        }}
                                        variant="contained"
                                        disableElevation={true}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item={true} xs={12} md="auto">
                                <Link to="/auth/login" style={{textDecoration: 'none'}}>
                                    <Button
                                        color="secondary"
                                        fullWidth={true}
                                        sx={{textTransform: 'capitalize', borderRadius: 32}}
                                        variant="outlined"
                                        disableElevation={true}>
                                        Sign In
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Container sx={{mb: 4}}>
                    <Carousel
                        cycleNavigation={true}>
                        {THE_BOOK_STORE_DATA.FEATURES.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <BannerSliderItem item={item}/>
                                </Box>
                            )
                        })}
                    </Carousel>
                </Container>
            </Box>
        </Box>
    )
}

export default VerificationAcknowledgmentPage;