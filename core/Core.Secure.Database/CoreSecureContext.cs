using Microsoft.EntityFrameworkCore;

namespace Core.Secure.Database;

public class CoreSecureContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<StoredUserTokens> StoredUserTokens { get; set; } = null!;
    public DbSet<Teacher> Teachers { get; set; } = null!;
    public DbSet<Student> Students { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
    }

    public CoreSecureContext(DbContextOptions<CoreSecureContext> options) : base(options)
    {
    }
}
