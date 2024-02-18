namespace Core.Backend.Secure.exceptions;

public class InvalidUsernameException : AuthException
{
    public InvalidUsernameException(string message) : base(message) { }
}
