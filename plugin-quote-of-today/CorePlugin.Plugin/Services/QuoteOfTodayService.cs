using CorePlugin.QuoteDb;

namespace CorePlugin.Plugin.Services;

public class QuoteOfTodayService
{
    private readonly Dictionary<DateTime, Quote> _quotesOfDays = new();

    public Quote? GetQuoteOfToday()
        => _quotesOfDays.TryGetValue(DateTime.Today, out var quote) ? quote : null;

    public bool SetQuoteOfToday(Quote quoteToAdd)
    {
        if (_quotesOfDays.TryGetValue(DateTime.Today.AddDays(-1), out var quoteOfYesterday)
            && quoteOfYesterday != quoteToAdd)
            return false;

        _quotesOfDays.Add(DateTime.Today, quoteToAdd);
        return true;
    }
}
