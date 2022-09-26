using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreDBContext : DbContext
    {
        public StoreDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products{ get; set; }
    }
}

