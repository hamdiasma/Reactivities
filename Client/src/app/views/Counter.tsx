import { useStore } from '../../lib/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from '@mui/material'

const Counter = observer(function Counter() {

    const { countStore } = useStore()
    return (
        <Box display={'flex'} justifyContent={'space-between'} >
           <Box maxWidth={'60%'}>
             <Typography variant='h3' gutterBottom>{countStore.title}</Typography>
            <Typography variant='h5'>The count :{countStore.count}</Typography>
            <ButtonGroup sx={{ mt: 3 }}>
                <Button onClick={() => countStore.setDecrement()} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => countStore.setIncrement()} variant='contained' color='success'>Increment</Button>
                <Button onClick={() => countStore.setIncrement(5)} variant='contained' color='success'>Increment by 5</Button>
            </ButtonGroup>
           </Box>
           <Paper sx={{width:'40%',p:3}}>
            <List>
            {countStore.events.map((ev, index)=><ListItemText key={index}>
               {ev}
            </ListItemText>)}
            </List>
           </Paper>
        </Box>
    )
})

export default Counter