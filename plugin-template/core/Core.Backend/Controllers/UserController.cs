using Core.AuthLib;
using Core.Backend.Dtos;
using Core.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Controllers;

[Authorize(Policy = "ID-Token")]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{

    private UserFavoritesService _userFavoritesService;

    public UserController(UserFavoritesService userFavoritesService) => _userFavoritesService = userFavoritesService;

    [Authorize]
    [HttpGet]
    public async Task<List<UserFavoriteDto>> Favorites()
    {
        return await _userFavoritesService.GetUserFavoritesFromUser(this.User.GetUUID());
    }

    [Authorize]
    [HttpPost]
    public async Task<UserFavoriteDto> AddFavorite([FromQuery] string PluginId)
    {
        return await _userFavoritesService.AddUserFavorite(this.User.GetUUID(), PluginId);
    }

    [Authorize]
    [HttpDelete]
    public async Task<UserFavoriteDto> RemoveFavorite(string PluginId)
    {
        return await _userFavoritesService.RemoveUserFavorite(this.User.GetUUID(), PluginId);
    }

}
