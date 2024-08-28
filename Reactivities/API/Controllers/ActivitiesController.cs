using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        //Get api activities 
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
          return  await _context.Activities.ToListAsync();

        }


         //get api activities using id
        [HttpGet("{id}")]
             
         public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
           return await _context.Activities.FindAsync(id);
    }
      
}
}