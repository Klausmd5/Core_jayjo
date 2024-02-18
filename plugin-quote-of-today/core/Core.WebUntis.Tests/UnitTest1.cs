using Core.WebUntis.Implementation;
using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Tests;

public class Tests
{
    WebUntisClient _client;
    private string _username = null!;
    private string _password = null!;

    [OneTimeSetUp]
    public void Setup()
    {
        _username = Environment.GetEnvironmentVariable("WEBUNTIS_USERNAME")!;
        _password = Environment.GetEnvironmentVariable("WEBUNTIS_PASSWORD")!;
        _client = new WebUntisClient("https://arche.webuntis.com", "htbla-grieskirchen", "Synopsis-Test");
    }

    [Test, Order(0)]
    public async Task TestAuthenticate()
    {
        await _client.Authenticate(_username, _password);
    }

    [Test]
    public async Task TestRooms()
    {
        await _client.GetRooms();
    }

    [Test]
    public async Task TestClasses()
    {
        await _client.GetClasses();
    }

    [Test]
    public async Task TestHolidays()
    {
        await _client.GetHolidays();
    }

    [Test]
    public async Task TestHomeworks()
    {
        await _client.GetHomeworks(DateTime.Now, DateTime.Now.AddDays(1));
    }

    [Test]
    public async Task TestSubject()
    {
        await _client.GetSubjects();
    }

    [Test]
    public async Task TestTimetable()
    {
        await _client.GetTimetable(ElementType.Student, _client.PersonId, DateTime.Now, DateTime.Now.AddDays(1));
    }
}
