using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Board.Data.Enums;
using Board.Data.Models;
using Board.DAL.Repositories;
using Board.Web.Helpers;
using Board.Web.Logging;
using Board.Web.Models;

namespace Board.Web.Controllers
{
    public class CardController : ApiController
    {
        private readonly CardRepository _cardRepository;
        private readonly ILogger _logger;

        public CardController(CardRepository cardRepository, ILogger logger)
        {
            if (cardRepository == null) throw new NullReferenceException("cardRepository");
            if (logger == null) throw new NullReferenceException("logger");
            _cardRepository = cardRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route("api/cards/getall")]
        public IHttpActionResult GetAll()
        {
            try
            {
                var dbCardEntities = _cardRepository.GetAll().ToList();
                // it doesn't make much sense to map here as vm and db objects are equivalent
                //but a good practice says that it is generally not advisable to return db objects to the front end
                var vmCards = Mapper.Map<List<CardViewModel>>(dbCardEntities);

                var result = DataManipulationHelper.ParseListOfCardsToDictionaryByStatuses(vmCards);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.Error("Could not retrieve cards. Exception Message: " + e.Message);
                return BadRequest("Could not retrieve cards");
            }
        }

        [HttpGet]
        [Route("api/cards/getall/bystatus")]
        public IHttpActionResult GetAllByStatus(Status status)
        {
            try
            {
                var dbCardEntities = _cardRepository.GetAll().Where(a => a.Status == status).ToList();
                var vmCards = Mapper.Map<List<CardViewModel>>(dbCardEntities);

                return Ok(vmCards);
            }
            catch (Exception e)
            {
                _logger.Error("Could not retrieve cards. Exception Message: " + e.Message);
                return BadRequest("Could not retrieve cards");
            }
        }

        [HttpPost]
        [Route("api/cards/status")]
        public IHttpActionResult ChangeCardStatus(ChangeStatusViewModel vm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid View Model");
            try
            {
                var cardDbEntity = _cardRepository.GetById(vm.Id);
                cardDbEntity.Status = vm.NewStatus;
                _cardRepository.Update(cardDbEntity);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.Error("Could not update card status with id: " + vm.Id + " . Exception Message: " + e.Message);
                return BadRequest("Could not update card's status");
            }
        }

        [HttpPost]
        [Route("api/cards/create")]
        public IHttpActionResult CreateNewCard(CreateCardViewModel vm)
        {
            if (!ModelState.IsValid) return BadRequest("Invalid View Model");
            try
            {
                var dbCardEntity = Mapper.Map<Card>(vm);
                int id = _cardRepository.Add(dbCardEntity);
                var createdDbCard = _cardRepository.GetById(id);
                return Ok(createdDbCard);
            }
            catch (Exception e)
            {
                _logger.Error("Could not create card. Exception Message: " + e.Message);
                return BadRequest("Could not update card's status");
            }
        }

        [HttpGet]
        [Route("api/statuses/getall")]
        public IHttpActionResult GetAllStatuses()
        {
            try
            {
                var values = Enum.GetValues(typeof(Status));
                return Ok(values);
            }
            catch (Exception e)
            {
                _logger.Error("Could not retrieve statuses. Exception Message: " + e.Message);
                return BadRequest("Could not retrieve statuses");
            }
        }

        [HttpGet]
        [Route("api/cards/remove")]
        public IHttpActionResult RemoveItem([FromUri]int id)
        {
            try
            {
                var item = _cardRepository.GetById(id);
                _cardRepository.Delete(item);
                return Ok(id);
            }
            catch (Exception e)
            {
                _logger.Error("Could not delete item. Exception Message: " + e.Message);
                return BadRequest("Could not delete item");
            }
        }
    }
}
