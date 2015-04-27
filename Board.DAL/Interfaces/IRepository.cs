using System;
using System.Linq;
using System.Linq.Expressions;

namespace Board.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        IQueryable<T> Find(Expression<Func<T, bool>> predicate);
        int Add(T entity);
        void Delete(T entity);
        void Save();
    }
}
