using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
           public Guid Id { get; set; }
          
        }
        public class Handler : IRequestHandler<Command>
        {
             private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                _context.Remove(activity);//is performed in memory and is synchronous, meaning it happens immediately and doesn't require waiting for any external resource (like a database) to complete
                await _context.SaveChangesAsync();
            }
        }
    }
}