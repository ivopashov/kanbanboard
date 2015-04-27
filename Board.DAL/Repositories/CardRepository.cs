using Board.DAL.EF;
using Board.Data.Models;
using System;

namespace Board.DAL.Repositories
{
    public class CardRepository : GenericEfRepository<Card>
    {
        public CardRepository(BoardContext context)
            : base(context)
        {

        }
    }
}
