namespace CorePlugin.Plugin.Exceptions;

public class NoQuotePresentException : QuoteException
{
    public NoQuotePresentException(string? message) : base(message) { }
}
