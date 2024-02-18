namespace Core.Backend.Secure.exceptions;

public class InvalidTypeException : AuthException
{
    public InvalidTypeException(string message) : base(message) { }
}
