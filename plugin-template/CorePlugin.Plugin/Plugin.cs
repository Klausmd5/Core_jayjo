using Core.Backend;
using Core.Plugin.Interface;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CorePlugin.Plugin;

public class Plugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        //TODO: Add your own services here (e.g. database context, services, etc.)
        builder.Services.AddControllers();

        /*builder.Services.AddDbContext<PluginContext>(db =>
        {
            // USE THIS IF YOU WANT THAT THE PLUGIN WORKS IN PRODUCTION!!!!111
            var connectionString = builder.Configuration.GetConnectionStringThatAlsoWorksInProduction("PollsDatabaseConnection", builder.Environment.IsDevelopment());
            if (builder.Environment.IsDevelopment())
            {
                db.UseSqlite(connectionString);
            } else {
                db.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        });*/
    }

    public void Configure(WebApplication app)
    {
        //TODO: Eventually add your own middleware here (e.g. SignalR, etc.)
        app.MapControllers();
    }
}
