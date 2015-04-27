using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Board.Web.Models;
using Board.Data.Models;

namespace Board.Web.Mapping
{
    public static class InitializeAutoMapper
    {
        public static void Initialize()
        {
            CreateModelsViewModelsMaps();
            CreateViewModelsToModelsMaps();
        }

        private static void CreateModelsViewModelsMaps()
        {
            Mapper.CreateMap<Card, CardViewModel>()
                .ForMember(c => c.Id, option => option.MapFrom(src => src.Id))
                .ForMember(c => c.Status, option => option.MapFrom(src => src.Status))
                .ForMember(c => c.Title, option => option.MapFrom(src => src.Title))
                .ForMember(c => c.Type, option => option.MapFrom(src => src.Type));
        }

        private static void CreateViewModelsToModelsMaps()
        {
            Mapper.CreateMap<CreateCardViewModel, Card>()
                .ForMember(c => c.Status, option => option.MapFrom(src => src.Status))
                .ForMember(c => c.Title, option => option.MapFrom(src => src.Title))
                .ForMember(c => c.Type, option => option.MapFrom(src => src.Type));
        }
    }
}