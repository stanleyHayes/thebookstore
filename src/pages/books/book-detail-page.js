import Layout from "../../components/layout/layout";
import {Alert, AlertTitle, Container, LinearProgress, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectBook} from "../../redux/features/books/book-slice";
import {useParams} from "react-router";

const BookDetailPage = () => {
    const {bookDetail, bookLoading, bookError} = useSelector(selectBook);

    const {bookID} = useParams();

    return (
        <Layout>
            {bookLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container>
                <Typography variant="h4" align="center">
                    Book Detail
                </Typography>
                {bookError && (
                    <Alert severity="error">
                        <AlertTitle>{bookError}</AlertTitle>
                    </Alert>
                )}
            </Container>
        </Layout>
    )
}

export default BookDetailPage;