﻿using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TractorController : ControllerBase
    {
        private Tracto tractores = new Tracto();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return tractores.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblTracto tractor)
        {
            return tractores.Add(tractor);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblTracto tractor)
        {
            return tractores.Update(tractor);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return tractores.Delete(id);
        }
    }
}
