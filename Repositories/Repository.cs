
using System.Linq.Expressions;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using PTFintechTest.Interfaces;

namespace PTFintechTest.Repositories
{
    public class Repository<T> : IGenericRepository<T> where T : class
    {
        protected readonly Contexts.TaskManagementSystemContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(Contexts.TaskManagementSystemContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public Task<T> GetById(int id)
        {
            return _dbSet.FindAsync(id).AsTask()!;

        }

        public Task Insert(T entity)
        {
            _dbSet.Add(entity);
            return _context.SaveChangesAsync();
        }

        public Task Update(T entity)
        {
            _dbSet.Update(entity);
            return _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

    }
}