using AutoMapper;
using JapaneseFood.Common.Enums;
using JapaneseFood.Common.Helper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Order;
using JapaneseFood.Model;
using JapaneseFood.Model.Order;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace vqt_japanese_food_web.Controllers
{
    public class CartController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        public CartController(DataContext context,
            IMapper mapper,
            ILogger<HomeController> logger,
            IEmailSender emailSender    )
        {
            this._context = context;
            this._mapper = mapper;
            _logger = logger;
            _emailSender = emailSender;
        }

        public IActionResult Index()
        {
            return View();
        }

        public ActionResult CheckOut()
        {
            var model = new OrderDto();
            var userJson = HttpContext.Session.GetString("user_customer");
            if (!string.IsNullOrEmpty(userJson))
            {
                var user = JsonConvert.DeserializeObject<UserSessionDto>(userJson);
                if (user != null)
                {
                    model.UserId = user.Id;
                    model.FullName = user.FullName;
                    model.UserName = user.UserName;
                    model.Phone = user.Phone;
                    model.Address = user.Address;
                }
            }

            return View(model);
        }

        [HttpPost]
        public async Task<JsonResult> CheckOut(OrderDto model)
        {
            var result = new OrderResponse
            {
                Success = true
            };
            if (string.IsNullOrEmpty(model.FullName))
            {
                result.Failure = true;
                result.Error = "Please enter your full name.";
            }
            else if (string.IsNullOrEmpty(model.Phone))
            {
                result.Failure = true;
                result.Error = "Please enter your phone number.";
            }
            else if (string.IsNullOrEmpty(model.Address))
            {
                result.Failure = true;
                result.Error = "Please enter your address.";
            }

            // Check if there are order details
            if (model.OrderDetails == null || model.OrderDetails.Count == 0)
            {
                result.Failure = true;
                result.Error = "Please select products before placing an order.";
            }

            if (!result.Failure)
            {
                int totalQuantity = 0;
                decimal totalPrice = 0;

                if (model.OrderDetails != null)
                {
                    foreach (var item in model.OrderDetails)
                    {
                        item.OrderId = model.Id;
                        totalQuantity += item.Quantity;
                        totalPrice += item.Price * item.Quantity;
                    }
                }

                model.SubTotal = totalPrice;
                model.Quantity = totalQuantity;
                model.Code = $"Invoice_{JapaneseFood.Common.CodeGeneratorExtension.GenerateOrderCode()}";
                model.Status = (int)EnumCommons.OrderStatus.Inprocessing;

                var orderEntity = _mapper.Map<OrderDto, OrderEntities>(model);
                var orderDetailEntities = _mapper.Map<List<OrderDetailDto>, List<OrderDetailEntities>>(model.OrderDetails);

                try
                {
                    using var transaction = await _context.Database.BeginTransactionAsync();
                    try
                    {
                        _context.Orders.Add(orderEntity);
                        _context.OrderDetails.AddRange(orderDetailEntities);
                        await _context.SaveChangesAsync();

                        await transaction.CommitAsync();

                        result.Success = true;
                        result.Error = "";

                        var itemsHtml = "<ul>";
                        foreach (var item in model.OrderDetails)
                        {
                            var itemTotal = item.Quantity * item.Price;

                            itemsHtml += $@"
                            <li>
                                <b>{item.ProductName}</b><br/>
                                Số lượng: {item.Quantity}<br/>
                                Đơn giá: {FormatVnd(item.Price)}<br/>
                                Thành tiền: <b>{FormatVnd(itemTotal)}</b>
                            </li><br/>";
                        }
                        itemsHtml += "</ul>";

                        // Prepare email content with order list
                        string emailBody = $@"
                       <div>
                            <p><b> user name:</b> {model.FullName}</p>
                            <p><b>Email:</b> {model.UserName}</p>
                            <p><b>Phone Number:</b> {model.Phone}</p>
                            <p><b>Address:</b> {model.Address}</p>
                            <p><b>Mã đơn hàng:</b> {model.Code}</p>

                            <p><b>Danh sách sản phẩm:</b></p>
                            {itemsHtml}

                            <p><b>Subtotal:</b> {FormatVnd(model.SubTotal)}</p>
                            <p><b>Tổng số lượng:</b> {model.Quantity}</p>
                        </div>";

                        if (!string.IsNullOrEmpty(model.UserName))
                        {
                            await _emailSender.SendAsync(
                                model.UserName,
                                "Thank you for your order!  ",
                                $"We have received your order successfully. <br/>{emailBody}"
                            );
                        }
                    }
                    catch (Exception)
                    {
                        result.Failure = true;
                        result.Error = "Failed to create the order.";
                        await transaction.RollbackAsync();
                    }
                }
                catch
                {
                    result.Failure = true;
                    result.Error = "An unexpected error occurred while processing the order.";
                }
            }

            return Json(new { success = true });
        }

        private string FormatVnd(decimal price)
        {
            return string.Format(new System.Globalization.CultureInfo("vi-VN"), "{0:N0} vnđ", price);
        }
    }
}