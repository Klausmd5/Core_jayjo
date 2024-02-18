using System.Security.Claims;
using Core.AuthLib;
using Core.Secure.Database;
using Core.WebUntis.Implementation;
using Core.WebUntis.Interface.Types;
using Student = Core.WebUntis.Interface.Types.Student;

namespace Core.Backend.Secure.Services;

public class WebUntisService
{
    private readonly IConfiguration _config;
    private readonly CredService _credService;
    private readonly CoreSecureContext _db;

    public WebUntisService(IConfiguration config, CredService credService, CoreSecureContext db)
    {
        _config = config;
        _credService = credService;
        _db = db;
    }

    private async Task<WebUntisClient> GetWebUntisClient(ClaimsPrincipal? user = null)
    {
        var baseUrl = _config["WebUntis:BaseUrl"];
        var school = _config["WebUntis:School"];

        var webUntisClient = new WebUntisClient(baseUrl, school, "Synopsis");
        if (user != null)
        {
            var webUntisCredentials = GetWebUntisCredentials(user);
            await webUntisClient.Authenticate(webUntisCredentials.Username, webUntisCredentials.Password);
        }

        return webUntisClient;
    }

    private WebUntisCredentials GetWebUntisCredentials(ClaimsPrincipal user)
    {
        var guid = user.GetUUID();

        var password = _credService.GetLdapPassword(guid);

        if (password == null)
            throw new NoLdapPasswordException();

        return new WebUntisCredentials
        {
            Username = user.GetUsername(),
            Password = password
        };
    }

    public IEnumerable<TeacherDTO> GetTeachers()
    {
        return _db.Teachers.Select(t => new TeacherDTO
        {
            Id = t.Id,
            Name = t.Name,
            FirstName = t.FirstName,
            LastName = t.LastName
        });
    }

    public async Task<IEnumerable<Student>> GetStudents(ClaimsPrincipal user)
    {
        var teachers = GetTeachers();
        var classes = await GetClasses(user);

        return _db.Students.ToList().Select(s => new Student
        {
            FirstName = s.FirstName,
            LastName = s.LastName,
            Email = s.Email,
            ClassId = classes.First(x => x.Name == s.Class).Id,
            ClassTeacherId = teachers.First(x => s.ClassTeacher.Contains($"{x.FirstName} {x.LastName}")).Id
        });
    }

    public async Task<IEnumerable<Homework>> GetHomeworks(ClaimsPrincipal user, DateTime startDate, DateTime endDate)
    {
        var webUntisClient = await GetWebUntisClient(user);
        var homeworks = await webUntisClient.GetHomeworks(startDate, endDate);
        return homeworks;
    }

    public async Task<IEnumerable<Holiday>> GetHolidays(ClaimsPrincipal user)
    {
        var webUntisClient = await GetWebUntisClient(user);
        var holidays = await webUntisClient.GetHolidays();
        return holidays;
    }

    public async Task<IEnumerable<Subject>> GetSubject(ClaimsPrincipal user)
    {
        var webUntisClient = await GetWebUntisClient(user);
        return await webUntisClient.GetSubjects();
    }

    public async Task<IEnumerable<Room>> GetRooms(ClaimsPrincipal user)
    {
        var webUntisClient = await GetWebUntisClient(user);
        return await webUntisClient.GetRooms();
    }

    public async Task<IEnumerable<Class>> GetClasses(ClaimsPrincipal user)
    {
        var webUntisClient = await GetWebUntisClient(user);
        return await webUntisClient.GetClasses();
    }

    public async Task<IEnumerable<Timetable>> GetTimetableFromTeacher(ClaimsPrincipal user, int teacherId,
        DateTime startDate, DateTime endDate)
    {
        IEnumerable<Timetable> res = new List<Timetable>();
        foreach (var variable in (await GetClasses(user)).Where(x => x.Id != 754))
        {
            var timetable = await GetTimetableFromClass(user, variable.Id, startDate, endDate);
            res = res.Concat(timetable
                .Where(x => x.TeacherIds != null && x.TeacherIds.Contains(teacherId)));
        }

        return res;
    }

    public async Task<IEnumerable<Timetable>> GetTimetableFromStudent(ClaimsPrincipal user, DateTime startDate,
        DateTime endDate)
    {
        var webUntisClient = await GetWebUntisClient(user);
        return await webUntisClient.GetTimetable(ElementType.Student, webUntisClient.PersonId, startDate, endDate);
    }

    public async Task<IEnumerable<Timetable>> GetTimetableFromClass(ClaimsPrincipal user, int classId,
        DateTime startDate,
        DateTime endDate)
    {
        var webUntisClient = await GetWebUntisClient(user);
        return await webUntisClient.GetTimetable(ElementType.Class, classId, startDate, endDate);
    }

    public async Task<IEnumerable<Timetable>> GetSubstitutionsFromStudent(ClaimsPrincipal user, DateTime startDate,
        DateTime endDate)
    {
        var webUntisClient = await GetWebUntisClient(user);
        var items = await webUntisClient.GetTimetable(ElementType.Student, webUntisClient.PersonId, startDate, endDate);
        return items.Where(x => x.SubstitutionText == "Supplierung").DefaultIfEmpty(new Timetable { Id = -1 });
    }

    public async Task<IEnumerable<Timetable>> GetSubstitutionsFromTeacher(
        ClaimsPrincipal user,
        int teacherId,
        DateTime startDate,
        DateTime endDate)
    {
        return (await GetTimetableFromTeacher(user, teacherId, startDate, endDate))
            .Where(x => x.SubstitutionText == "Supplierung");
    }

    private class WebUntisCredentials
    {
        public string Username = null!;
        public string Password = null!;
    }

    private class NoLdapPasswordException : Exception
    {
    }
}
