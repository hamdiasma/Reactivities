import { useParams } from 'react-router'
import { useProfile } from '../../../lib/hooks/useProfile'
import { Box, Button, Divider, Typography } from '@mui/material'

export default function ProfileAbout() {
  const { id } = useParams()
  const { profile } = useProfile(id)

  return (
    <Box>
       <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Typography variant='h5'>About {profile?.displayName}</Typography>
        <Button variant='outlined' size='small'>Edit Profile</Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ overflow: 'auto', maxHeight: 350 }} p={2}>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
          {
            profile?.bio ? profile.bio : 'No bio available'
          }
        </Typography>
      </Box>
    </Box>
  )
}
