import { Delete, DeleteOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function DeleteButton() {

    return (
        <Box sx={{ position: 'relative', zIndex: 100 }}>
            <Button
                sx={{
                    background:'transparent',
                    transition: 'opacity 0.3s',
                    position: 'relative',
                    '&:hover': { background: '#faa8a840 '}
                }}
                title={"Delete photo"}
            >
               <DeleteOutline
                    sx={{
                        fontSize: 28,
                        color:'error.main',
                         position: 'absolute',
                        
                    }}
                />
                <Delete
                 sx={{
                        fontSize: 26,
                        color:'error.main',
                        
                    }}
                />
            </Button>
        </Box>
    )
}
