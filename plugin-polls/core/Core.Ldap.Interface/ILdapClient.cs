namespace Core.Ldap.Interface;

public interface ILdapClient
{
    public SignInResult SignIn(SignInParams signInParams);
}
