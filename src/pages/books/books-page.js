import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
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
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {BOOKS_ACTION_CREATORS, selectBook} from "../../redux/features/books/book-slice";
import {useEffect, useState} from "react";
import Book from "../../components/shared/book";
import {useLocation, useNavigate} from "react-router";
import qs from "query-string";
import Empty from "../../components/shared/empty";
import BookList from "../../components/shared/book-list-item";
import {Link} from "react-router-dom";
import {selectCategory} from "../../redux/features/categories/category-slice";


const BooksPage = () => {
    const {books, bookLoading, bookError, count} = useSelector(selectBook);
    const {categories} = useSelector(selectCategory);
    const [category, setCategory] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [order, setOrder] = useState('desc');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const params = qs.parse(location.search);

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({}));
    }, []);

    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({query: params['book']}));
    }, []);


    useEffect(() => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({query: qs.stringify(params)}));
    }, [size, category]);

    const handleSearchClick = () => {
        dispatch(BOOKS_ACTION_CREATORS.getBooks({query: qs.stringify(params)}));
    }

    const handleOrderChange = event => {
        if (event.target.value === "") {
            delete params['order'];

        } else {
            params['order'] = event.target.value;
        }
        setOrder(event.target.value);
        navigate({pathname: location.pathname, search: qs.stringify(params)});
    }

    const handleCategoryChange = event => {
        if (event.target.value === "") {
            delete params["category"];
        } else {
            params['category'] = event.target.value;
        }
        setCategory(event.target.value);
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
                    <Grid container={true} spacing={2} justifyContent="space-between">
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Trailers
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Link to="/trailer/new" style={{textDecoration: 'none'}}>
                                <Button
                                    fullWidth={true}
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
                        </Grid>
                    </Grid>

                    <Divider variant="fullWidth" sx={{my: 4}} light={true}/>
                </Box>
                <Box>
                    <Card
                        sx={{
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                        }} variant="outlined">
                        <CardContent>
                            <Grid container={true} spacing={2} alignItems="center">
                                <Grid item={true} xs={12} md={3}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="category">Select Category</InputLabel>
                                        <Select
                                            id="category"
                                            margin="dense"
                                            fullWidth={true}
                                            elevation={1}
                                            color="secondary"
                                            onChange={handleCategoryChange}
                                            value={category}
                                            label="Select Category"
                                            variant="outlined">
                                            <MenuItem
                                                value=""
                                                key="">All Books</MenuItem>
                                            {categories?.map(category => {
                                                return (
                                                    <MenuItem
                                                        value={category.name}
                                                        key={category._id}>
                                                        {category.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={12} md={3}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <InputLabel htmlFor="order">Sort order</InputLabel>
                                        <Select
                                            id="order"
                                            margin="dense"
                                            defaultValue={order}
                                            color="secondary"
                                            fullWidth={true}
                                            elevation={1}
                                            onChange={handleOrderChange}
                                            value={order}
                                            label="Select Order"
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
                                            label="Search trailer"
                                            placeholder="Search trailer"
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
                                    <Typography variant="h5" align="center" sx={{color: 'text.primary'}}>
                                        No books
                                    </Typography>
                                } message={
                                <Typography variant="body1" align="center" sx={{color: 'text.secondary'}}>
                                    Be the first to create a trailer
                                </Typography>
                            } button={
                                <Stack direction="row" justifyContent="center">
                                    <Link to="/trailer/new" style={{textDecoration: 'none'}}>
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
                ) : (
                    <Grid container={true} spacing={2}>
                        {matches ? (
                            books && books.map(book => {
                                return (
                                    <Grid item={true} key={book._id} xs={12} md={6} lg={4}>
                                        <Book variant="outlined" book={book}/>
                                    </Grid>
                                )
                            })
                        ) : (
                            books && books.map(book => {
                                return (
                                    <Grid item={true} key={book._id} xs={12} md={6}>
                                        <BookList variant="outlined" book={book}/>
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
