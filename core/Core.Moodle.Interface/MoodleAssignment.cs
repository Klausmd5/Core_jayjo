namespace Core.Moodle.Interface;

public class MoodleAssignment
{
    public string? Id { get; init; }
    public string? CourseId { get; init; }
    public string? Name { get; set; }
    public DateTime DueDate { get; set; }
}
