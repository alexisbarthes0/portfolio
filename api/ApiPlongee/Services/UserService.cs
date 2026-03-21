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

    public async Task<bool> VerifyPasswordAsync(string entered, User user)
    {
        if (string.IsNullOrWhiteSpace(entered) || string.IsNullOrWhiteSpace(user.MotDePasse))
            return false;

        var stored = user.MotDePasse.Trim();

        if (LooksLikeBcryptHash(stored))
        {
            try
            {
                return BCrypt.Net.BCrypt.Verify(entered, stored);
            }
            catch (SaltParseException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        if (entered == stored)
        {
            var newHash = BCrypt.Net.BCrypt.HashPassword(entered);
            await _users.UpdateOneAsync(
                u => u.Id == user.Id,
                Builders<User>.Update.Set(u => u.MotDePasse, newHash));
            return true;
        }

        return false;
    }

    private static bool LooksLikeBcryptHash(string s)
    {
        if (s.Length < 59)
            return false;
        return s.StartsWith("$2a$", StringComparison.Ordinal)
            || s.StartsWith("$2b$", StringComparison.Ordinal)
            || s.StartsWith("$2y$", StringComparison.Ordinal);
    }
}
