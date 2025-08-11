import { useMutation } from "@tanstack/react-query"
import {useAuthStore} from '../store'
import { logout } from "../src/http/api"

export const useLogoutUser = ()=>{
    const {logout: logoutFromStore } = useAuthStore()

    const {mutate: logoutMutate}= useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: async ()=>{
      logoutFromStore()
      return
    }
  })
    return{
      _logout:logoutMutate

    }
}