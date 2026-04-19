using AutoMapper;
using JapaneseFood.Common.Helper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Product;
using JapaneseFood.Entity.User;
using JapaneseFood.Model;
using JapaneseFood.Model.Catalog;
using JapaneseFood.Model.Category;
using JapaneseFood.Model.Image;
using JapaneseFood.Model.Order;
using JapaneseFood.Model.Product;
using JapaneseFood.Model.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using vqt_japanese_food_web.Models;
using static JapaneseFood.Common.Enums.EnumCommons;

namespace vqt_japanese_food_web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public HomeController(DataContext context, 
            IMapper mapper,
            ILogger<HomeController> logger,
            IEmailSender emailSender)
        {
            this._context = context;
            this._mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
        }

        public async Task<IActionResult> Index()
        {
            var model = new HomeViewModels();

            try
            {
                // ===== Catalogs (Top 5)
                model.Catalogs = await _context.Catalogs
                    .AsNoTracking()
                    .Where(x => !x.IsDelete && x.IsActive)
                    .OrderBy(x => x.CreatedAt)
                    .Take(5)
                    .Select(x => new CatalogDto
                    {
                        Id = x.Id,
                        Name = x.Name
                    })
                    .ToListAsync();

                // ===== Categories (Top 10)
                model.Categories = await _context.Categorys
                    .AsNoTracking()
                    .Where(x => !x.IsDelete && x.IsActive)
                    .OrderBy(x => x.CreatedAt)
                    .Take(10)
                    .Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        CatalogId = x.CatalogId,
                        CatalogName = x.Catalog.Name
                    })
                    .ToListAsync();

                // ===== Product Sales (Top 15)
                model.ProductSales.Products = await _context.Products
                    .AsNoTracking()
                    .Where(p => !p.IsDelete && p.IsActive
                             && p.IsOnSale
                             && p.DiscountId.HasValue
                             && p.DiscountId > 0)
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(15)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Code = p.Code,
                        Name = p.Name,
                        Price = p.Price,
                        Quantity = p.Quantity,
                        IsAvailable = p.IsAvailable,
                        IsOnSale = p.IsOnSale,
                        SalePrice = p.SalePrice,
                        ShortDescription = p.ShortDescription,
                        CategoryName = p.Category.Name,
                        Images = p.Images
                            .OrderBy(i => i.SortOrder)
                            .Select(i => new ImageDto
                            {
                                Id = i.Id,
                                Alt = i.Alt,
                                Title = i.Title,
                                ImageUrl = i.ImageUrl,
                                ProductId = i.ProductId
                            }).ToList(),
                        IsActive = p.IsActive,
                        IsDelete = p.IsDelete,
                        CreatedAt = p.CreatedAt,
                        CreatedBy = p.CreatedBy,
                        UpdatedAt = p.UpdatedAt,
                        UpdatedBy = p.UpdatedBy
                    })
                    .ToListAsync();

                // ===== Load ALL data once
                var catalogs = await _context.Catalogs
                    .AsNoTracking()
                    .Where(x => !x.IsDelete && x.IsActive)
                    .OrderBy(x => x.CreatedAt)
                    .ToListAsync();
                
                var categories = await _context.Categorys
                    .AsNoTracking()
                    .Where(x => !x.IsDelete && x.IsActive)
                    .OrderBy(x => x.CreatedAt)
                    .ToListAsync();

                var products = await _context.Products
                    .AsNoTracking()
                    .Include(x => x.Category)
                    .Include(x => x.Images)
                    .Where(x => !x.IsDelete && x.IsActive)
                    .OrderByDescending(x => x.CreatedAt)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Code = p.Code,
                        Name = p.Name,
                        Price = p.Price,
                        Quantity = p.Quantity,
                        IsAvailable = p.IsAvailable,
                        IsOnSale = p.IsOnSale,
                        SalePrice = p.SalePrice,
                        ShortDescription = p.ShortDescription,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.Name,
                        ImageUrl = p.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault() ?? string.Empty,
                        Images = p.Images != null
                            ? p.Images
                                .OrderBy(i => i.SortOrder)
                                .Select(i => new ImageDto
                                {
                                    Id = i.Id,
                                    Alt = i.Alt,
                                    Title = i.Title,
                                    ImageUrl = i.ImageUrl,
                                    ProductId = i.ProductId
                                }).ToList()
                            : new List<ImageDto>(),

                        CreatedAt = p.CreatedAt
                    })
                    .ToListAsync();


                model.Products = catalogs.Select(c => new CatalogViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Categories = categories
                        .Where(cat => cat.CatalogId == c.Id)
                        .Select(cat => new CategoryViewModel
                        {
                            Id = cat.Id,
                            Name = cat.Name,
                            Products = products
                                .Where(p => p.CategoryId == cat.Id)
                                .Take(10)
                                .ToList()
                        }).ToList()
                }).ToList();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Home Index error");
                throw;
            }

            return View(model);
        }

        public async Task<IActionResult> Search(string q)
        {
            var model = new HomeViewModels();

            try
            {
                var query = _context.Products
                    .AsNoTracking()
                    .Include(x => x.Category)
                    .Include(x => x.Images)
                    .Where(x => !x.IsDelete && x.IsActive);


                if (!string.IsNullOrWhiteSpace(q))
                {
                    query = query.Where(x => x.Name.Contains(q) || (x.ShortDescription != null && x.ShortDescription.Contains(q)));
                }

                query = query.OrderByDescending(x => x.CreatedAt);

                var products = await query
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Code = p.Code,
                        Name = p.Name,
                        Price = p.Price,
                        Quantity = p.Quantity,
                        IsAvailable = p.IsAvailable,
                        IsOnSale = p.IsOnSale,
                        SalePrice = p.SalePrice,
                        ShortDescription = p.ShortDescription,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.Name,
                        ImageUrl = p.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault() ?? string.Empty,
                        Images = p.Images != null
                            ? p.Images.OrderBy(i => i.SortOrder)
                                .Select(i => new ImageDto
                                {
                                    Id = i.Id,
                                    Alt = i.Alt,
                                    Title = i.Title,
                                    ImageUrl = i.ImageUrl,
                                    ProductId = i.ProductId
                                }).ToList()
                            : new List<ImageDto>(),
                        CreatedAt = p.CreatedAt
                    })
                    .ToListAsync();


                model.ProductSearch = products;

                ViewBag.KeySearch = q;
                model.TotalRecords = products.Count();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Home Index error");
                throw;
            }

            return View(model);
        }

        public async Task<IActionResult> Catalog(long id)
        {
            var model = new HomeViewModels();

            try
            {
                var query = _context.Products
                    .AsNoTracking()
                    .Include(x => x.Category)
                        .ThenInclude(c => c.Catalog)
                    .Include(x => x.Images)
                    .Where(x => !x.IsDelete && x.IsActive);


                query = query.Where(p => p.Category.Catalog.Id == id);

                query = query.OrderByDescending(x => x.CreatedAt);

                var products = await query
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Code = p.Code,
                        Name = p.Name,
                        Price = p.Price,
                        Quantity = p.Quantity,
                        IsAvailable = p.IsAvailable,
                        IsOnSale = p.IsOnSale,
                        SalePrice = p.SalePrice,
                        ShortDescription = p.ShortDescription,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.Name,
                        ImageUrl = p.Images.OrderBy(i => i.SortOrder).Select(i => i.ImageUrl).FirstOrDefault() ?? string.Empty,
                        Images = p.Images != null
                            ? p.Images.OrderBy(i => i.SortOrder)
                                .Select(i => new ImageDto
                                {
                                    Id = i.Id,
                                    Alt = i.Alt,
                                    Title = i.Title,
                                    ImageUrl = i.ImageUrl,
                                    ProductId = i.ProductId
                                }).ToList()
                            : new List<ImageDto>(),
                        CreatedAt = p.CreatedAt
                    })
                    .ToListAsync();


                model.ProductSearch = products;

                model.CatalogId = id;
                model.CatalogName = (await _context.Catalogs
                    .Where(c => c.Id == id)
                    .Select(c => c.Name)
                    .FirstOrDefaultAsync());
                model.TotalRecords = products.Count();
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, "Home Index error");
                throw;
            }

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Filter(ProductFilterRequest request)
        {
            var query = _context.Products
            .AsNoTracking()
            .Where(p => !p.IsDelete && p.IsActive);

            if (request.CatalogId.HasValue)
            {
                query = query.Where(p => p.Category.Catalog.Id == request.CatalogId);
            }

            if (request.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == request.CategoryId);
            }

            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(x => x.Name.Contains(request.Search) || (x.ShortDescription != null && x.ShortDescription.Contains(request.Search)));
            }

            query = request.Sorting switch
            {
                "price_asc" => query.OrderBy(p => p.Price),
                "price_desc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderByDescending(p => p.CreatedAt)
            };

            var products = await query
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    IsAvailable = p.IsAvailable,
                    IsOnSale = p.IsOnSale,
                    SalePrice = p.SalePrice,
                    ShortDescription = p.ShortDescription,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    ImageUrl = p.Images
                        .OrderBy(i => i.SortOrder)
                        .Select(i => i.ImageUrl)
                        .FirstOrDefault() ?? string.Empty
                })
                .ToListAsync();

            return PartialView("_ListItem", products);
        }
        public async Task<ActionResult> Quickview(int q = 0)
        {
            var model = new ProductDto();
            try
            {
                var entity = await _context.Products
                    .Where(w => w.Id == q)
                    .FirstOrDefaultAsync();

                if (entity == null)
                {
                    return RedirectToAction("Index");
                }

                model = _mapper.Map<ProductEntities, ProductDto>(entity);
                model.Images = _context.Images
                    .Where(w => w.ProductId == q)
                    .OrderBy(o => o.SortOrder)
                    .Select(s => new ImageDto
                    {
                        Id = s.Id,
                        ImageUrl = s.ImageUrl,
                        Alt = s.Alt,
                        Title = s.Title,
                        SortOrder = s.SortOrder,
                        ProductId = s.ProductId
                    }).ToList();
                if (model.Images != null && model.Images.Any())
                {
                    model.ImageUrl = model.Images[0].ImageUrl;
                }
            }
            catch (Exception ex) { }
            return PartialView("_PartialProductInfo", model);
        }

        [HttpPost]
        public async Task<ActionResult> Subscribe(string email = "")
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest(new { message = "Email is required" });

            try
            {
                var subject = "Thank you for visiting our store!";
                var body = $@"
                    <p>Hello,</p>
                    <p>Thank you for subscribing to our newsletter. We appreciate you visiting our store!</p>
                    <p>Best regards,<br/>Ranko restaurant</p>
        ";

                await _emailSender.SendAsync(email, subject, body);

                return Ok(new { message = "Thank you for subscribing! Please check your email." });
            }
            catch
            {
                return StatusCode(500, new { message = "Failed to subscribe. Please try again." });
            }
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            var user = _context.Users
                .Where(z => z.IsActive && z.UserName == username && z.Password == password)
                .Select(s =>
                    new UserSessionDto()
                    {
                        Id = s.Id,
                        FullName = s.FullName,
                        UserName = s.UserName,
                        RoleId = s.RoleId,
                        Avatar = s.Avatar,
                        Phone = s.PhoneNumber,
                        Address = s.Address
                    }).FirstOrDefault();
            if (user != null)
            {
                HttpContext.Session.SetString("user_customer", JsonConvert.SerializeObject(user));
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, message = "Invalid username or password" });
            }
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserDto model)
        {
            model.BirthDate = DateTime.Now;
            if (!ModelState.IsValid)
                return Json(new { success = false, message = "Please fill in all required fields." });

            if (model.Password != model.ConfirmPassword)
                return Json(new { success = false, message = "Passwords do not match." });

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == model.UserName);

            if (existingUser != null)
                return Json(new { success = false, message = "Username already exists." });

            var entity = new UserEntities
            {
                UserName = model.UserName,
                Password = model.Password,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                BirthDate = model.BirthDate,
                Address = model.Address,
                Gender = model.Gender,
                CreatedAt = DateTime.Now,
                CreatedBy = model.UserName,
                RoleId = (int)ERoleType.Customer,
                IsActive = false,
                ActivationCode = JapaneseFood.Common.CodeGeneratorExtension.GenerateActivateCode()
            };

            _context.Users.Add(entity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                await _emailSender.SendAsync(entity.UserName, "Activate Code", entity.ActivationCode);

                return Json(new { success = true, username = model.UserName });
            }

            return Json(new { success = false, message = "Failed to register. Please try again." });
        }

        public IActionResult ActivateAccount(string username)
        {
            var model = new ActivateUserDto { UserName = username ?? string.Empty };
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> ActivateAccount(ActivateUserDto model)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == model.UserName);

            if (user == null)
                return Json(new { success = false, message = "User not found." });

            if (user.IsActive)
                return Json(new { success = false, message = "Account already active." });

            if (user.ActivationCode != model.Code)
                return Json(new { success = false, message = "Invalid activation code." });

            if (user.CreatedAt.AddMinutes(5) < DateTime.Now)
                return Json(new { success = false, message = "Activation code expired. Please register again." });

            user.IsActive = true;
            user.ActivationCode = null;

            await _context.SaveChangesAsync();

            return Json(new { success = true, message = "Account activated successfully!" });
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Remove("user_customer");

            return RedirectToAction("Index", "Home");
        }
    }
}
