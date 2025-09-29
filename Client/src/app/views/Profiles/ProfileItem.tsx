import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Person } from '@mui/icons-material';
import { Link } from 'react-router';

interface IProps {
  profile: IProfile
}

export default function ProfileItem({ profile }: IProps) {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={profile.displayName} src={profile.imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={<Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>{profile.displayName}</Link>}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                sx={{ color: 'text.primary', display: 'flex', mt: 1, alignItems: 'flex-end' }}
              >
                <Person />
                <Typography component="span" sx={{ ml: 1 }} variant="body2">
                  {profile.followerSCount} Followers
                </Typography>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
