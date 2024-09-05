import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboards";



axios.defaults.baseURL = 'http://localhost:5000/api';


const sleep =(delay:number) => {
    return new Promise((resolve)=>
    {
       return  setTimeout(resolve, delay )// 2 parameters -> 1 the func that is called  once the timeout is completed
    })
}

axios.interceptors.response.use (async response =>
{
    try     {
        await sleep(1000);
        return response;
    }
          catch(error){
            console.log(error)
            return await Promise.reject(error);
          }
})
    //intercept the resonse before catching the error and add delay of 1s
// const responseBody 
const responseBody = <T> (
    response: AxiosResponse<T>
) =>  response.data;

//const requests

const requests={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string , body: {}) => axios.get<T>(url, body).then(responseBody),
    put : <T>(url: string , body:{}) => axios.get<T>(url, body).then(responseBody),
    del : <T>(url: string) => axios.get<T>(url).then(responseBody)
}
//const activities 
//list all activities 
const Activities =  {
  list: () => requests.get<Activity[]>('/activities'),
  details : (id: string) => requests.get<Activity>(`/activities/${id}`),
  create : (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity : Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)

}

//const agent atat uses activities 
const agent = {
    Activities
}

export default agent;