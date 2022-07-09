import Layout from "../../components/layout/layout";
import {Box, Container, Divider, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Team from "../../components/shared/team";
import {GridOn, ListRounded} from "@mui/icons-material";
import * as UI_ACTION_CREATORS from "../../redux/features/ui/ui-slice";
import {selectUI} from "../../redux/features/ui/ui-slice";
import {THE_BOOK_STORE_DATA} from "../../utils/data";
import TeamListItem from "../../components/shared/team-list";

const AboutPage = () => {
    const {viewMode} = useSelector(selectUI);

    const dispatch = useDispatch();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Layout>

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