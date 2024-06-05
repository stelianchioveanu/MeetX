using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using OfficeOpenXml;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.Workers;

/// <summary>
/// This is an example of a worker service, this service is called on the applications start to do some asynchronous work.
/// </summary>
public class InitializerWorker : BackgroundService
{
    private readonly ILogger<InitializerWorker> _logger;
    private readonly IServiceProvider _serviceProvider;

    public InitializerWorker(ILogger<InitializerWorker> logger, IServiceProvider serviceProvider)
    {
        _logger = logger; // The logger instance is injected here.
        _serviceProvider = serviceProvider; // Here the service provider is injected to request other components on runtime at request.
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        try
        {
            await using var scope = _serviceProvider.CreateAsyncScope();
            var repositoryService = scope.ServiceProvider.GetService<IRepository<WebAppDatabaseContext>>();

            if (repositoryService == null)
            {
                _logger.LogInformation("Couldn't create the repository service!");

                return;
            }

            var user = await repositoryService.GetAsync(new UserSpec("admin@default.com"), cancellationToken);

            if (user == null)
            {
                _logger.LogInformation("No user found, adding default user!");
                user = await repositoryService.AddAsync(new Core.Entities.User()
                {
                    Email = "admin@default.com",
                    Name = "Admin",
                    Role = UserRoleEnum.Admin,
                    Password = PasswordUtils.HashPassword("default"),
                    ShortName = "AD",
                    Color = "#e03f4f"
                }, cancellationToken);
            }

            var firstGroup = await repositoryService.GetAsync(new PublicGroupSpec("Public Group", true), cancellationToken);
            List<string> colors = new List<string> { "#e03f4f", "#c16ca8", "#a86cc1", "#6ca8c1", "#98fb98", "#3fe0d0", "#26abff" };
            Random random = new Random();

            if (firstGroup == null)
            {
                _logger.LogInformation("No Public Group found, adding default group!");
                firstGroup = new Core.Entities.Group()
                {
                    Name = "Public Group",
                    FirstAdminId = user.Id,
                    Admins = new List<User>(),
                    Users = new List<User>(),
                    ShortName = "Public Group".Split(' ').Length > 1 ? $"{"Public Group".Split(' ')[0][0]}{"Public Group".Split(' ')[1][0]}" : "Public Group".Substring(0, 2),
                    Color = colors[random.Next(0, colors.Count)],
                    isPublic = true,
                    ChildrenGroups = new List<Group>()
                };
                firstGroup.Admins.Add(user);
                firstGroup = await repositoryService.AddAsync(firstGroup, cancellationToken);
            }

            using var package = new ExcelPackage(new FileInfo("../MobyLabWebProgramming.Infrastructure/Workers/public-groups.xlsx"));

            var worksheet = package.Workbook.Worksheets[0];

            int rowCount = worksheet.Dimension.Rows;
            int colCount = worksheet.Dimension.Columns;

            List<string> groupsNames = new List<string>();
            List<string> groupsParents = new List<string>();

            for (int row = 2; row <= rowCount; row++)
            {
                var column1Value = worksheet.Cells[row, 1].Text;
                var column2Value = worksheet.Cells[row, 2].Text;

                if (string.IsNullOrEmpty(column1Value) && string.IsNullOrEmpty(column2Value))
                {
                    break;
                }

                groupsNames.Add(column1Value);
                groupsParents.Add(column2Value);
            }

            if (groupsNames.Count != groupsParents.Count)
            {
                throw new Exception("Groups data is compromised!");
            }

            for (int i = 0; i < groupsNames.Count; i++)
            {
                var parent = await repositoryService.GetAsync(new PublicGroupSpec(groupsParents[i].Trim(), true), cancellationToken);

                if (parent == null)
                {

                    throw new Exception("Groups data is compromised! Parent null " + i + " " + groupsNames.Count + " " + groupsNames[i].Trim() + " " + groupsParents[i].Trim());
                } else
                {
                    var newGroup = await repositoryService.GetAsync(new PublicGroupSpec(groupsNames[i].Trim(), true), cancellationToken);
                    if (newGroup == null)
                    {
                        newGroup = new Core.Entities.Group()
                        {
                            Name = groupsNames[i].Trim(),
                            FirstAdminId = user.Id,
                            Admins = new List<User>(),
                            Users = new List<User>(),
                            ShortName = groupsNames[i].Trim().Split(' ').Length > 1 ? $"{groupsNames[i].Trim().Split(' ')[0][0]}{groupsNames[i].Trim().Split(' ')[1][0]}" : groupsNames[i].Trim().Substring(0, 2),
                            Color = colors[random.Next(0, colors.Count)],
                            isPublic = true,
                            ChildrenGroups = new List<Group>(),
                            ParentGroupId = parent.Id,
                        };
                        newGroup.Admins.Add(user);
                        newGroup = await repositoryService.AddAsync(newGroup, cancellationToken);
                    }
                }
            }
            _logger.LogInformation("All public groups added!");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initializing database!");
        }
    }
}