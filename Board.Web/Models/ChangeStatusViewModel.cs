using System;
using Board.Data.Enums;

namespace Board.Web.Models
{
    public class ChangeStatusViewModel
    {
        public int Id { get; set; }
        public Status NewStatus{ get; set; }
    }
}