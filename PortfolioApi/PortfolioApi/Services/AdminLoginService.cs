using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class AdminLoginService
{
    private readonly IMongoCollection<AdminLogin> _adminLoginsCollection;
    private readonly PasswordHasher _passwordHasher;

    public AdminLoginService(IOptions<MongoDbSettings> mongoSettings, PasswordHasher passwordHasher)
    {
        _passwordHasher = passwordHasher;

        var settings = mongoSettings.Value;

        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);

        _adminLoginsCollection = database.GetCollection<AdminLogin>(settings.AdminLoginsCollectionName);
    }

    public async Task<AdminLogin?> GetByLoginAsync(string login) =>
        await _adminLoginsCollection.Find(a => a.Login == login).FirstOrDefaultAsync();

    public async Task CreateAsync(string login, string password)
    {
        var hash = _passwordHasher.HashPassword(password);

        var adminLogin = new AdminLogin
        {
            Login = login,
            PasswordHash = hash
        };

        await _adminLoginsCollection.InsertOneAsync(adminLogin);
    }

    public bool VerifyPassword(string password, string hash) =>
        _passwordHasher.VerifyPassword(password, hash);
}



