import {Box, Button, Chip, Container, Grid, Stack, Typography} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import {Link} from "react-router-dom";
import BannerSliderItem from "../../components/shared/banner-slider-item";
import {THE_BOOK_STORE_DATA} from "../../utils/data";
import Carousel from "react-material-ui-carousel";

const WelcomePage = () => {
    return (
        <Box sx={{minHeight: '100vh'}}>
            <Container>
                <Grid
                    sx={{minHeight: '100vh'}}
                    justifyContent="space-between"
                    spacing={4}
                    container={true}
                    alignItems="center">
                    <Grid item={true} xs={12} md={6}>
                        <Stack
                            sx={{minHeight: '100vh', paddingY: 8}}
                            direction="column"
                            justifyContent="space-between">
                            <Stack mb={8} spacing={2} direction="row" alignItems="center">
                                <img alt="The Book Store logo" src={logo}
                                     style={{
                                         width: 50,
                                         height: 50,
                                         objectFit: 'cover',
                                         objectPosition: 'center'
                                     }}/>
                                <Typography variant="h4" sx={{color: 'secondary.main'}}>
                                    The Book Store
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                                flexGrow={1}
                                mb={4}>
                                <Box>
                                    <Typography mb={3} variant="h6" sx={{color: 'text.primary'}}>
                                        Welcome to
                                    </Typography>
                                    <Typography mb={3} variant="h4" sx={{color: 'text.primary'}}>
                                        The Book Store
                                    </Typography>
                                    <Typography mb={4} variant="body1" sx={{color: 'text.secondary', fontWeight: 400}}>
                                        The Book Store is a platform that allows you to easily distribute your quality
                                        marijuana, edibles or accessories. You have the ability to create as many shops
                                        as
                                        you please and advertise as many products as you wish. You handle the orders and
                                        delivery of your products to your customers while we give you the ability to
                                        generate report, manage stock and project your revenue all at a minimum fee.
                                        Join
                                        The Book Store now and get access to millions of the sons and daughters of the most
                                        high.
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
                                </Box>
                            </Box>
                            <Box>
                                <Grid sx={{justifyContent: {xs: 'center', md: 'flex-start'}}} container={true}
                                      spacing={2} alignItems="center">
                                    <Grid item={true}>
                                        <Link to="/terms" style={{textDecoration: 'none'}}>
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                Terms of Use
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item={true}>
                                        <Link to="/terms" style={{textDecoration: 'none'}}>
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                Privacy Policy
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item={true}>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            &copy; 2022 All rights reserved
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Box sx={{mb: 4}}>
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
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default WelcomePage;