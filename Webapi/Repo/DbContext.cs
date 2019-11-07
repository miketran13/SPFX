using Microsoft.EntityFrameworkCore;
using SPFX.Models;

namespace SPFX.Repo
{
    public class AdventureWorksContext : DbContext
    {
        public AdventureWorksContext (DbContextOptions<AdventureWorksContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .ToTable("Product", schema: "Production");
    }
    }
}