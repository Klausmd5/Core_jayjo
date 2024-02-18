namespace Core.Backend.Dtos;

public class UserFavoriteDto
{
    public Guid UUID { get; set; }
    public string PluginID { get; set; } = null!;
}
