import React from "react";
import Layout from "../../components/layout/layout";
import {Box, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import notFoundImage from "./../../assets/images/404.png";

const NotFoundPage = () => {

    return (
        <Layout>
            <Container sx={{my: 4}}>
                <Grid container={true} alignItems="center">
                    <Grid item={true}>
                        <Typography color="text.title" variant="h4">404</Typography>
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" light={true} sx={{my: 4}}/>
                <Box sx={{py: 5, backgroundColor: 'background.paper'}}>
                    <Typography sx={{color: 'secondary.main'}} mb={4} align="center" variant="h4">Page Not Found</Typography>
                    <Stack justifyContent="center" mb={2} alignItems="center">
                        <img
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: 256,
                                height: 256
                            }}
                            src={notFoundImage} alt="Page Not Found" title="Page Not Found"/>
                    </Stack>
                    <Typography sx={{color: 'text.primary'}} align="center" variant="h6">
                        Looks like you lost your way
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}

export default NotFoundPage;