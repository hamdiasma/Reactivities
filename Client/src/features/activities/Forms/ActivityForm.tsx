import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import type { IActivity } from "../../../lib/types";

interface IProps {
    selectedActivity?: IActivity
    handelEditCancel: () => void;
    handleSubmitForm: (activity: IActivity) => void;
}

export const ActivityForm = ({ selectedActivity, handelEditCancel, handleSubmitForm }: IProps) => {

    const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
     const formData = new FormData(event.currentTarget);
        //  formData.get('title') as string; // Example of accessing form data
       const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${value}`);
            data[key] = value.toString();
        });
        
        if(selectedActivity) data.id = selectedActivity.id;
        handleSubmitForm(data as unknown as IActivity);
    }
    
    return (
        <Paper sx={{ padding: 2, borderRadius: 3, marginBottom: 2 }}>
            <Typography variant="h5" color="primary" align="center" gutterBottom>
                Create Activity
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
                    defaultValue={selectedActivity?.title} // Assuming activity is passed as a prop
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Activity Date"
                    type="date"
                    name="date"
                    variant="outlined"
                    required    
                    fullWidth
                    defaultValue={selectedActivity?.date && new Date(selectedActivity.date).toISOString().split('T')[0]}
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
                    defaultValue={selectedActivity?.description}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    name="category"
                    required    
                    fullWidth
                    defaultValue={selectedActivity?.category}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    name="city"
                    required    
                    defaultValue={selectedActivity?.city}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Venue"
                    variant="outlined"
                    fullWidth
                    defaultValue={selectedActivity?.venue}
                    InputLabelProps={{ shrink: true }}

                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
                    <Button color="inherit" onClick={handelEditCancel}>Cancel</Button>
                    <Button type="submit" variant="contained" color="success">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
