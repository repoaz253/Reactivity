using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

[Route("api/[controller]")]
[ApiController]
    public class BaseAPIController : ControllerBase
    {
         private IMediator _mediator;
        //HttpContext.RequestServices.GetService<IMediator>();

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}
