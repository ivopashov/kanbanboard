using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Collections.Generic;
using Board.Data.Models;
using Board.Data.Enums;

namespace Board.DAL.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<Board.DAL.EF.BoardContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "Board.DAL.EF.BoardContext";
            AutomaticMigrationDataLossAllowed = false;
        }

        protected override void Seed(Board.DAL.EF.BoardContext context)
        {

            var cards = new List<Card>() 
            { 
                new Card()
                {
                    Status=Status.Done,
                    Title="QCCUT-111",
                    Type=CardType.Bug
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="QCCUT-112",
                    Type=CardType.Bug
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="QCCUT-113",
                    Type=CardType.Bug
                },
                 new Card()
                {
                    Status=Status.Done,
                    Title="QCCUT-211",
                    Type=CardType.Story
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="QCCUT-212",
                    Type=CardType.Story
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="QCCUT-213",
                    Type=CardType.Story
                },
                  new Card()
                {
                    Status=Status.Done,
                    Title="QCCUT-311",
                    Type=CardType.Task
                },
                new Card()
                {
                    Status=Status.InProgress,
                    Title="QCCUT-312",
                    Type=CardType.Task
                },
                new Card()
                {
                    Status=Status.NotStarted,
                    Title="QCCUT-313",
                    Type=CardType.Task
                },
                
            };

            cards.ForEach(a => context.Cards.AddOrUpdate(b => b.Id, a));
            context.SaveChanges();
        }
    }
}