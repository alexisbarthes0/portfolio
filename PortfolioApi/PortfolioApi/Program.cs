using PortfolioApi;
using PortfolioApi.Models;
using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);


// Nom de la politique CORS
const string AllowAngularClient = "AllowAngularClient";

// CORS : autoriser Angular en dev
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowAngularClient, policy =>
    {
        policy.WithOrigins("http://localhost:4200") // URL Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});



// Configuration MongoDB
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb"));
builder.Services.AddSingleton<MessageService>();
builder.Services.AddSingleton<PasswordHasher>();
builder.Services.AddSingleton<AdminLoginService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Initialisation d'un compte admin par défaut si nécessaire
using (var scope = app.Services.CreateScope())
{
    var adminService = scope.ServiceProvider.GetRequiredService<AdminLoginService>();
    var existingAdmin = adminService.GetByLoginAsync(AdminLoginSeed.DefaultLogin).GetAwaiter().GetResult();
    if (existingAdmin is null)
    {
        adminService.CreateAsync(AdminLoginSeed.DefaultLogin, AdminLoginSeed.DefaultPassword)
            .GetAwaiter()
            .GetResult();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllowAngularClient);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
