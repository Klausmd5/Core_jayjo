using Core.Secure.Database;

namespace Core.Backend.Secure.Services;

public class CsvReaderService : BackgroundService
{
    private readonly ILogger<CsvReaderService> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IConfiguration _conf;

    public CsvReaderService(
        ILogger<CsvReaderService> logger,
        IServiceProvider serviceProvider,
        IConfiguration conf
    )
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _conf = conf;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<CoreSecureContext>();
        db.Database.EnsureCreated();

        var csvSection = _conf.GetSection("CSV");
        var csvPath = csvSection["Path"];

        var webuntisSection = csvSection.GetSection("WebUntis");
        var teachersPath = webuntisSection["Teachers"];
        var studentsPath = webuntisSection["Students"];

        RepopulateTeachers(db, csvPath, teachersPath);
        RepopulateStudents(db, csvPath, studentsPath);

        return Task.Run(() => { }, stoppingToken);
    }

    private void RepopulateStudents(CoreSecureContext db, string csvPath, string studentsPath)
    {
        var path = Path.Combine(csvPath, studentsPath);

        if (!File.Exists(path))
        {
            _logger.LogWarning("Setting CSV/WebUntis/Students incorrectly provided or file does not exist");
            return;
        }

        _logger.LogInformation("Repopulate Students");

        db.Students.RemoveRange(db.Students.ToList());

        db.AddRange(
            File.ReadLines(path)
                .Skip(1)
                .Select(x => x.Split(";"))
                .Select(student => new Student
                {
                    Class = student[0],
                    ClassTeacher = student[1],
                    LastName = student[2],
                    FirstName = student[3],
                    Email = student[4]
                }
                )
                .ToList()
        );

        db.SaveChanges();
    }

    private void RepopulateTeachers(CoreSecureContext db, string csvPath, string teachersPath)
    {
        var path = Path.Combine(csvPath, teachersPath);

        if (!File.Exists(path))
        {
            _logger.LogWarning("Setting CSV/WebUntis/Teachers incorrectly provided or file does not exist");
            return;
        }

        _logger.LogInformation("Repopulate Teachers");

        db.Teachers.RemoveRange(db.Teachers.ToList());

        db.AddRange(
            File.ReadLines(path)
                .Skip(1)
                .Select(x => x.Split(";"))
                .Select(x => new Teacher
                {
                    Id = int.Parse(x[0]),
                    Name = x[1],
                    LastName = x[2],
                    FirstName = x[3]
                }
                ).ToList()
        );

        db.SaveChanges();
    }
}
