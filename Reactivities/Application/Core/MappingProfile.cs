
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{//create mapping
  public class MappingProfile : Profile
  {
    public MappingProfile()
    { 
        CreateMap<Activity, Activity>();
        
    }
        
  }
  
}

new