using Core.Plugin.Interface;
using Microsoft.AspNetCore.Builder;

namespace Core.TestPlugin;

public class TestPlugin : ICorePlugin
{
    public void ConfigureServices(WebApplicationBuilder builder)
    {
        Console.WriteLine("TESTPLUGIN BUILDER EXECUTED");
    }

    public void Configure(WebApplication app)
    {
        Console.WriteLine("TESTPLUGIN APP EXECUTED");
    }
}
