using Board.Data.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Board.Web.Models
{
    public class CreateCardViewModel
    {
        public string Title { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public CardType Type { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }
    }
}