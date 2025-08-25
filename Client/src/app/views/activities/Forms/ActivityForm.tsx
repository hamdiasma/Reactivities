import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form"
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
    } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    })
    // console.log( props);
    const { id } = useParams<{ id: string }>();
    const { updateActvity, createActvity, activity, isLoadinActivity } = useActivities(id);


    useEffect(() => {
        if (activity) reset(activity)
    }, [activity, reset])


    const onSubmit = (data: FieldValues) => {
        console.log(data);
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
                        <SelectInput
                            label="Activity Category"
                            control={control}
                            name="category"
                            items={categoryOptions}
                        />
                        <DateTimeInput
                            label="Activity Date"
                            control={control}
                            name="date"
                        />
                        <LocationInput control={control} name="location" label="Enter the location" />
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


//     data[key] = value.toString();
// });

// if (activity) {
//     data.id = activity.id
//     await updateActvity.mutateAsync(data as unknown as IActivity);
//     navigate(`/activities/${activity.id}`);
// } else {
//      createActvity.mutate(data as unknown as IActivity,{
//         onSuccess: (id) => {
//             navigate(`/activities/${id}`);
//         }
//      } );
// }

// event.preventDefault();
// // Handle form submission logic here
// const formData = new FormData(event.currentTarget);
// //  formData.get('title') as string; // Example of accessing form data
// const data: Record<string, string> = {};
// formData.forEach((value, key) => {