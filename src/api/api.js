import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
            "API-KEY": "9452fa56-72b8-4d9c-b6a5-4025029bc3c0"
        }
    });
    
    
    export const usersAPI = {
        requestUsers(currentPage = 1, pageSize = 10) {
            return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => {
                    return response.data;
                });
        },
        follow(userId) {
            return instance.post(`follow/${userId}`)
        },
        unfollow(userId) {
            return instance.delete(`follow/${userId}`)
        },
        getProfile(userId) {
            console.warn('Obsolete method. Please profileAPI object.')
            return profileAPI.getProfile(userId);
        }
    }
    
    export const profileAPI = {
        getProfile(userId) {
            return instance.get(`profile/` + userId);
        },
        getStatus(userId) {
            return instance.get(`profile/status/` + userId);
        },
        updateStatus(status) {
            return instance.put(`profile/status`, { status: status });
        },
        savePhoto(photoFile) {
            const formData = new FormData();
            formData.append("image", photoFile);// в formData в свойстве image(смотри документацию бекенда) наш приходящий photoFile
            return instance.put(`profile/photo`, formData, {//делаем put-запрос->первый параметр URL с бекенда->второй formData
                headers: {//настраиваем специфические заголовки именно для етого запроса (смотри в network)
                    'Content-Type': 'multipart/form-data'//мы говорим что наш Content-Type является multipart/form-data (фото) 
                  }
            });
        },
        SaveProfile (profile) {
            return instance.put(`profile`, profile);
        }

    }
    
    export const authAPI = {
        me() {
            return instance.get(`auth/me`);
        },
        login(email, password, rememberMe = false) {
            return instance.post(`auth/login`, { email, password, rememberMe });
        },
        logout() {
            return instance.delete(`auth/login`);
        }
    }

   


