using Core.AuthLib;

namespace Core.Ldap.Interface;

public class LdapUser
{
    /*
     * The user's name
     */
    public string DisplayName { get; set; } = null!;

    /*
     * The users logon name
     */
    public string LoginName { get; set; } = null!;

    /*
     * The current class of the user, null if of type teacher or admin
     * e.g "5BHIF"
     */
    public string? Class { get; set; }

    /*
     * The Mail address of the user
     */
    public string Email { get; set; } = null!;

    /*
     * One of three Organization Units the user could be part of
     * e.g Schueler, Administrator, Lehrer
     */
    public UserRoles OrganizationUnit { get; set; } = UserRoles.Schueler;
}
