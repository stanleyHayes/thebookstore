import React from "react";
import Layout from "../../components/layout/layout";
import {Box, Container, Stack, Typography} from "@mui/material";
import notFoundImage from "./../../assets/images/404.png";

const NotFoundPage = () => {

    return (
        <Layout>
            <Container sx={{my: 4}}>
                <Box>
                    <Stack justifyContent="center" mb={2} alignItems="center">
                        <img
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: 'auto',
                                height: 350
                            }}
                            src={notFoundImage}
                            alt="Page Not Found"
                            title="Page Not Found"
                        />
                    </Stack>
                    <Typography align="center" mb={2} sx={{color: 'text.primary'}} variant="h2">404</Typography>
                    <Typography mb={2} sx={{color: 'text.primary'}} align="center" variant="h5">
                        Page not found
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}} align="center" variant="body1">
                        The page you requested for could not be found on the server
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}

export default NotFoundPage;
