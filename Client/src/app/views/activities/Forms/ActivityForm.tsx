import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../Shared/Components/TextInput";
import SelectInput from "../../../Shared/Components/SelectInput";
import { categoryOptions } from "./CategoriesOptions";
import DateTimeInput from "../../../Shared/Components/DateTimeInput";
import LocationInput from "../../../Shared/Components/LocationInput";
interface IProps {
    name?: string;
}

export const ActivityForm = (props: IProps) => {
    const {
        handleSubmit,
        control,
        reset,
        setError
    } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    const navigate = useNavigate()
    // console.log( props);
    const { id } = useParams<{ id: string }>();
    const { updateActvity, createActvity, activity, isLoadinActivity } = useActivities(id);

    useEffect(() => {
        if (activity) reset({
            ...activity,
            location:{
                city:activity.city,
                venue:activity.venue,
                langitude:activity.langitude,
                latitude:activity.latitude,
            }
        })
    }, [activity, reset])


    const onSubmit = (data: ActivitySchema) => {
       const {location, ...rest} = data
       const flattenedData = {...rest, ...location}

       try {
        if(activity){
            updateActvity.mutate({...activity, ...flattenedData},{
                onSuccess:()=> navigate(`/activities/${activity.id}`)
            })
        }else{
            createActvity.mutate(flattenedData,{
                onSuccess:(id)=>navigate(`/activities/${id}`),
                onError: (error) => {
                if (Array.isArray(error)) {
                    console.log({error});
                    
                    error.forEach(err => {
                        if (err.includes('Date')) setError('date', {message:err})
                    })
                }
            }
            })
        }
       } catch (error) {
          console.log(error);
       }
    }

    if (isLoadinActivity) return <div>Loading...</div>;
    if (!activity && id) return <div>Activity not found</div>;
    return (

        <Grid container sx={{ marginTop: '20px', padding: '20px', width: '100%', margin: 'auto' }}>
            <Grid size={{ md: 2 }} width={'100%'}></Grid>
            <Grid size={{ md: 8 }} width={'100%'}>
                <Paper sx={{ padding: 2, borderRadius: 3, marginBottom: 2 }}>
                    <Typography variant="h5" color="primary" align="center" gutterBottom style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px'
                    }}>
                        {props.name} Activity
                    </Typography>
                    {/* Form fields will go here */}
                    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Example input fields */}
                        <TextInput
                            label="Activity Title"
                            control={control}
                            name="title" />
                        <TextInput
                            label="Activity Description"
                            control={control}
                            name="description"
                            multiline rows={3} />
                        <Grid container sx={{  width: '100%', gap:3 }} spacing={{ md: 5 }}>
                            <Grid size={{ md: 4 }} width={'100%'}>
                                <SelectInput
                                    label="Activity Category"
                                    control={control}
                                    name="category"
                                    items={categoryOptions}
                                />
                            </Grid>
                            <Grid size={{ md: 2 }} width={'100%'}>
                                <TextInput
                                    label="Participants"
                                    control={control}
                                    name="numberOfParicipate"
                                    type="number"
                                />
                            </Grid>
                            <Grid size={{ md: 6 }} width={'100%'}>
                                <DateTimeInput
                                    label="Activity Date"
                                    control={control}
                                    name="date"
                                />
                            </Grid>
                        </Grid>
                        <LocationInput control={control} name="location" label="Enter the location" />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
                            <Button  color="inherit" onClick={() => navigate(id ?`/activities/${id}`:`/activities`)}>Cancel</Button>
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