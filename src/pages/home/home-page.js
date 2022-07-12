import Layout from "../../components/layout/layout";
import {Alert, AlertTitle, Box, Button, Container, Grid, LinearProgress, Stack, Typography} from "@mui/material";
import Overlay from "../../components/shared/overlay";
import banner from "./../../assets/images/banner.jpg";
import Book from "../../components/shared/book";
import {useDispatch, useSelector} from "react-redux";
import {BOOKS_ACTION_CREATORS, selectBook, selectBooksByCategory} from "../../redux/features/books/book-slice";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {UTILS} from "../../utils/utils";
import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import Empty from "../../components/shared/empty";

const HomePage = () => {

    const {bookLoading, bookError, books} = useSelector(selectBook);
    const {authData} = useSelector(selectAuth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({}));
    }, []);

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({query: 'categories=other'}));
    }, []);

    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Overlay
                children={
                    <Box sx={{height: '100%', display: 'flex', alignItems: 'center'}}>
                        <Container>
                            <Grid container={true} spacing={4} alignItems="center">
                                <Grid item={true} xs={12} md={6}>
                                    <Typography variant="h3" sx={{color: 'white', mb: 2}}>
                                        The Book Station
                                    </Typography>
                                    <Typography variant="h6" sx={{color: 'white', mb: 6}}>
                                        With Book Station, we provide you with a short trailer of a book and the link to
                                        the book next to it. After you watch a trailer, grab your book with ease.
                                    </Typography>
                                    {authData && (
                                        <Link to="/trailer/new" style={{textDecoration: 'none'}}>
                                            <Button
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    width: {xs: '100%', md: '30%'},
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="contained"
                                                disableElevation={true}
                                                size="large"
                                                color="secondary">
                                                Create Trailer
                                            </Button>
                                        </Link>
                                    )}

                                </Grid>
                            </Grid>
                        </Container>
                    </Box>}
                image={banner}
                backgroundColor="#000000"/>

            {bookError && (
                <Alert severity="error">
                    <AlertTitle>{bookError}</AlertTitle>
                </Alert>
            )}

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Action
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Action Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'action').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No Action book trailers
                                        </Typography>
                                    } message={
                                    <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create an action book trailer
                                    </Typography>
                                } button={
                                    <Stack direction="row" justifyContent="center">
                                        <Link to="/trailer/new?category=thriller" style={{textDecoration: 'none'}}>
                                            <Button
                                                color="secondary"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="contained"
                                                disableElevation={true}>
                                                Create Trailer
                                            </Button>
                                        </Link>
                                    </Stack>
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'action').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}

                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=action`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Action Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Adventure
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Adventure Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'adventure').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No Adventure book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create an adventure book trailer
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/trailer/new?category=adventure"
                                                      style={{textDecoration: 'none'}}>
                                                    <Button
                                                        color="secondary"
                                                        sx={{
                                                            textTransform: 'capitalize',
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                        }}
                                                        variant="contained"
                                                        disableElevation={true}>
                                                        Create Trailer
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'adventure').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}

                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=adventure`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Adventure Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Classic
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Classic Book Trailers
                        </Typography>

                        {books && selectBooksByCategory(books, 'classic').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No Classic book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a classic book trailer
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/trailer/new?category=classic"
                                                      style={{textDecoration: 'none'}}>
                                                    <Button
                                                        color="secondary"
                                                        sx={{
                                                            textTransform: 'capitalize',
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                        }}
                                                        variant="contained"
                                                        disableElevation={true}>
                                                        Create Trailer
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'classic').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=classic`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Classic Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Comic
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Comic Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'comic').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No comic book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a comic book trailer
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/trailer/new?category=comic" style={{textDecoration: 'none'}}>
                                                    <Button
                                                        color="secondary"
                                                        sx={{
                                                            textTransform: 'capitalize',
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                        }}
                                                        variant="contained"
                                                        disableElevation={true}>
                                                        Create Trailer
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'action').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=comic`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Comic Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Fantasy
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Fantasy Books
                        </Typography>
                        {books && selectBooksByCategory(books, 'fantasy').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No fantasy book trailers
                                        </Typography>
                                    } message={
                                    <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create a fantasy book trailer
                                    </Typography>
                                } button={
                                    <Stack direction="row" justifyContent="center">
                                        <Link to="/trailer/new?category=fantasy"
                                              style={{textDecoration: 'none'}}>
                                            <Button
                                                color="secondary"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="contained"
                                                disableElevation={true}>
                                                Create Trailer
                                            </Button>
                                        </Link>
                                    </Stack>
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'fantasy').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=fantasy`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Fantasy Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Horror
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Horror Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'horror').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No horror book trailers
                                        </Typography>
                                    } message={
                                    <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create a horror book trailer
                                    </Typography>
                                } button={
                                    <Stack direction="row" justifyContent="center">
                                        <Link to="/trailer/new?category=horror"
                                              style={{textDecoration: 'none'}}>
                                            <Button
                                                color="secondary"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="contained"
                                                disableElevation={true}>
                                                Create Trailer
                                            </Button>
                                        </Link>
                                    </Stack>
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'horror').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=horror`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Horror Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Romance
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Romance Book Trailer
                        </Typography>
                        {books && selectBooksByCategory(books, 'romance').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No romance book trailer
                                        </Typography>
                                    } message={
                                    <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create a romance book trailer
                                    </Typography>
                                } button={
                                    authData && (
                                        <Stack direction="row" justifyContent="center">
                                            <Link to="/trailer/new?category=romance" style={{textDecoration: 'none'}}>
                                                <Button
                                                    color="secondary"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }}
                                                    variant="contained"
                                                    disableElevation={true}>
                                                    Create Trailer
                                                </Button>
                                            </Link>
                                        </Stack>
                                    )
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'romance').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=romance`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Romance Book Trailer
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Sci-Fi
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Sci-Fi Books
                        </Typography>
                        {books && selectBooksByCategory(books, 'sci-fi').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No sci-fi book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a sci-fi book trailer
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/trailer/new?category=sci-fi"
                                                          style={{textDecoration: 'none'}}>
                                                        <Button
                                                            color="secondary"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }}
                                                            variant="contained"
                                                            disableElevation={true}>
                                                            Create Trailer
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            )
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'sci-fi').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=sci-fi`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Sci-Fi Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Thriller
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Thriller Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'thriller').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No thriller book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a thriller book trailer
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/trailer/new?category=thriller"
                                                          style={{textDecoration: 'none'}}>
                                                        <Button
                                                            color="secondary"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }}
                                                            variant="contained"
                                                            disableElevation={true}>
                                                            Create Trailer
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            )
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'thriller').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=thriller`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Thriller Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Crime
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Crime Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'crime').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No crime book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a crime book trailer
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/trailer/new?category=crime" style={{textDecoration: 'none'}}>
                                                        <Button
                                                            color="secondary"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }}
                                                            variant="contained"
                                                            disableElevation={true}>
                                                            Create Trailer
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            )
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'action').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=crime`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Crime Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Drama
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Drama Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'drama').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No drama book trailers
                                        </Typography>
                                    } message={
                                    <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create a drama book trailer
                                    </Typography>
                                } button={
                                    authData && (
                                        <Stack direction="row" justifyContent="center">
                                            <Link to="/trailer/new?category=drama" style={{textDecoration: 'none'}}>
                                                <Button
                                                    color="secondary"
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                    }}
                                                    variant="contained"
                                                    disableElevation={true}>
                                                    Create Trailer
                                                </Button>
                                            </Link>
                                        </Stack>
                                    )
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'drama').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=drama`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Drama Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Fairytale
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Fairytale Book Trailer
                        </Typography>
                        {books && selectBooksByCategory(books, 'fairytale').length === 0 ? (
                            <Box>
                                <Empty
                                    title={
                                        <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                            No fairytale book trailer
                                        </Typography>
                                    } message={
                                    <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                        Be the first to create a fairytale book trailer
                                    </Typography>
                                } button={authData && (
                                    <Stack direction="row" justifyContent="center">
                                        <Link to="/trailer/new?category=fairytale" style={{textDecoration: 'none'}}>
                                            <Button
                                                color="secondary"
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                                variant="contained"
                                                disableElevation={true}>
                                                Create Trailer
                                            </Button>
                                        </Link>
                                    </Stack>
                                )
                                }/>
                            </Box>
                        ) : (
                            <Carousel
                                style={{paddingBottom: 1}}
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'action').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=fairytale`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Fairytale Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{
                minHeight: '50vh',
                py: 5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.default'
            }}>
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h5" align="center">
                            Other Categories
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                textTransform: 'uppercase'
                            }}
                            variant="body2"
                            align="center">
                            Our Latest Book Trailers
                        </Typography>
                        {books && selectBooksByCategory(books, 'other').length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                                    No book trailers
                                                </Typography>
                                            } message={
                                            <Typography variant="body2" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book trailer
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/trailer/new?category=other" style={{textDecoration: 'none'}}>
                                                        <Button
                                                            color="secondary"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }}
                                                            variant="contained"
                                                            disableElevation={true}>
                                                            Create Trailer
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            )
                                        }/>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Carousel
                                autoPlay={true}
                                autoPlaySpeed={5000}
                                infinite={true}
                                partialVisible={true}
                                keyBoardControl={true}
                                pauseOnHover={true}
                                responsive={UTILS.responsive}>
                                {books && selectBooksByCategory(books, 'other').map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2, height: '100%'}}>
                                            <Book variant="outlined" book={book}/>
                                        </Box>
                                    )
                                })}
                            </Carousel>
                        )}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to={`/books?categories=other`} style={{textDecoration: 'none'}}>
                                <Button
                                    color="secondary"
                                    size="medium"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Book Trailers
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}

export default HomePage;
