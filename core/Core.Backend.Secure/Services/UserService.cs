using Core.Backend.Secure.Dtos;
using Core.Secure.Database;

namespace Core.Backend.Secure.Services;

public class UserService
{
    private CoreSecureContext _db;

    public UserService(CoreSecureContext db)
    {
        _db = db;
    }

    public UserDTO GetUserInfo(string uuid)
    {
        var usr = _db.Users.First(x => x.UUID == new Guid(uuid));
        return new UserDTO()
        {
            UUID = usr.UUID,
            Username = usr.Username,
            SchoolEmail = usr.SchoolEmail,
            DisplayName = usr.DisplayName,
            Class = usr.Class,
            Role = usr.Role.ToString(),
            MatriculationNumber = usr.MatriculationNumber
        };
    }

}
