import Layout from "../../components/layout/layout";
import {Alert, AlertTitle, Box, Button, Container, Grid, LinearProgress, Stack, Typography} from "@mui/material";
import Overlay from "../../components/shared/overlay";
import banner from "./../../assets/images/banner.jpg";
import Book from "../../components/shared/book";
import {useSelector} from "react-redux";
import {selectBook} from "../../redux/features/books/book-slice";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {UTILS} from "../../utils/utils";
import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React from "react";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import Empty from "../../components/shared/empty";

const HomePage = () => {

    const {
        books,
        bookLoading,
        bookError,
        actionBooks,
        adventureBooks,
        classicBooks,
        comicBooks,
        fantasyBooks,
        horrorBooks,
        romanceBooks,
        sciFiBooks,
        thrillersBooks,
        crimeBooks,
        dramaBooks,
        fairytaleBooks,
        otherBooks
    } = useSelector(selectBook);
    const {authData} = useSelector(selectAuth);

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
                                                sx={{textTransform: 'capitalize', width: {xs: '100%', md: '30%'}}}
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Action Books
                        </Typography>
                        {actionBooks && actionBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {actionBooks && actionBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Action Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Adventure Books
                        </Typography>
                        {adventureBooks && adventureBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {adventureBooks && adventureBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Adventure Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Classic Books
                        </Typography>

                        {classicBooks && classicBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {classicBooks && classicBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Classic Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Comic Books
                        </Typography>
                        {comicBooks && comicBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {comicBooks && comicBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Comic Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                        {fantasyBooks && fantasyBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {fantasyBooks && fantasyBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Fantasy Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Horror Books
                        </Typography>
                        {horrorBooks && horrorBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {horrorBooks && horrorBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Horror Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Romance Books
                        </Typography>
                        {romanceBooks && romanceBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {romanceBooks && romanceBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Romance Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Action Books
                        </Typography>
                        {sciFiBooks && sciFiBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {sciFiBooks && sciFiBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Sci-Fi Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Thriller Books
                        </Typography>
                        {thrillersBooks && thrillersBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {thrillersBooks && thrillersBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Thriller Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Crime Books
                        </Typography>
                        {crimeBooks && crimeBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {crimeBooks && crimeBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Crime Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Drama Books
                        </Typography>
                        {dramaBooks && dramaBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {dramaBooks && dramaBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Drama Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Fairytale Books
                        </Typography>
                        {fairytaleBooks && fairytaleBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={authData && (
                                            <Stack direction="row" justifyContent="center">
                                                <Link to="/book/new" style={{textDecoration: 'none'}}>
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
                                {fairytaleBooks && fairytaleBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Fairytale Books
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
                        <Typography sx={{color: 'text.primary', mb: 2}} variant="h4" align="center">
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
                            Our Latest Books
                        </Typography>
                        {otherBooks && otherBooks.length === 0 ? (
                            <Box>
                                <Grid container={true} justifyContent="center">
                                    <Grid item={true} xs={12} md={6}>
                                        <Empty
                                            title={
                                                <Typography variant="h4" align="center" sx={{color: 'text.primary'}}>
                                                    No books
                                                </Typography>
                                            } message={
                                            <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                                Be the first to create a book
                                            </Typography>
                                        } button={
                                            authData && (
                                                <Stack direction="row" justifyContent="center">
                                                    <Link to="/book/new?category=other" style={{textDecoration: 'none'}}>
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
                                {otherBooks && otherBooks.map(book => {
                                    return (
                                        <Box key={book._id} sx={{mx: 2}}>
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
                                    size="small"
                                    variant="text"
                                    sx={{textTransform: 'capitalize'}}
                                    endIcon={<KeyboardArrowRight color="secondary"/>}>
                                    View Books
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