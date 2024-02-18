using System.Text.Json;
using Core.Moodle.Interface;
using Microsoft.Extensions.Options;

namespace Core.Moodle.Implementation;

public class MoodleClient : IMoodleClient
{
    private readonly string _baseAddress;
    private readonly HttpClient _client;

    public MoodleClient(HttpClient client, IOptions<MoodleConfiguration> moodleConfig)
    {
        _client = client;
        _baseAddress = moodleConfig.Value.BaseUrl;
    }

    /*
     * Grabs all Courses of a User
     */
    public async Task<IEnumerable<MoodleCourse>> GetCourses(string token)
    {
        var jsonElement = await GetJsonResponse("mod_assign_get_assignments", token, "");
        var courses = jsonElement.RootElement.GetProperty("courses").EnumerateArray()
            .Select(x => new MoodleCourse
            {
                Id = x.GetProperty("id").GetInt64().ToString(),
                Name = x.GetProperty("fullname").GetString()
            });
        return courses;
    }

    /*
     * Grabs detailed information about a course
     */
    public async Task<DetailedMoodleCourse?> GetDetailedCourse(string courseId, string token)
    {
        var jsonElement = await GetJsonResponse("core_course_get_courses_by_field", token, $"field=id&value={courseId}");
        var course = jsonElement.RootElement.GetProperty("courses")
            .EnumerateArray()
            .Select(x => new DetailedMoodleCourse
            {
                Id = x.GetProperty("id").GetInt64().ToString(),
                Name = x.GetProperty("fullname").GetString(),
                CategoryName = x.GetProperty("categoryname").GetString(),
                Teachers = x.GetProperty("contacts").EnumerateArray()
                    .Where(y => y.GetProperty("fullname").GetString() != null)
                    .Select(y => y.GetProperty("fullname").GetString()!)
                    .ToList(),
                Description = x.GetProperty("summary").GetString(),
                StartDate = ConvertUnixTimeStampToDateTime(x.GetProperty("startdate").GetInt64()),
                EndDate = ConvertUnixTimeStampToDateTime(x.GetProperty("enddate").GetInt64()),
            }).FirstOrDefault();
        return course;
    }

    /*
     * Grabs all Assignments of a User
     */
    public async Task<IEnumerable<MoodleAssignment>> GetAssignments(string token)
    {
        var jsonElement = await GetJsonResponse("mod_assign_get_assignments", token, "");
        var assignments = jsonElement.RootElement.GetProperty("courses")
            .EnumerateArray()
            .Where(x => x.GetProperty("assignments").EnumerateArray().Any())
            .SelectMany(x => x.GetProperty("assignments").EnumerateArray())
            .Select(x => new MoodleAssignment
            {
                Name = x.GetProperty("name").GetString(),
                DueDate = ConvertUnixTimeStampToDateTime(x.GetProperty("duedate").GetInt64()),
                CourseId = x.GetProperty("course").GetInt64().ToString(),
                Id = x.GetProperty("id").GetInt64().ToString()
            });
        return assignments;
    }

    private async Task<JsonDocument> GetJsonResponse(string functionName, string token, string additionalArgs)
    {

        var httpAddress = new Uri(
            $"{_baseAddress}webservice/rest/server.php" +
            $"?wstoken={token}&wsfunction={functionName}&moodlewsrestformat=json&{additionalArgs}"
        );
        var response = await _client.GetStreamAsync(httpAddress);
        return await JsonDocument.ParseAsync(response);
    }

    private static DateTime ConvertUnixTimeStampToDateTime(long unixTimeStamp)
    {
        var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        return dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
    }
}
