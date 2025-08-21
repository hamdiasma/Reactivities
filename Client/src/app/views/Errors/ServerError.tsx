import { Divider, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router'

function ServerError() {
    const { state } = useLocation()

    console.log(location);

    return (
        <Paper>{
            state.error ? (
                <>
                <Typography gutterBottom variant='h3' sx={{px:4,pt:2}} color='secondary'>
                    {state.error.message || 'there has been an error'} 
                </Typography>
                <Divider/>
               <Typography gutterBottom variant='body1' sx={{p:4}} color='secondary'>
                    {state.error.details  || 'Inernal server error'}
                </Typography>
                </>
            ) : <Typography gutterBottom variant='h5' sx={{p:4}} color='secondary'>
                    Inernal server error
                </Typography>}
        </Paper>
    )
}

export default ServerError