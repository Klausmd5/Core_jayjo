using System.ComponentModel.DataAnnotations.Schema;

namespace CorePlugin.QuoteDb;

public class Quote
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long QuoteId { get; set; }

    public string QuoteText { get; set; } = null!;
    public Guid SubmitterUuid { get; set; }
    public string SubmittedBy { get; set; } = null!;
    public DateTime SubmitTime { get; set; } = DateTime.Now;
}
