import { Box, Typography, Card, CardContent, TextField, CircularProgress, IconButton, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router";
import { useComments } from "../../../../lib/hooks/useComments";
import { useForm, type FieldValues } from "react-hook-form";
import { observer } from "mobx-react-lite";
import ActivityDetailsComment from "./ActivityDetailsComment";

const ActivityDetailsChats = observer(function ActivityDetailsChats() {
    const { id } = useParams<{ id: string }>()
    const { commentStore } = useComments(id);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const isMobile = useMediaQuery('(max-width:600px)');

    const addComment = async (data: FieldValues) => {

        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body // le champ du formulaire est "comment"
            }) // SendComment in signalR server
            reset()
        } catch (error) {
            console.log(error)
        }
    }


    const handelKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(addComment)()
        }
    }

    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 2
                }}
            >
                <Typography variant="h6">Chat about this event</Typography>
            </Box>
            <Card>
                <CardContent>
                    <div>
                        <form>
                            <TextField
                                {...register('body', { required: true })}
                                variant="outlined"
                                fullWidth
                                multiline
                                placeholder={isMobile
                                    ? "Type your comment"
                                    : "Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                }
                                onKeyDown={handelKeyPress}
                                slotProps={{
                                    input: {
                                        endAdornment: isSubmitting ? <CircularProgress /> : (
                                            <IconButton type="submit" edge="end" sx={{ mr: 2 }} size="medium">
                                                <SendIcon color="primary"  onClick={handleSubmit(addComment)} />
                                            </IconButton>
                                        )
                                    }
                                }}
                            />
                        </form>
                    </div>

                    <Box sx={{ width: "100%", height: 400, overflowY: 'auto', mt: 2 }}>
                        {
                            commentStore.comments.map(comment => (
                                <ActivityDetailsComment key={comment.id} comment={comment} commentStore={commentStore}/>
                            ))
                        }


                    </Box>
                </CardContent>
            </Card>
        </>
    )
})
export default ActivityDetailsChats