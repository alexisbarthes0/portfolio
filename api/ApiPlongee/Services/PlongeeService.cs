using MongoDB.Driver;
using ApiPlongee.Models;

namespace ApiPlongee.Services;

public class PlongeeService
{
    private readonly IMongoCollection<Plongee> _plongees;

    public PlongeeService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _plongees = database.GetCollection<Plongee>(config["MongoDB:PlongeesCollection"]);
    }

    public async Task<List<Plongee>> GetByUserIdAsync(string userId) =>
        await _plongees.Find(p => p.UserId == userId)
            .SortByDescending(p => p.Date)
            .ToListAsync();

    public async Task<Plongee> CreateAsync(Plongee plongee)
    {
        await _plongees.InsertOneAsync(plongee);
        return plongee;
    }
}
