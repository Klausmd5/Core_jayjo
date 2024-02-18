using System.Security.Claims;

namespace Core.Backend.Secure.Auth;

public class AuthToken
{
    /// <summary>
    /// username: ldap-username
    /// </summary>
    public string Username { get; set; } = null!;

    /// <summary>
    /// uid: db-uuid
    /// </summary>
    public Guid UUID { get; set; }

    public virtual List<Claim> Claims
    {
        get => new List<Claim>
        {
            new Claim("type", "auth-token"),
            new Claim("username", Username),
            new Claim("uuid", UUID.ToString()),
        };
    }
}
