using System;
using Board.Data.Enums;
using Board.Data.Interfaces;

namespace Board.Data.Models
{
    public class Card : IIdentifiable
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public CardType Type{ get; set; }
        public Status Status { get; set; }
    }
}
