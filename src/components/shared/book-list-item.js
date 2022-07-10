import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import {UTILS} from "../../utils/utils";
import {Comment, Info, ThumbUpOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React from "react";

const BookListItem = ({book, variant}) => {
    return (
        <Card elevation={0} variant={variant}>
            <Box sx={{display: 'flex'}}>
                <Box sx={{flexBasis: '30%'}}>
                    <CardMedia
                        src={book.image.url}
                        component="img"
                        sx={{
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',

                        }}
                    />
                </Box>
                <Box sx={{flexBasis: '70%'}}>
                    <Stack sx={{height: '100%'}} direction="column" divider={<Divider variant="fullWidth"/>}>
                        <CardHeader
                            title={
                                <Typography variant="body2" sx={{color: 'text.primary'}}>
                                    {book.user.fullName}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 700}}>
                                    {book.category}
                                </Typography>
                            }
                            avatar={
                                <Avatar
                                    sx={{
                                        backgroundColor: 'light.secondary',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32
                                    }}>
                                    <Typography
                                        sx={{color: 'secondary.main'}}
                                        variant="h6">
                                        {UTILS.getInitials(book.user.fullName)}
                                    </Typography>
                                </Avatar>
                            }/>
                        <CardContent sx={{flex: 1}}>
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
                    </Stack>


                </Box>
            </Box>

        </Card>
    )
}

export default BookListItem;