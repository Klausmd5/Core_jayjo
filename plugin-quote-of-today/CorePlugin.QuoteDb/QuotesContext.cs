using Microsoft.EntityFrameworkCore;

namespace CorePlugin.QuoteDb;

public class QuotesContext : DbContext
{
    public QuotesContext(DbContextOptions<QuotesContext> options) : base(options) { }

    public DbSet<Quote> Quotes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        Seed(modelBuilder);
    }

    private void Seed(ModelBuilder builder)
    {
        {
            builder.Entity<Quote>().HasData(
                new Quote
                {
                    QuoteId = 1,
                    QuoteText = "Diomadensuppse",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Tops",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 2,
                    QuoteText = "Wir sand lost, er sand lost, es ist die perfekte Symbiose!",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Loata",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 3,
                    QuoteText = "Do you need a We-e-ee?",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Loata",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 4,
                    QuoteText = "I gib da glei so a Backpfeife!",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Andi",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 5,
                    QuoteText = "Segt ma scho wos?",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Grüneis",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 6,
                    QuoteText = "Pfeift!",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Grüneis",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 7,
                    QuoteText = "Simon is wie a MongoDB nur ohne DB...",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Unknown",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 8,
                    QuoteText = "Wos soi ma bei am Interview ned Hobn? \n Andi ~ NOT have Gum.",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Andi",
                    SubmitTime = DateTime.Now
                },
                new Quote
                {
                    QuoteId = 9,
                    QuoteText = "Als Schüler ist es mir ein Anliegen, so oft wie möglich in SYP abwesend zu sein.",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "V. Kellermair",
                    SubmitTime = new DateTime(2021, 12, 1)
                },
                new Quote
                {
                    QuoteId = 10,
                    QuoteText = "Mir is liaba i überleb und es is schiach, ois wie i stirb und es wa sche gwen",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Grüneis",
                    SubmitTime = new DateTime(2023, 1, 12)
                },
                new Quote
                {
                    QuoteId = 11,
                    QuoteText = "Des is a schena Mechanismus, des hüft beim Fehler mochn.",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Grüneis",
                    SubmitTime = new DateTime(2023, 1, 12)
                },
                new Quote
                {
                    QuoteId = 12,
                    QuoteText = "Jojo des typisch Österreichisch. Fongt Deitsch au und heat Italienisch auf",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Grüneis",
                    SubmitTime = new DateTime(2023, 1, 12)
                },
                new Quote
                {
                    QuoteId = 13,
                    QuoteText = "Willkommen in meiner Welt!",
                    SubmitterUuid = new Guid("00000000-0000-0000-0000-000000000000"),
                    SubmittedBy = "Prof. Doppler",
                    SubmitTime = new DateTime(2023, 1, 27)
                }
            );
        }
    }
}
