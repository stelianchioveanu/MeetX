using MobyLabWebProgramming.Infrastructure.Extensions;
using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.AddCorsConfiguration()
    .AddRepository()
    .AddAuthorizationWithSwagger("MobyLab Web App")
    .AddServices()
    .UseLogger()
    .AddWorkers()
    .AddApi();

var app = builder.Build();

/*app.UseMiddleware<Test>();*/

app.ConfigureApplication();
app.MapHub<ChatService>("/chatHub");
app.Run();