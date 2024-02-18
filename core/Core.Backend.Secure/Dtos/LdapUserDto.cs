using System.ComponentModel.DataAnnotations;

namespace Core.Backend.Secure.Dtos;

public class LdapUserDto
{
    [Required] public string LdapUsername { get; set; } = null!;
    [Required] public string LdapPassword { get; set; } = null!;
}
