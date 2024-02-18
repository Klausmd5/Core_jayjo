using Core.Backend.Secure.Services;
using Core.AuthLib;
using Core.Backend.Secure.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Controllers;

[Authorize(Policy = "Auth-Token")]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{

    private UserService _userService;

    public UserController(UserService usr) => _userService = usr;

    [Authorize]
    [HttpPost]
    public UserDTO GetUserInfo(string? uuid) => _userService.GetUserInfo(uuid ?? User.GetUUID().ToString());
}
