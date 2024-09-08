import { createContext, useContext } from "react";
import ActivityStore from "./activitystores";


// defining structure of store object 
interface Store{
    activityStore : ActivityStore
}

export const stores: Store = {
    activityStore :  new ActivityStore ()
}


export  const StoreContext = createContext(stores);

export function UseStore(){
    return useContext(StoreContext);
}
