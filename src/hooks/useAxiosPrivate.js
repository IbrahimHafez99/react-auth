import axios, { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth()

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      //the response is good
      response => response,
      //an expired token for example
      async (error) => {
        //getting the previous request
        const prevRequest = error?.config;
        //Forbidden e.g. (expired access token)
        //we also gonna check the custom property on the request prevRequest.sent and this is say if sent does not exist and that is because we don't want to get in endless loop that could happen of 403 so we only want to retry once and the sent property indicates that
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept)
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }

  }, [auth, refresh])

  //returning axiosPrivate instance
  return axiosPrivate
}

export default useAxiosPrivate