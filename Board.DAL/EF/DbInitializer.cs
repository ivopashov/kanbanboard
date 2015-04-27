using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using Board.Data.Enums;
using Board.Data.Models;

namespace Board.DAL.EF
{
    public class DbInitializer : DropCreateDatabaseIfModelChanges<BoardContext>
    {
        protected override void Seed(BoardContext context)
        {
            var cards = new List<Card>() 
            { 
                new Card()
                {
                    Status=Status.Done,
                    Title="bug-111",
                    Type=CardType.Bug
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="bug-112",
                    Type=CardType.Bug
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="bug-113",
                    Type=CardType.Bug
                },
                 new Card()
                {
                    Status=Status.Done,
                    Title="story-211",
                    Type=CardType.Story
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="story-212",
                    Type=CardType.Story
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="story-213",
                    Type=CardType.Story
                },
                  new Card()
                {
                    Status=Status.Done,
                    Title="task-311",
                    Type=CardType.Task
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="task-312",
                    Type=CardType.Task
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="task-313",
                    Type=CardType.Task
                },
                
            };

            cards.ForEach(a => context.Cards.AddOrUpdate(b => b.Id, a));
            context.SaveChanges();
            base.Seed(context);
        }
    }
}
