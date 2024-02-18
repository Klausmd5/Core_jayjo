namespace Core.Moodle.Interface;

public interface IMoodleClient
{
    /*
     * Get Course of student
     */
    Task<IEnumerable<MoodleCourse>> GetCourses(string token);

    /*
     * Get detailed course information
     */
    Task<DetailedMoodleCourse?> GetDetailedCourse(string courseId, string token);

    /*
     * Get Calendar Events/Assignments of student
     */
    Task<IEnumerable<MoodleAssignment>> GetAssignments(string token);
}
