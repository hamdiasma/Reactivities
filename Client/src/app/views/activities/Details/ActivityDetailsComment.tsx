import { Avatar, Box, Button, Chip, CircularProgress, IconButton, TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router'
import { timeAgo } from '../../../../lib/util/util'
import { useEffect, useState } from 'react'
import { useAccount } from '../../../../lib/hooks/useAccount'
import { useForm, type FieldValues } from 'react-hook-form'
import SendIcon from "@mui/icons-material/Send";

interface IProps {
    comment: ChatComment;
    commentStore: CommentStore;
}

export default function ActivityDetailsComment({ comment, commentStore }: IProps) {
    const [editShow, setEditShow] = useState<boolean>(false)
    const { currentUser } = useAccount()
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (editShow) {
            reset({ body: comment.body })
        }
    }, [editShow, comment.body, reset])


    const handleDeleteComment = async() => {
        console.log(comment.id);
       
     try {
            await commentStore.hubConnection?.invoke('DeleteComment', {
                userId: comment.userId,
                commentId: comment.id,
                activityId: id,
            }) // SendComment in signalR server
            reset()
            setEditShow(false) // close edit mode after update
        } catch (error) {
            console.log(error)
        }

    }
    const handleEditComment = async (data: FieldValues) => {
        
        try {
            await commentStore.hubConnection?.invoke('EditComment', {
                body: data.body, // le champ du formulaire est "comment"
                userId: comment.userId,
                commentId: comment.id,
                activityId: id,
            }) // SendComment in signalR server
            reset()
            setEditShow(false) // close edit mode after update
        } catch (error) {
            console.log(error)
        }
    }

    const handelKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(handleEditComment)()
        }
    }
  
    return (
        <>
            <Box sx={{ display: 'flex', my: 2, }}>
                <Avatar src={comment.imageUrl} alt={comment.displayName + '_image'} sx={{ mr: 2 }} />
                <Box display='flex' flexDirection='column' maxWidth={"100%"} sx={{ width: '90%' }}>
                    <Box display='flex' alignItems='center' gap={3}>
                        <Typography
                            component={Link}
                            to={`/profiles/${comment.userId}`}
                            variant="subtitle1"
                            sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                        >
                            {comment.displayName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {timeAgo(comment.createdAt)}
                        </Typography>
                    </Box>

                    {editShow ? (
                        <form style={{ width: '100%' }} onSubmit={handleSubmit(handleEditComment)}>
                            <TextField
                                {...register('body', { required: true })}
                                variant="outlined"
                                fullWidth
                                multiline
                                onKeyDown={handelKeyPress}
                                InputProps={{
                                    endAdornment: isSubmitting ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <IconButton type="submit" edge="end" size="medium">
                                            <SendIcon color="primary" />
                                        </IconButton>
                                    )
                                }}
                            />
                        </form>
                    ) : (
                        <Typography
                            sx={{
                                p: 1,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word' // wrap long words
                            }}
                        >
                            {comment.body}
                        </Typography>
                    )}
                </Box>
            </Box>
                <Box display={'flex'} justifyContent={'flex-end'} mr={2}>
                  { (comment?.updateAt.toString() != "0001-01-01T00:00:00") &&  <Chip
                    sx={{ borderRadius: 1 }}
                    color="info"
                    label="Updated!"
                    variant='outlined'
                   />}
                    {comment.userId === currentUser?.id && (<>
                    <Typography
                        component={Button}
                        variant='body2'
                        color='primary'
                        type="button"
                        onClick={() => setEditShow(!editShow)}
                    >
                        {editShow ? 'cancel' : 'edit'}
                    </Typography>
                    <Typography
                        component={Button}
                        variant='body2'
                        color='error'
                        type='button'
                        onClick={handleDeleteComment}
                    >
                        delete
                    </Typography>
                     </>)}
                </Box>
        </>
    )
}