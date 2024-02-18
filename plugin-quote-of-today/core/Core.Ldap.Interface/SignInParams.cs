namespace Core.Ldap.Interface;

public class SignInParams
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}
