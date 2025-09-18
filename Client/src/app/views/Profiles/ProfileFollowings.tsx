import { useProfile } from '../../../lib/hooks/useProfile'
import { useParams } from 'react-router'
import { Box, Divider, Typography } from '@mui/material'
import { Predicate, type PredicateType } from '../../../lib/contantes/constants'
import List from '@mui/material/List';
import ProfileItem from './ProfileItem'


interface IProps {
  predicate: PredicateType
}


export default function ProfileFollowings({ predicate }: IProps) {
  const { id } = useParams()

  const {
    profile,
    followigns,
    loadingFollowings
  } = useProfile(id, predicate)

  return (
    <Box>
      <Box display={'flex'}>
        <Typography variant='h5'>
          {predicate === Predicate.FOLLOWERS ? `People Following ${profile?.displayName}` : `People ${profile?.displayName} is following`}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />
      {
        loadingFollowings ? <Typography>Loading...</Typography> : (
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            {followigns?.map(profile => <ProfileItem
              key={profile.id}
              profile={profile}
            />
            )}
          </List>
        )
      }

    </Box>
  )
}
