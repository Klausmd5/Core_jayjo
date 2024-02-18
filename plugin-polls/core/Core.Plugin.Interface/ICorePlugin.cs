using Microsoft.AspNetCore.Builder;

namespace Core.Plugin.Interface;

public interface ICorePlugin
{
    /*
     * Use this method to register your classes for dependency injection.
     * Run methods of the backend builder object here.
     */
    public void ConfigureServices(WebApplicationBuilder builder);

    /*
     * Use this to register your controllers.
     * You can configure the app's request handling pipeline and their middleware components here.
     */
    public void Configure(WebApplication app);
}
