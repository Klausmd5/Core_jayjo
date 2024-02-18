using Core.Database;

namespace CorePlugin.Plugin.Services;

public class DatabaseBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseBackgroundService(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return Task.Run(() =>
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<CoreContext>();
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();
            Console.WriteLine("Database OK!");
        }, stoppingToken);
    }
}
