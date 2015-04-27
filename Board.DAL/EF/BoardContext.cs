using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using Board.Data.Models;

namespace Board.DAL.EF
{
    public class BoardContext : DbContext
    {
        public BoardContext()
            : base("BoardContext")
        {

        }

        public DbSet<Card> Cards { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
