namespace CorePlugin.Plugin.Exceptions;

public class QuoteAlreadyExistsException : QuoteException
{
    public QuoteAlreadyExistsException(string? message) : base(message) { }
}
