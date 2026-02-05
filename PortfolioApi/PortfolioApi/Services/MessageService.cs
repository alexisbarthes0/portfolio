using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class MessageService
{
    private readonly IMongoCollection<Message> _messagesCollection;

    public MessageService(IOptions<MongoDbSettings> mongoSettings)
    {
        var settings = mongoSettings.Value;

        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);

        _messagesCollection = database.GetCollection<Message>(settings.MessagesCollectionName);
    }

    public async Task CreateAsync(Message message)
    {
        await _messagesCollection.InsertOneAsync(message);
    }
}


