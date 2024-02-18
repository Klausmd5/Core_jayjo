using System.ComponentModel.DataAnnotations;

namespace CorePlugin.Plugin.Dtos;

public class QuoteDto
{
    [Required] public string QuoteText { get; set; } = null!;
}
