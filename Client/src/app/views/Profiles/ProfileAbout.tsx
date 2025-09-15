import { useParams } from 'react-router'
import { useProfile } from '../../../lib/hooks/useProfile'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TextInput from '../../Shared/Components/TextInput'
import { profileSchema, type ProfileSchema } from '../../../lib/schemas/ProfileSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

export default function ProfileAbout() {
  const { id } = useParams()
  const { profile, isCurrentUser, updateProfile } = useProfile(id)

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<ProfileSchema>({
    mode: 'onTouched',
    resolver: zodResolver(profileSchema)
  })

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (profile) reset(profile)
  }, [profile, reset])

  const onSubmit =async (data: ProfileSchema) => {
    await updateProfile.mutateAsync(data,{
      onSuccess:()=>{
        toast.success("Edit succesfully!")
        setEditMode(false)
      }
    });
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} mb={2}>
        <Typography variant='h5'>About {profile?.displayName}</Typography>
        {isCurrentUser && <Button variant='outlined' size='small'
          color={editMode ? 'error' : 'primary'}
          onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </Button>}
      </Box>
      <Divider sx={{ my: 2 }} />
      {!editMode ? <Box sx={{ overflow: 'auto', maxHeight: 350 }} p={2}>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
          {
            profile?.bio ? profile.bio : 'No bio available'
          }
        </Typography>
      </Box>
        : (
          <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Example input fields */}
            <TextInput
              label="Display Name"
              control={control}
              name="displayName" />
            <TextInput
              label="Bio"
              control={control}
              name="bio"
              multiline rows={3} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={updateProfile.isPending}
              >Submit</Button>
            </Box>
          </Box>
        )
      }
    </Box>
  )
}
