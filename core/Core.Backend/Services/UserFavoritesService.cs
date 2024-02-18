using Core.Backend.Dtos;
using Core.Database;
using Microsoft.EntityFrameworkCore;

namespace Core.Backend.Services;

public class UserFavoritesService
{
    private readonly CoreContext _db;

    public UserFavoritesService(CoreContext db)
    {
        _db = db;
    }

    public async Task<List<UserFavoriteDto>> GetUserFavoritesFromUser(Guid uuid)
    {
        var usr = await _db.UserFavorites.Where(x => x.Uuid == uuid).ToListAsync();
        return usr.Select(x => new UserFavoriteDto()
        {
            UUID = x.Uuid,
            PluginID = x.PluginId
        }).ToList();
    }

    public async Task<UserFavoriteDto> AddUserFavorite(Guid uuid, string PluginId)
    {
        var usr = new UserFavorite
        {
            PluginId = PluginId,
            Uuid = uuid
        };
        await _db.UserFavorites.AddAsync(usr);
        await _db.SaveChangesAsync();
        return new UserFavoriteDto()
        {
            UUID = uuid,
            PluginID = usr.PluginId
        };
    }

    public async Task<UserFavoriteDto> RemoveUserFavorite(Guid uuid, string pluginId)
    {
        var usr = await _db.UserFavorites.Where(x => x.Uuid == uuid && x.PluginId == pluginId).FirstOrDefaultAsync();
        _db.UserFavorites.Remove(usr!);
        await _db.SaveChangesAsync();
        return new UserFavoriteDto()
        {
            UUID = uuid,
            PluginID = pluginId
        };
    }
}
