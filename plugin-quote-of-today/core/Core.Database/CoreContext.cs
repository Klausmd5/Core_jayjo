using Microsoft.EntityFrameworkCore;

namespace Core.Database;

public class CoreContext : DbContext
{
    public DbSet<UserFavorite> UserFavorites { get; set; } = null!;

    public CoreContext()
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserFavorite>().HasKey(u => new
        {
            u.Uuid,
            u.PluginId
        });
        //base.OnModelCreating(modelBuilder);
    }

    public CoreContext(DbContextOptions<CoreContext> options) : base(options)
    {

    }
}
