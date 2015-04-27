using System;
using System.Collections.Generic;
using System.Linq;
using Board.DAL.Interfaces;
using System.Data.Entity;
using Board.Data.Interfaces;
using Board.DAL.EF;

namespace Board.DAL.Repositories
{
    public abstract class GenericEfRepository<T> : IRepository<T> where T : class, IIdentifiable
    {
        private DbSet<T> EntitySet;
        private BoardContext _context;

        public GenericEfRepository(BoardContext context)
        {
            EntitySet = context.Set<T>();
            _context = context;
        }

        public T GetById(int id)
        {
            return this.Find(a => a.Id == id).SingleOrDefault();
        }

        public IQueryable<T> GetAll()
        {
            return EntitySet;
        }

        public IQueryable<T> Find(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {
            return EntitySet.Where(predicate);
        }

        public int Add(T entity)
        {
            EntitySet.Add(entity);
            Save();
            return entity.Id;
        }

        public void Update(T entity)
        {
            var oldEntity = this.Find(a => a.Id == entity.Id).SingleOrDefault();
            if (oldEntity == null) throw new Exception("Could not find searched for object of type" + typeof(T) + " with id " + entity.Id);

            _context.Entry(oldEntity).CurrentValues.SetValues(entity);

            Save();
        }

        public void Delete(T entity)
        {
            EntitySet.Remove(entity);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
