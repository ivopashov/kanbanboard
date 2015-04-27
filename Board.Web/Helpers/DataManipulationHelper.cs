using System.Collections.Generic;
using Board.Data.Enums;
using Board.Web.Models;

namespace Board.Web.Helpers
{
    public static class DataManipulationHelper
    {
        public static Dictionary<Status, List<object>> ParseListOfCardsToDictionaryByStatuses(
            List<CardViewModel> vmCards)
        {
            var dict = new Dictionary<Status, List<object>>();
            foreach (var item in vmCards)
            {
                if (dict.ContainsKey(item.Status))
                {
                    dict[item.Status].Add(item);
                }
                else
                {
                    dict.Add(item.Status, new List<object> { item });
                }
            }
            return dict;
        }
    }
}