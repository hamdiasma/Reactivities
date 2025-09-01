import { useAccount } from '../../../lib/hooks/useAccount'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginSchema } from '../../../lib/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { LockOpen } from '@mui/icons-material'
import TextInput from '../../Shared/Components/TextInput'
import { Link, useLocation, useNavigate } from 'react-router'

export default function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const { loginUser } = useAccount()
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    })
    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: async () => {
                await navigate(location.state?.from || '/activities')
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
                <Typography variant='h4'>Sign in</Typography>
            </Box>

            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Password' type='password' control={control} name='password' />

            <Button type='submit' disabled={!isValid || isSubmitting} variant='contained' size='large'>
                {isSubmitting ? <CircularProgress /> : 'Login'}
            </Button>
            <Typography sx={{ textAlign: 'center' }} >
                Don't have an account <Typography sx={{ml:2}} component={Link} to={'/register'}>Sign up</Typography>
            </Typography>
        </Paper>
    )
}
