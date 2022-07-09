import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button, Card, CardContent,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    LinearProgress,
    MenuItem,
    Pagination,
    Select,
    Stack,
    TextField,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {BOOKS_ACTION_CREATORS, selectBook} from "../../redux/features/books/book-slice";
import {useEffect, useState} from "react";
import Book from "../../components/shared/book";
import {DarkMode, GridOn, LightMode, ListRounded} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router";
import qs from "query-string";
import {selectUI} from "../../redux/features/ui/ui-slice";
import Empty from "../../components/shared/empty";
import BookList from "../../components/shared/book-list-item";
import {Link} from "react-router-dom";
import * as UI_ACTION_CREATORS from "../../redux/features/ui/ui-slice";


const BooksPage = () => {
    const {books, bookLoading, bookError, count} = useSelector(selectBook);
    const {genres} = useSelector(selectBook);
    const [book, setBook] = useState("");
    const [genre, setRole] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = qs.parse(location.search);

    // useEffect(() => {
    //     dispatch(BOOKS_ACTION_CREATORS.getBooks({}));
    // }, []);
    //
    // useEffect(() => {
    //     dispatch(BOOKS_ACTION_CREATORS.getBooks({query: params['book']}));
    // }, []);
    //
    //
    // useEffect(() => {
    //     dispatch(BOOKS_ACTION_CREATORS.getBooks({query: qs.stringify(params)}));
    // }, [size, book, genre]);
    //

    const handleSearchClick = () => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({query: qs.stringify(params)}));
    }

    const handleBookChange = event => {
        if (event.target.value === "") {
            delete params['book'];

        } else {
            params['book'] = event.target.value;
        }
        setBook(event.target.value);
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleRoleChange = event => {
        if (event.target.value === "") {
            delete params["genre"];
        } else {
            params['genre'] = event.target.value;
        }
        setRole(event.target.value);
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleQueryChange = event => {
        setQuery(event.target.value);
        params['query'] = event.target.value;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handlePageChange = (event, page) => {
        setPage(page);
        params['page'] = page;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
        params['size'] = event.target.value;
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container maxWidth="xl" sx={{py: 4, minHeight: '90vh'}}>
                {bookError && (
                    <Alert severity="error">
                        <AlertTitle>{bookError}</AlertTitle>
                    </Alert>
                )}

                <Box>
                    <Typography variant="h4" sx={{color: 'text.primary'}}>
                        Books
                    </Typography>
                    <Divider variant="fullWidth" sx={{my: 4}} light={true}/>
                </Box>
                <Box>
                    <Card elevation={0}>
                        <CardContent>
                            <Grid container={true} spacing={2} alignItems="center">
                                <Grid item={true} xs={12} md={3}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="book">Select Genre</InputLabel>
                                        <Select
                                            id="genre"
                                            margin="dense"
                                            fullWidth={true}
                                            elevation={1}
                                            color="secondary"
                                            onChange={handleBookChange}
                                            value={genre}
                                            label="Select Book"
                                            variant="outlined">
                                            <MenuItem
                                                value=""
                                                key="">All Books</MenuItem>
                                            {genres?.map(genre => {
                                                return (
                                                    <MenuItem
                                                        value={genre.name}
                                                        key={genre._id}>
                                                        {genre.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} md={3}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="genre">Sort books in</InputLabel>
                                        <Select
                                            id="genre"
                                            margin="dense"
                                            defaultValue={genre}
                                            color="secondary"
                                            fullWidth={true}
                                            elevation={1}
                                            onChange={handleRoleChange}
                                            value={genre}
                                            label="Select Role"
                                            variant="outlined">
                                            <MenuItem value="asc" key="asc">Ascending</MenuItem>
                                            <MenuItem value="desc" key="desc">Descending</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid container={true} item={true} xs={12} md={6} alignItems="center" spacing={2}>
                                    <Grid item={true} xs={12} md={9}>
                                        <TextField
                                            margin="dense"
                                            fullWidth={true}
                                            color="secondary"
                                            onChange={handleQueryChange}
                                            value={query}
                                            variant="outlined"
                                            required={true}
                                            label="Search book"
                                            placeholder="Search book"
                                        />
                                    </Grid>
                                    <Grid item={true} xs={12} md={3}>
                                        <Button
                                            onClick={handleSearchClick}
                                            disableElevation={true}
                                            color="secondary"
                                            size="large"
                                            fullWidth={true}
                                            variant="contained"
                                            sx={{
                                                textTransform: 'capitalize',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}>
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
                <Divider variant="fullWidth" sx={{my: 4}} light={true}/>

                {books?.length === 0 ? (
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
                                            Create Book
                                        </Button>
                                    </Link>
                                </Stack>
                            }/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container={true} spacing={2}>
                        {matches ? (
                            books && books.map(book => {
                                return (
                                    <Grid item={true} key={book._id} xs={12} md={6} lg={4}>
                                        <Book book={book}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            books && books.map(book => {
                                return (
                                    <Grid item={true} key={book._id} xs={12} md={6}>
                                        <BookList book={book}/>
                                    </Grid>
                                )
                            })
                        )}
                    </Grid>
                )}
            </Container>
            {parseInt(`${count / size}`) > 0 && (
                <Container sx={{py: 2}}>
                    <Grid container={true} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={12} md="auto">
                            <Pagination
                                page={page}
                                color="secondary"
                                size="large"
                                shape="circular"
                                count={parseInt(`${count / size}`)}
                                onChange={handlePageChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>Show</Typography>
                                <Select
                                    id="book"
                                    margin="dense"
                                    elevation={1}
                                    size="small"
                                    color="secondary"
                                    onChange={handleSizeChange}
                                    value={size}
                                    label="Select Book"
                                    variant="outlined">
                                    <MenuItem value={10} key={10}>10</MenuItem>
                                    <MenuItem value={20} key={20}>20</MenuItem>
                                    <MenuItem value={50} key={50}>50</MenuItem>
                                </Select>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>per page</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Layout>
    )
}

export default BooksPage;