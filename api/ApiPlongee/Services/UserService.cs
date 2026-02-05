using MongoDB.Driver;
using ApiPlongee.Models;
using BCrypt.Net;

namespace ApiPlongee.Services;

public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _users = database.GetCollection<User>(config["MongoDB:UsersCollection"]);
    }

    public async Task<List<User>> GetAsync() =>
        await _users.Find(_ => true).ToListAsync();

    public async Task<User?> GetByIdentifiantAsync(string identifiant) =>
        await _users.Find(u => u.Identifiant == identifiant).FirstOrDefaultAsync();

    public async Task CreateAsync(User user)
    {
        user.MotDePasse = BCrypt.Net.BCrypt.HashPassword(user.MotDePasse);
        await _users.InsertOneAsync(user);
    }

    public bool VerifyPassword(string entered, string storedHash) =>
        BCrypt.Net.BCrypt.Verify(entered, storedHash);
}
