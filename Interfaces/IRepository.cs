using System.Linq.Expressions;

namespace PTFintechTest.Interfaces
{
    public interface IGenericRepository<Model>
    {
        Task<IEnumerable<Model>> Get(Expression<Func<Model, bool>> filter,
            Func<IQueryable<Model>, IOrderedQueryable<Model>> orderBy,
            string includeProperties);
        Task<Model> GetById(int id);
        Task Insert(Model model);
        Task Update(Model model);
        Task Delete(int id);

    }
}