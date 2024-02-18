using System.Security.Claims;

namespace Core.AuthLib;

public static class AuthExtensions
{
    public static string GetUsername(this ClaimsPrincipal cp)
        => cp.Claims.First(x => x.Type == "username").Value;

    public static Guid GetUUID(this ClaimsPrincipal cp)
        => new(cp.Claims.First(x => x.Type == "uuid").Value);

    public static UserRoles GetRole(this ClaimsPrincipal cp)
    {
        if (!Enum.TryParse(cp.Claims.First(x => x.Type == "rolle").Value, true, out UserRoles userRole))
            throw new ArgumentException("Unknown Role");
        return userRole;
    }
}
