import {Button, Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import {Comment, Info, ThumbUpOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Book = ({book, variant}) => {
    return (
        <Card
            sx={{paddingY: 0.1}}
            variant={variant}
            elevation={0}>
            <CardMedia
                src={book.image} component="img"
                sx={{height: 200, objectFit: 'cover', objectPosition: 'center'}}/>

            <CardContent>
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        sx={{textTransform: 'capitalize', color: 'text.primary', fontWeight: 500}}>
                        {book.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                        {book.caption}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider variant="fullWidth"/>
            <CardActionArea sx={{p: 1}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Button
                        color="secondary"
                        size="small"
                        variant="text"
                        sx={{textTransform: 'capitalize'}}
                        startIcon={<ThumbUpOutlined/>}>
                        Like
                    </Button>
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                        <Button
                            color="secondary"
                            size="small"
                            variant="text"
                            sx={{textTransform: 'capitalize'}}
                            startIcon={<Comment color="secondary"/>}>
                            Comment
                        </Button>
                    </Link>
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                        <Button
                            color="secondary"
                            size="small"
                            variant="text"
                            sx={{textTransform: 'capitalize'}}
                            startIcon={<Info color="secondary"/>}>
                            View
                        </Button>
                    </Link>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default Book;