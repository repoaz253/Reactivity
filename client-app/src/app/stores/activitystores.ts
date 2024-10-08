import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
   activities : Activity[] = [];
   selectedActivity: Activity | undefined = undefined;
   editMode = false ;
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

     selectActivity = (id: string | undefined) =>
     {
        this.selectedActivity = this.activities.find((a)=>a.id === id);
     }

     cancelActivity = () =>
     {
        this.selectedActivity = undefined;
     }

    formOpen = (id?: string) =>{
        id ?  this.selectActivity(id) : this.cancelActivity();
       this.editMode = true;
    }

   formClose = () =>
   {
    this.editMode = false;
   }

   createActivity = async (activity:Activity) => {
    this.loading = true;
    activity.id = uuid();
    try{
         await agent.Activities.create(activity);
         runInAction(()=>
        {
            
         this.activities = [...this.activities , activity];
         this.selectedActivity = activity;
         this.editMode = false;
         this.loading = false;
        
        })
    }
    catch(error)

    {
        runInAction(()=>
        
        {
            console.log(error);
            this.loading = false;
        })
       
       
 } }

 updateactivity = async(activity: Activity) =>
    {
       this.loading = true;
       try{
       
        await agent.Activities.update(activity);
        runInAction(()=>
        {
            this.activities = ([...this.activities.filter(x => x.id !== activity.id) , activity]);
            this.selectedActivity = activity;
            this.editMode = false ;
            this.loading = false;
          
        })
    
       }

       catch(error){
        console.log(error);
        runInAction(()=>
        {  
        
            this.loading = false;

        })
      
       }
    }

    deleteActivity = async (id: string) =>
    {
      
         this.loading = true;
        try{
        
         await agent.Activities.delete(id)
         runInAction(()=>
         {
             this.activities = [...this.activities.filter(x => x.id !== id)];
             this.loading = false;
         })
     
        }
 
        catch(error){
         console.log(error);
         runInAction(()=>
         {  
         
             this.loading = false;
 
         })
       
        }


    }
   

}
