using Application;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
             
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
             return await Mediator.Send(new List.Query());
            // return await _mediator.Send(new List.Query) 

        }


         //get api activities using id
        [HttpGet("{id}")]
             
         public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
             return await Mediator.Send(new Details.Query{Id=id});
         
    }
      
}
}