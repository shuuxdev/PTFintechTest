
using Microsoft.EntityFrameworkCore;
using PTFintechTest.Contexts;
using PTFintechTest.Models;

namespace PTFintechTest.Repositories
{
    public class LabelRepository : Repository<Label>
    {
        public LabelRepository(TaskManagementSystemContext context) : base(context)
        {
        }

        
    }
}