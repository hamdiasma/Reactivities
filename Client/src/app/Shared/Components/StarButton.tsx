import { Star, StarBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

interface Ipropd {
    selected: boolean;
}

export default function StarButton({ selected }: Ipropd) {
    
    return (
        <Box sx={{ position: 'relative', zIndex: 100 }}>
            <Button
                sx={{
                    background:'transparent',
                    transition: 'opacity 0.3s',
                    position: 'relative',
                }}
                title={selected? "Main photo" : "Set as main photo"}
            >
               <StarBorder
                    sx={{
                        fontSize: 32,
                        color: selected? 'gold' :'white',
                    }}
                />
                <Star
                    sx={{
                        fontSize: 28,
                        color: selected ? 'gold' : 'gray',
                        ':hover':{ color:'gold' },
                        position: 'absolute',
                       
                    }}
                />
            </Button>
        </Box>
    )
}
