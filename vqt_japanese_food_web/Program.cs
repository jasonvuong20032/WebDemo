using AutoMapper;
using JapaneseFood.Common.Helper;
using JapaneseFood.Entity;
using JapaneseFood.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin();
    });
});

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.Name = "User";
});

builder.Services.AddDbContextPool<DataContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("VQTConnections"),
        sql => sql.MigrationsAssembly("JapaneseFood.Entity")
    ),
    poolSize: 64
);


builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection("SmtpSettings")
);
builder.Services.AddScoped<IEmailSender, EmailSender>();

// ---- HttpContextAccessor ----
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// ---- AutoMapper ----
builder.Services.AddAutoMapper(cfg =>
{
    cfg.ValueTransformers.Add<string>(x => x ?? string.Empty);
    cfg.ValueTransformers.Add<int?>(x => x ?? 0);
    cfg.ValueTransformers.Add<bool?>(x => x ?? false);
},
typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseSession();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "Admin",
    pattern: "{area:exists}/{controller=SignInMng}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
