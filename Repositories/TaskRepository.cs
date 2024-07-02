
using Microsoft.EntityFrameworkCore;
using PTFintechTest.Contexts;

namespace PTFintechTest.Repositories
{
    public class TaskRepository : Repository<Models.Task>
    {
        public TaskRepository(TaskManagementSystemContext context) : base(context)
        {
        }


    }
}