

// query function to fetch activities
// mutation function to update activities
// mutation function to delete activities

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "../schemas/LoginSchema";

import agent from "../api/agent";
import { useLocation, useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/RegisterSchema";
import { toast } from "react-toastify";

// mutation function to create activities
export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const location = useLocation()


    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            const response = await agent.get<IUser>('/account/user-info')
            queryClient.setQueryData(['user'], response.data)
            const redirectTo = location.state?.from || '/activities';
            navigate(redirectTo, { replace: true });
        }
    })

    const logOutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout')
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            navigate('/');
        }

    })

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds
            )
        },
        onSuccess: async () => {
            toast.success('Register successful')
            await navigate('/login')
        }
    })

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<IUser>('/account/user-info')
            return response.data
        },
        enabled: !queryClient.getQueryData(['user']) && location.pathname != '/login' && location.pathname != '/register'
    })

    return { currentUser, loginUser, logOutUser, loadingUserInfo, registerUser };
}