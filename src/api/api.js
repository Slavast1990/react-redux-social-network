import axios from "axios";

const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "9452fa56-72b8-4d9c-b6a5-4025029bc3c0"
        }
    });

    export const usersAPI = {
        getUsers (currentPage = 1, PageSize = 10) {
            return instance.get( `users?page=${currentPage}&count=${PageSize}`)
            .then(Response =>  {
                return Response.data
            });
        },

        follow(userId) {
            return instance.post(`follow/${userId}`)
        },

        unfollow(userId) {
           return instance.delete(`follow/${userId}`)   
        },

        getProfile (userId) {
            console.warn('obsolete method. Please use profileAPI object')
           return instance.get(`profile/` + userId);
            
        }
    }

    export const profileAPI = {
        getProfile (userId) {
           return instance.get(`profile/` + userId);
        },
        getStatus (userId) {
            return instance.get(`profile/status/` + userId);
        },
        updateStatus(status) {
            return instance.put(`profile/status`, { status: status});

        }
    }

    export const authAPI = {
      me () {
        return instance.get(`auth/me`,) 
    }
    }

   


