namespace Core.Backend.Secure.exceptions;

public abstract class AuthException : Exception
{
    protected AuthException(string message) : base(message) { }
}
