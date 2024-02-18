using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Database;

public class UserFavorite
{
    [Key, Column(Order = 0)]
    public Guid Uuid { get; set; }

    [Key, Column(Order = 1)]
    public string PluginId { get; set; } = null!;

}
