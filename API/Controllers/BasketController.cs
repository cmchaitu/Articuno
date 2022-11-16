using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using API.DTOs;
using Microsoft.CodeAnalysis;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly StoreDBContext _context;

        public BasketController(StoreDBContext context)
        {
            _context = context;
        }

        // GET: api/Basket
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) { return NoContent(); }
            return MapBaskettoDTO(basket);
        }

        private BasketDTO MapBaskettoDTO(Basket basket)
        {
            return new BasketDTO
            {
                BuyerID = basket.BuyerID,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductID = item.ProductID,
                    Brand = item.Product.Brand,
                    Name = item.Product.Name,
                    PictureURL = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    Type = item.Product.Type
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemstoBasket(int productid, int quantity)
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) { basket = CreateBasket(); }
            Product product = await _context.Products.FindAsync(productid);
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtRoute("GetBasket", MapBaskettoDTO(basket));
            else
                return BadRequest(new ProblemDetails { Title = "error adding items to basket" });
        }

        private Basket CreateBasket()
        {
            var buyerID = Guid.NewGuid().ToString();
            var cookieoptions = new CookieOptions
            { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerID", buyerID, cookieoptions);
            var basket = new Basket() { BuyerID = buyerID };
            _context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemsBasket(int ProductID, int quantity)
        {
            Basket basket = await RetrieveBasket();
            basket.RemoveItem(ProductID, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return NoContent();
            else
                return BadRequest(new ProblemDetails { Title = "error removing items to basket" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerID == Request.Cookies["buyerID"]);
        }
    }
}