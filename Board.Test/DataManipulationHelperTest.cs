using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Board.Data.Enums;
using Board.Data.Models;
using Board.DAL.EF;
using Board.DAL.Repositories;
using Board.Web.Controllers;
using Board.Web.Helpers;
using Board.Web.Logging;
using Board.Web.Models;
using NSubstitute;
using NSubstitute.Routing.Handlers;
using NUnit.Framework;

namespace Board.Test
{
    [TestFixture]
    public class DataManipulationHelperTest
    {

        [Test]
        public void ParseListOfCardsToDictionaryByStatuses_TestWithListOfCardsAllStatuses()
        {
            //Arrange
            var cards = InitializeCardsFromAllStatuses();
            //Act
            var result = DataManipulationHelper.ParseListOfCardsToDictionaryByStatuses(cards);
            //Assert
            Assert.AreEqual(result.Keys.Count,3);
            Assert.IsTrue(result.ContainsKey(Status.NotStarted));
            Assert.IsTrue(result.ContainsKey(Status.InProgress));
            Assert.IsTrue(result.ContainsKey(Status.Done));
        }
        [Test]
        public void ParseListOfCardsToDictionaryByStatuses_TestWithListOfCardsIfInProgressStatusOnly()
        {
            //Arrange
            var cards = InitializeCardsWithInProgressStatusOnly();
            //Act
            var result = DataManipulationHelper.ParseListOfCardsToDictionaryByStatuses(cards);
            //Assert
            Assert.AreEqual(result.Keys.Count, 1);
            Assert.IsTrue(!result.ContainsKey(Status.NotStarted));
            Assert.IsTrue(result.ContainsKey(Status.InProgress));
            Assert.IsTrue(!result.ContainsKey(Status.Done));
        }

        private List<CardViewModel> InitializeCardsWithInProgressStatusOnly()
        {
            var cards = new List<CardViewModel>() 
            { 
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="bug-111",
                    Type=CardType.Bug
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="bug-112",
                    Type=CardType.Bug
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="story-212",
                    Type=CardType.Story
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="task-312",
                    Type=CardType.Task
                }
            };

            return cards;
        }
        private List<CardViewModel> InitializeCardsFromAllStatuses()
        {
            var cards = new List<CardViewModel>() 
            { 
                new CardViewModel()
                {
                    Status=Status.Done,
                    Title="bug-111",
                    Type=CardType.Bug
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="bug-112",
                    Type=CardType.Bug
                },
                new CardViewModel()
                {
                    Status=Status.NotStarted,
                    Title="bug-113",
                    Type=CardType.Bug
                },
                 new CardViewModel()
                {
                    Status=Status.Done,
                    Title="story-211",
                    Type=CardType.Story
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="story-212",
                    Type=CardType.Story
                },
                new CardViewModel()
                {
                    Status=Status.NotStarted,
                    Title="story-213",
                    Type=CardType.Story
                },
                  new CardViewModel()
                {
                    Status=Status.Done,
                    Title="task-311",
                    Type=CardType.Task
                },
                new CardViewModel()
                {
                    Status=Status.InProgress,
                    Title="task-312",
                    Type=CardType.Task
                },
                new CardViewModel()
                {
                    Status=Status.NotStarted,
                    Title="task-313",
                    Type=CardType.Task
                }
            };

            return cards;
        }
    }
}
