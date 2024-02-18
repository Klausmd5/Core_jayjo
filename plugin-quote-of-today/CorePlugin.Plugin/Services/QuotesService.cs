using CorePlugin.Plugin.Dtos;
using CorePlugin.Plugin.Exceptions;
using CorePlugin.QuoteDb;
using Microsoft.EntityFrameworkCore;

namespace CorePlugin.Plugin.Services;

public class QuotesService
{
    private readonly QuotesContext _db;
    private readonly QuoteOfTodayService _quoteOfTodayService;

    public QuotesService(QuotesContext db, QuoteOfTodayService quoteOfTodayService)
    {
        _db = db;
        _quoteOfTodayService = quoteOfTodayService;
    }

    public async Task<Quote> GetRandomQuoteAsync()
    {
        var quoteOfToday = _quoteOfTodayService.GetQuoteOfToday();
        if (quoteOfToday != null)
            return quoteOfToday;

        var random = new Random();
        var count = await _db.Quotes.CountAsync();
        if (count < 1)
            throw new NoQuotePresentException("No quotes present in the database");

        var quoteOfTodaySet = false;
        Quote newQuoteOfToday = null!;

        do
        {
            newQuoteOfToday = await _db.Quotes.Skip(random.Next(count - 1)).FirstAsync();
            quoteOfTodaySet = _quoteOfTodayService.SetQuoteOfToday(newQuoteOfToday);
        } while (!quoteOfTodaySet);

        return newQuoteOfToday;
    }

    public async Task<Quote> AddQuoteAsync(QuoteDto quoteDto, Guid userId, string username)
    {
        var quoteAlreadyExists = _db.Quotes.Any(x => x.QuoteText == quoteDto.QuoteText.Trim());
        if (quoteAlreadyExists)
            throw new QuoteAlreadyExistsException("Quote already exists");

        var quote = new Quote
        {
            QuoteText = quoteDto.QuoteText.Trim(),
            SubmitterUuid = userId,
            SubmittedBy = username,
            SubmitTime = DateTime.Now
        };
        await _db.Quotes.AddAsync(quote);
        await _db.SaveChangesAsync();
        return quote;
    }
}
