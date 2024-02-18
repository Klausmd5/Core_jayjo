using CorePlugin.QuoteDb;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CorePlugin.Plugin.Services;

public class DatabaseBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public DatabaseBackgroundService(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<QuotesContext>();
        await dbContext.Database.EnsureCreatedAsync(stoppingToken);
    }
}
