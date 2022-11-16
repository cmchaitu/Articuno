namespace API.DTOs
{
    public class BasketDTO
    {
        public string BuyerID { get; set; }
        public List<BasketItemDTO> Items { get; set; }
    }
}