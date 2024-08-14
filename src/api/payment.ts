import { webApiUrl } from "../environments/environment"
import { post } from "./fetchHelpers"

export const createPaymentIntent = async (paymentMethod: string, data: any) =>{
    const url = webApiUrl + "payment/create-"+paymentMethod +
    "-payment-intent?paymentMethode="+paymentMethod

    const datas = await post(url,data)
    
    return datas
}
export const captureOrder = async (paymentMethod: string, data: any) =>{
    const url = webApiUrl + "payment/capture-"+paymentMethod +
    "-order"

    const datas = await post(url,data)
    
    return datas
}