namespace API.Entities
{
    public class Basket
    {
        public int ID { get; set; }
        public string BuyerID { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductID != product.Id))
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            var existingitem = Items.FirstOrDefault(item => item.ProductID == product.Id);
            if (existingitem != null) { existingitem.Quantity += quantity; }
        }

        public void RemoveItem(int productID, int quantity)
        {
            var existingitem = Items.FirstOrDefault(item => item.ProductID == productID);
            if (existingitem != null)
            {
                existingitem.Quantity -= quantity;
            }
            else return;
            if (existingitem.Quantity == 0) { Items.Remove(existingitem); }
        }
    }
}