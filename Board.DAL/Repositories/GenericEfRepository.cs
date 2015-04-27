using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Board.Data.Interfaces;
using Board.DAL.EF;
using Board.DAL.Interfaces;

namespace Board.DAL.Repositories
{
    public abstract class GenericEfRepository<T> : IRepository<T> where T : class, IIdentifiable
    {
        private DbSet<T> EntitySet;
        private BoardContext _context;

        protected GenericEfRepository(BoardContext context)
        {
            EntitySet = context.Set<T>();
            _context = context;
        }

        public virtual T GetById(int id)
        {
            return this.Find(a => a.Id == id).SingleOrDefault();
        }

        public virtual IQueryable<T> GetAll()
        {
            return EntitySet;
        }

        public virtual IQueryable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return EntitySet.Where(predicate);
        }

        public virtual int Add(T entity)
        {
            EntitySet.Add(entity);
            Save();
            return entity.Id;
        }

        public virtual void Update(T entity)
        {
            var oldEntity = this.Find(a => a.Id == entity.Id).SingleOrDefault();
            if (oldEntity == null) throw new Exception("Could not find searched for object of type" + typeof(T) + " with id " + entity.Id);

            _context.Entry(oldEntity).CurrentValues.SetValues(entity);

            Save();
        }

        public virtual void Delete(T entity)
        {
            EntitySet.Remove(entity);
            Save();
        }

        public virtual void Save()
        {
            _context.SaveChanges();
        }
    }
}
