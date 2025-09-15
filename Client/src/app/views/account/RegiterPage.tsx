import { useAccount } from '../../../lib/hooks/useAccount'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import TextInput from '../../Shared/Components/TextInput'
import { registerSchema, type RegisterSchema } from '../../../lib/schemas/RegisterSchema'
import { Link } from 'react-router'

export default function RegisterPage() {

    const { registerUser } = useAccount()
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Email')) setError('email', {message:err})
                        if (err.includes('Password'))setError('password', {message:err})
                    })
                }
            }
        });
    }

    return (
        <Paper component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', p: 3, gap: 3, maxWidth: 'md', mx: 'auto', borderRadius: 3 }}
        >
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={3} color={'secondary.main'}
            >
                <LockOpen fontSize='large' />
                <Typography variant='h4'>Register</Typography>
            </Box>
            <TextInput label='Name' control={control} name='displayName' />
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' type='password' control={control} name='password' />
            <TextInput label='Confim Password' type='password' control={control} name='cfpassword' />
            <Button type='submit' disabled={!isValid || isSubmitting} variant='contained' size='large'>
                {isSubmitting ? <CircularProgress /> : 'Register'}
            </Button>
             <Typography sx={{ textAlign: 'center' }} >
              Already have an account? <Typography sx={{ml:2}} component={Link} to={'/login'}>Sign in</Typography>
            </Typography>
        </Paper>
    )
}
