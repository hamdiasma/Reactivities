import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import type { IActivity } from "../../../../lib/types";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

interface IProps {
    name?: string;
}

export const ActivityForm = (props :IProps) => {
    // console.log( props);
    const { id } = useParams<{ id: string }>();
    const { updateActvity, createActvity, activity, isLoadinActivity } = useActivities(id);
    const navigate = useNavigate();
    const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(event.currentTarget);
        //  formData.get('title') as string; // Example of accessing form data
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (activity) {
            data.id = activity.id
            await updateActvity.mutateAsync(data as unknown as IActivity);
            navigate(`/activities/${activity.id}`);
        } else {
             createActvity.mutate(data as unknown as IActivity,{
                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                }
             } );
        }
    }

    if (isLoadinActivity) return <div>Loading...</div>;
    if (!activity && id) return <div>Activity not found</div>;
    return (

        <Grid container sx={{ marginTop: '20px', padding: '20px', width: '100%', margin: 'auto' }}>
            <Grid size={{ md: 2 }} width={'100%'}></Grid>
            <Grid size={{ md: 8 }} width={'100%'}>
                <Paper sx={{ padding: 2, borderRadius: 3, marginBottom: 2 }}>
                    <Typography variant="h5" color="primary" align="center" gutterBottom style={{ fontWeight: 'bold',
                        textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px'
                     }}>
                        { props.name } Activity
                    </Typography>
                    {/* Form fields will go here */}
                    <Box component='form' onSubmit={handelSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Example input fields */}
                        <TextField
                            label="Activity Title"
                            variant="outlined"
                            name="title"
                            required
                            fullWidth
                            defaultValue={activity?.title} // Assuming activity is passed as a prop
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Activity Date"
                            type="date"
                            name="date"
                            variant="outlined"
                            required
                            fullWidth
                            defaultValue={activity?.date ?
                                new Date(activity.date).toISOString().split('T')[0]
                                : new Date().toISOString().split('T')[0]
                            }
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Activity Description"
                            variant="outlined"
                            name="description"
                            fullWidth
                            multiline
                            required
                            rows={4}
                            defaultValue={activity?.description}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Category"
                            variant="outlined"
                            name="category"
                            required
                            fullWidth
                            defaultValue={activity?.category}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            name="city"
                            required
                            defaultValue={activity?.city}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Venue"
                            variant="outlined"
                            name="venue"
                            required
                            fullWidth
                            defaultValue={activity?.venue}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
                            <Button color="inherit" onClick={() => { }}>Cancel</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={updateActvity.isPending || createActvity.isPending}
                            >Submit</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}
