import Layout from "../../components/layout/layout";
import {Box, Button, Container, Divider, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Team from "../../components/shared/team";
import {GridOn, ListRounded} from "@mui/icons-material";
import * as UI_ACTION_CREATORS from "../../redux/features/ui/ui-slice";
import {selectUI} from "../../redux/features/ui/ui-slice";
import {THE_BOOK_STORE_DATA} from "../../utils/data";
import TeamListItem from "../../components/shared/team-list";
import Overlay from "../../components/shared/overlay";
import {Link} from "react-router-dom";
import banner from "../../assets/images/team.jpg";
import React from "react";

const AboutPage = () => {
    const {viewMode} = useSelector(selectUI);

    const dispatch = useDispatch();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Layout>
            <Overlay
                children={
                    <Box sx={{height: '100%', display: 'flex', alignItems: 'center'}}>
                        <Container>
                            <Grid container={true} spacing={4} alignItems="center">
                                <Grid item={true} xs={12} md={6}>
                                    <Typography variant="h3" sx={{color: 'white', mb: 2}}>
                                        Need a book ?
                                    </Typography>
                                    <Typography variant="h6" sx={{color: 'white', mb: 6}}>
                                        With Book Station, we provide you with a short trailer of a book and the link to the book next to it. After you watch a trailer,  grab your book with ease.
                                    </Typography>
                                    <Link to="/books" style={{textDecoration: 'none'}}>
                                        <Button
                                            sx={{textTransform: 'capitalize', width: {xs: '100%', md: '30%'}}}
                                            variant="contained"
                                            disableElevation={true}
                                            size="large"
                                            color="secondary">
                                            Find books
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>}
                image={banner}
                backgroundColor="#000000"/>
            <Container sx={{py: 4, minHeight: '90vh'}}>
                <Box>
                    <Grid container={true} justifyContent="space-between" spacing={2} alignItems="center">
                        <Grid item={true}>
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Our Team
                            </Typography>
                        </Grid>
                        <Grid item={true}>
                            {viewMode === 'grid' ? (
                                <ListRounded
                                    onClick={() => dispatch(UI_ACTION_CREATORS.toggleViewMode())}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        backgroundColor: 'light.secondary',
                                        padding: 0.5,
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}
                                />
                            ) : (
                                <GridOn
                                    onClick={() => dispatch(UI_ACTION_CREATORS.toggleViewMode())}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        backgroundColor: 'light.secondary',
                                        padding: 0.5,
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}/>
                            )}
                        </Grid>
                    </Grid>
                </Box>

                <Divider variant="fullWidth" sx={{my: 4}} light={true}/>

                <Grid container={true} spacing={2}>
                    {matches ? (
                        THE_BOOK_STORE_DATA.TEAM.map(team => {
                            return (
                                <Grid item={true} key={team._id} xs={12}>
                                    <Team team={team}/>
                                </Grid>
                            )
                        })
                    ) : (
                        viewMode === 'grid' ? (
                            THE_BOOK_STORE_DATA.TEAM.map(team => {
                                return (
                                    <Grid item={true} key={team._id} xs={12} md={6} lg={4}>
                                        <Team team={team}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            THE_BOOK_STORE_DATA.TEAM.map(team => {
                                return (
                                    <Grid item={true} key={team._id} xs={12}>
                                        <TeamListItem team={team}/>
                                    </Grid>
                                )
                            })
                        )
                    )}
                </Grid>
            </Container>
        </Layout>
    )
}

export default AboutPage;