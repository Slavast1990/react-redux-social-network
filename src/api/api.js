import axios from "axios";

const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "1e3c7449-c2df-4f68-9b25-05f7c91f2171"
        }
    });

    export const usersAPI = {
        getUsers (currentPage = 1, PageSize = 10) {
            return instance.get( `users?page=${currentPage}&count=${PageSize}`)
            .then(Response =>  {
                return Response.data
            });
        }
    }


// export const getUsers2 = (currentPage = 1, PageSize = 10) => {
//     return instance.get(baseUrl + `follow?page=${currentPage}&count=${PageSize}`)
//     .then(Response =>  {
//         return Response.data
//     });
// }