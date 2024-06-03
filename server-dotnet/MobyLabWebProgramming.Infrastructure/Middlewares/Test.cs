using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public class Test
{
    private readonly RequestDelegate _next;
    private readonly ILogger<Test> _logger;

    public Test(RequestDelegate next, ILogger<Test> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        Thread.Sleep(1000);

        await _next(context);
    }
}