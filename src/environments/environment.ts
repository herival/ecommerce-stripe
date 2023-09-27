

export const apiUrl = () =>{
    if(process.env.NODE_ENV === "development"){
        return 'http://localhost:3000/'
    }else {
        return 'https://api.jstore.fr/'
    }
}
export const webApiUrl = apiUrl()