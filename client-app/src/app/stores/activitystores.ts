import { makeAutoObservable, makeObservable , observable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

export default class ActivityStore {
   activities : Activity[] = [];
   selectedActivity: Activity | undefined = undefined;
   EditMode = false ;
   loading = false ;
   loadingInitial = false ;



    constructor() {
        makeAutoObservable(this)
    }
    
     //arrow function = loadactivities set loadingInitial=true
     // make async and load the activities 

     loadactivities = async () =>
     {
        this.setloadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity =>{
        
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
              })
              this.setloadingInitial(false)
        }
        catch(error)

        {
            console.log(error);
            this.setloadingInitial(false);
     }
        
}

setloadingInitial = (state: boolean) =>
    {
       this.loadingInitial = state;
    }

     selectActivity = (id: string) =>
     {
        this.selectedActivity = this.activities.find((activity)=>activity.id === id);
     }
     cancelActivity = () =>
     {
        this.selectedActivity = undefined;
     }

    FormOpen = (id?: string) =>{
        id ?  this.selectActivity(id) : this.cancelActivity();
       this.EditMode = true;
    }

   FormClose = () =>
   {
    this.EditMode = false;
   }
  
}

