

// query function to fetch activities
// mutation function to update activities
// mutation function to delete activities

import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema} from "../schemas/LoginSchema";

import agent from "../api/agent";
import { useNavigate } from "react-router";

// mutation function to create activities
export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const loginUser = useMutation({
         mutationFn:async(creds: LoginSchema)=>{
            await agent.post('/login?useCookies=true',creds)
        },
        onSuccess:async()=>{
          await queryClient.invalidateQueries({
            queryKey:['user']
          })
        }

    })
    

     const logOutUser = useMutation({
         mutationFn:async()=>{
            await agent.post('/account/logout')
        },
        onSuccess:()=>{
            queryClient.removeQueries({queryKey:['user']});
            queryClient.removeQueries({queryKey:['activities']});
            navigate('/');
        }

    })
  
    const {data:currentUser, isLoading:loadingUserInfo} = useQuery({
        queryKey:['user'],
        queryFn:async()=>{
            const response = await agent.get<IUser>('/account/user-info')
            return response.data
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    return {currentUser, loginUser,logOutUser,loadingUserInfo};
}