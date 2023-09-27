
import { webApiUrl } from "../environments/environment"
import { User } from "../models/user"
import { setItem } from "../services/localsorage.service"
import { get, post, put, remove } from "./fetchHelpers"

export const getDatas = async (entityName: string) =>{
    const url = webApiUrl + entityName
    const datas = await get(url)
    return datas
}
export const searchDatas = async (entityName: string, query: string, page=1, limit= 8) =>{
    const url = webApiUrl + entityName+"/search?"+query+"&pageNumber="+page+ "&pageLimit="+limit
    const datas = await get(url)
    return datas
}
export const getDatasBySlug = async (entityName: string, slug: string) =>{
    const url = webApiUrl + entityName+"/by/slug/" + slug
    const datas = await get(url)
    return datas
}
export const getDatasByPage = async (entityName: string, page=1, limit= 5) =>{
    const url = webApiUrl + entityName+"/by/page" + "?pageNumber="+page+ "&pageLimit="+limit
    const datas = await get(url)
    return datas
}
export const addData = async (entityName: string, data: any) =>{
    const url = webApiUrl + entityName
    const datas = await post(url,data)
    return datas
}
export const updateData = async (entityName: string, id: string, data: any) =>{
    const url = webApiUrl + entityName+"/"+id
    const datas = await put(url,data)
    return datas
}
export const deleteData = async (entityName: string, id: string) =>{
    const url = webApiUrl + entityName+"/"+id
    const datas = await remove(url)
    return datas
}
export const signup = async (user: User) =>{
    const url = webApiUrl + "user/signup"
    const datas = await post(url,user)
    return datas
}
export const signin = async (user: User) =>{
    const url = webApiUrl + "user/signin"
    const datas = await post(url,user)
    if(datas.isSuccess){
        // auth success 
        setItem("auth", {token: datas.token, userId: datas.userId})
    }
    return datas
}
