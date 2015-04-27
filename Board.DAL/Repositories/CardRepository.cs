using Board.Data.Models;
using Board.DAL.EF;

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
