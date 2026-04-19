using JapaneseFood.Entity.Article;
using JapaneseFood.Entity.Banner;
using JapaneseFood.Entity.Category;
using JapaneseFood.Entity.Discount;
using JapaneseFood.Entity.Image;
using JapaneseFood.Entity.Order;
using JapaneseFood.Entity.Product;
using JapaneseFood.Entity.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
       : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
                                    .Where(t => t.GetInterfaces()
                                    .Any(gi => gi.IsGenericType
                                    && gi.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>))).ToList();

            foreach (var type in typesToRegister)
            {
                var configurationInstance = Activator.CreateInstance(type);
                if (configurationInstance != null)
                {
                    modelBuilder.ApplyConfiguration((dynamic)configurationInstance);
                }
            }
            modelBuilder.Entity<UserEntities>()
                .HasData(
                   new UserEntities
                   {
                       CreatedAt = new DateTime(2024, 01, 01),
                       FullName = "admin",
                       Id = 1,
                       Password = "123",
                       PhoneNumber = "098765432",
                       UserName = "admin@gmail.com",
                       IsActive = true
                   }
            );
            modelBuilder.Entity<ProductEntities>()
                .HasMany(p => p.Images)
                .WithOne(i => i.Product)
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        public virtual DbSet<CategoryEntities> Categorys { get; set; }
        public virtual DbSet<BannerEntities> Banners { get; set; }
        public virtual DbSet<CatalogEntities> Catalogs { get; set; }
        public virtual DbSet<UserEntities> Users { get; set; }
        public virtual DbSet<ProductEntities> Products { get; set; }
        public virtual DbSet<ProductLikeEntities> ProductLikes { get; set; }
        public virtual DbSet<ProductViewEntities> ProductViews { get; set; }
        public virtual DbSet<ImageEntities> Images { get; set; }
        public virtual DbSet<OrderEntities> Orders { get; set; }
        public virtual DbSet<OrderDetailEntities> OrderDetails { get; set; }
        public virtual DbSet<DiscountEntities> Discounts { get; set; }
    }
}
