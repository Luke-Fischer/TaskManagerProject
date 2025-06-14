using backend.Models;
using backend.Data;

namespace backend.Validation;

public static class WorkerValidator
{
    public static (bool IsValid, string? ErrorMessage) Validate(Worker worker)
    {
        if (string.IsNullOrWhiteSpace(worker.FirstName))
            return (false, "First name is required.");

        if (string.IsNullOrWhiteSpace(worker.LastName))
            return (false, "Last name is required.");

        if (string.IsNullOrWhiteSpace(worker.JobTitle))
            return (false, "Job title is required.");

        return (true, null);
    }
}
