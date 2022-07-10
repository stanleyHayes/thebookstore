import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import BannerSliderItem from "../../components/shared/banner-slider-item";
import {THE_BOOK_STORE_DATA} from "../../utils/data";
import Carousel from "react-material-ui-carousel";

const WelcomePage = () => {
    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                overflow: 'hidden',
                flexDirection: {xs: 'column', lg: 'row'}
            }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    flex: 1,
                    py: {xs: 4, lg: 0},
                    minHeight: '100vh',
                }}>
                <Container maxWidth="sm">
                    <Typography mb={3} variant="h6" sx={{color: 'text.secondary'}}>
                        Welcome to
                    </Typography>
                    <Typography mb={3} variant="h4" sx={{color: 'secondary.main'}}>
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
                </Container>
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

export default WelcomePage;