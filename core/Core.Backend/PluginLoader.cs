using System.Reflection;
using Core.Plugin.Interface;

namespace Core.Backend;

public static class PluginLoader
{
    private const string PluginDllFileName = "CorePlugin.Plugin.dll";
    private static List<ICorePlugin> Plugins { get; } = new();

    public static WebApplicationBuilder InjectBuilderToPlugin(this WebApplicationBuilder builder)
    {
        Plugins.ForEach(plugin =>
        {
            plugin.ConfigureServices(builder);
            builder.Services.AddControllers().AddApplicationPart(plugin.GetType().Assembly);
        });
        return builder;
    }

    public static WebApplication InjectAppToPlugin(this WebApplication app)
    {
        Plugins.ForEach(plugin => plugin.Configure(app));
        return app;
    }

    public static void LoadPlugins(string folder)
    {
        Console.WriteLine("x--------------------[Loading Plugins]---------------------x");
        var pluginDirectories = Directory.GetDirectories(folder);
        foreach (var pluginDirectory in pluginDirectories)
        {
            Console.WriteLine($"Searching for plugins in {pluginDirectory}");
            var path = Path.GetFullPath(Path.Combine(pluginDirectory, PluginDllFileName));

            var loadContext = new PluginLoadContext(path);
            var assembly = loadContext.LoadFromAssemblyName(new AssemblyName(PluginDllFileName));
            var types = assembly.GetTypes();

            foreach (var type in types)
            {
                if (!type.IsAssignableTo(typeof(ICorePlugin)) ||
                    type.FullName == "Core.Plugin.Interface.ICorePlugin") continue;

                Plugins.Add((ICorePlugin)Activator.CreateInstance(type)!);
                Console.WriteLine($"Loading plugin {type.FullName} from folder {pluginDirectory}");
            }
        }

        if (pluginDirectories.Length == 0)
            Console.WriteLine("No plugin folders found");

        Console.WriteLine("x------------------[Starting Application]------------------x");
    }
}
