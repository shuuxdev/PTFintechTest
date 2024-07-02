
using Microsoft.EntityFrameworkCore;
using PTFintechTest.Contexts;
using PTFintechTest.Models;

namespace PTFintechTest.Repositories
{
    public class UserRepository : Repository<User>
    {
        private readonly TaskManagementSystemContext context;

        public UserRepository(TaskManagementSystemContext context) : base(context)
        {
            this.context = context;
        }
        public async Task<ICollection<Models.Role>> GetUserRolesAsync(int userId)
        {
            var query = await Get(user => user.UserId == userId, includeProperties: "Roles");
            var user = query.FirstOrDefault();
            if (user == null) throw new Exception("Invalid user");
            return user.Roles;
        }
        public async Task<bool> UserExists(string username)
        {
            var result = await GetByUsername(username);
            return result != null;
        }
        public async Task<User?> GetByUsername(string username)
        {
            var result = await _dbSet.Include(user => user.Roles)
                                    .FirstOrDefaultAsync(user => user.Username == username);
            return result;
        }
        public async Task<IEnumerable<User>> SearchUserByUsername(string username)
        {
            var result = _dbSet.Include(user => user.Roles)
                                    .Where(user => user.Username.Contains(username));
            return await result.ToListAsync();
        }
        public void RegisterUser(string username, string hashedPassword, string email, ICollection<int> roleIds)
        {
            var roles = context.Roles.Where(role => roleIds.Contains(role.RoleId)).ToList();
            var user = new User { Username = username, Password = hashedPassword, Email = email, Roles = roles };
            context.Users.Add(user);
            // Save to database or data store
            _context.SaveChanges();
        }
    }
}