namespace Core.Moodle.Interface;

public class DetailedMoodleCourse : MoodleCourse
{
    /*
     * All Teachers assigned to this course
     * Name of the teacher, format varies depending on the teachers moodle name
     * If no teachers are assigned, this will be an empty list
     */
    public List<string> Teachers { get; set; } = null!;

    /*
     * The description of this course
     */
    public string? Description { get; set; }

    /*
     * The category of this course e.g. Allgemein, 4B
     */
    public string? CategoryName { get; set; }

    /*
     * The entered start date of this course
     */
    public DateTime? StartDate { get; set; }

    /*
     * The entered end date of this course
     */
    public DateTime? EndDate { get; set; }
}
