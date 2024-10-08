using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(opt=>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});



builder.Services.AddCors(opt=>
{
    opt.AddPolicy("CorsPolicy", policy => 
    
    
    {
       policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");

    });
});
builder.Services.AddMediatR(config=> config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
//using var (It will be automatically deleted once it is not needed , -->garbage collector)

var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
    //await keyword is used to asynchronously wait for the completion of the SeedData method.
}
catch (Exception ex)
{
    
      var logger = services.GetRequiredService<Logger<Program>>();
       logger.LogError(ex,"An error occured during migrtion");
}
app.Run();



