using Ardalis.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Security.Claims;

namespace SignalRChat.Hubs
{
    [Authorize]
    public class ChatService : Hub
    {
        private readonly IRepository<WebAppDatabaseContext> _repository;
        private readonly IMessageService _messageService;
        private static readonly Dictionary<string, List<string>> _userConnections = new Dictionary<string, List<string>>();
        private static readonly object _lock = new object();

        public ChatService(IRepository<WebAppDatabaseContext> repository, IMessageService messageService)
        {
            _repository = repository;
            _messageService = messageService;
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.Claims.ToList().Where(x => x.Type == ClaimTypes.NameIdentifier).Select(x => Guid.Parse(x.Value)).FirstOrDefault().ToString();
            var connectionId = Context.ConnectionId;

            if (userId != null)
            {
                var user = await _repository.GetAsync(new UserSpec(Guid.Parse(userId)));
                if (user != null)
                {
                    user.Status = true;
                    user = await _repository.UpdateAsync(user);
                    foreach (var conv in user.StartedConversations)
                    {
                        List<string>? userConnections = null;
                        Console.WriteLine(conv.User2Id);
                        lock (_lock)
                        {
                            if (_userConnections.ContainsKey(conv.User2Id.ToString()))
                            {
                                userConnections = new List<string>(_userConnections[conv.User2Id.ToString()]);
                            }
                        }

                        if (userConnections != null)
                        {
                            foreach (var connection in userConnections)
                            {
                                await Clients.Client(connection).SendAsync("UpdateConv");
                            }
                        }
                    }

                    foreach (var conv in user.ReceivedConversations)
                    {
                        List<string>? userConnections = null;
                        lock (_lock)
                        {
                            if (_userConnections.ContainsKey(conv.User1Id.ToString()))
                            {
                                userConnections = new List<string>(_userConnections[conv.User1Id.ToString()]);
                            }
                        }

                        if (userConnections != null)
                        {
                            foreach (var connection in userConnections)
                            {
                                await Clients.Client(connection).SendAsync("UpdateConv");
                            }
                        }
                    }
                }
            }

            lock (_lock)
            {
                if (userId != null)
                {
                    if (!_userConnections.ContainsKey(userId))
                    {
                        _userConnections[userId] = new List<string>();
                    }

                    _userConnections[userId].Add(connectionId);
                }
            }

            await base.OnConnectedAsync();
        }

        public async Task SendMessageToTopic(MessageAddDTO message)
        {
            var userId = Context.User?.Claims.ToList().Where(x => x.Type == ClaimTypes.NameIdentifier).Select(x => Guid.Parse(x.Value)).FirstOrDefault();
            var response = await _messageService.AddMessageToTopic(message, userId);
            var connectionId = Context.ConnectionId;
            if (response.Error != null)
            {
                await Clients.Caller.SendAsync(response.Error.Message);
                return;
            }

            var group = await _repository.GetAsync(new GroupSpec(message.GroupId));
            if (group == null)
            {
                await Clients.Caller.SendAsync("Group not found!");
                return;
            }

            foreach (var user in group.Users)
            {
                List<string>? userConnections = null;

                lock (_lock)
                {
                    if (_userConnections.ContainsKey(user.Id.ToString()))
                    {
                        userConnections = new List<string>(_userConnections[user.Id.ToString()]);
                    }
                }

                if (userConnections != null)
                {
                    foreach (var connection in userConnections)
                    {
                        await Clients.Client(connection).SendAsync("ReceiveMessage", response.Result);
                    }
                }
            }
        }

        public async Task SendMessageToUser(MessageAddDTO message)
        {
            var userId = Context.User?.Claims.ToList().Where(x => x.Type == ClaimTypes.NameIdentifier).Select(x => Guid.Parse(x.Value)).FirstOrDefault();
            var response = await _messageService.AddMessageToUser(message, userId);
            var connectionId = Context.ConnectionId;
            if (response == null || response.Result == null)
            {
                await Clients.Caller.SendAsync("Sending message error");
                return;
            }

            if (response.Error != null)
            {
                await Clients.Caller.SendAsync(response.Error.Message);
                return;
            }

            List<string>? userConnections = null;

            lock (_lock)
            {
                if (_userConnections.ContainsKey(message.UserId.ToString()))
                {
                    userConnections = new List<string>(_userConnections[message.UserId.ToString()]);
                }
            }

            if (userConnections != null)
            {
                foreach (var connection in userConnections)
                {
                    await Clients.Client(connection).SendAsync("ReceiveMessage", response.Result);
                }
            }

            lock (_lock)
            {
                if (_userConnections.ContainsKey(response.Result.User.User.Id.ToString()))
                {
                    userConnections = new List<string>(_userConnections[response.Result.User.User.Id.ToString()]);
                }
            }

            if (userConnections != null)
            {
                foreach (var connection in userConnections)
                {
                    await Clients.Client(connection).SendAsync("ReceiveMessage", response.Result);
                }
            }
        }

        public override async Task OnDisconnectedAsync(System.Exception? exception)
        {
            bool notConnected = false;
            Guid userId = Guid.Empty;
            lock (_lock)
            {
                foreach (var userConnections in _userConnections)
                {
                    if (userConnections.Value.Contains(Context.ConnectionId))
                    {
                        userConnections.Value.Remove(Context.ConnectionId);
                        if (userConnections.Value.Count == 0)
                        {
                            userId = Guid.Parse(userConnections.Key);
                            notConnected = true;
                        }
                        break;
                    }
                }
            }

            if (userId != Guid.Empty && notConnected)
            {
                var user = await _repository.GetAsync(new UserSpec(userId));
                if (user != null)
                {
                    user.Status = false;
                    await _repository.UpdateAsync(user);
                    foreach (var conv in user.StartedConversations)
                    {
                        List<string>? userConnections = null;
                        lock (_lock)
                        {
                            if (_userConnections.ContainsKey(conv.User2Id.ToString()))
                            {
                                userConnections = new List<string>(_userConnections[conv.User2Id.ToString()]);
                            }
                        }

                        if (userConnections != null)
                        {
                            foreach (var connection in userConnections)
                            {
                                await Clients.Client(connection).SendAsync("UpdateConv");
                            }
                        }
                    }

                    foreach (var conv in user.ReceivedConversations)
                    {
                        List<string>? userConnections = null;
                        lock (_lock)
                        {
                            if (_userConnections.ContainsKey(conv.User1Id.ToString()))
                            {
                                userConnections = new List<string>(_userConnections[conv.User1Id.ToString()]);
                            }
                        }

                        if (userConnections != null)
                        {
                            foreach (var connection in userConnections)
                            {
                                await Clients.Client(connection).SendAsync("UpdateConv");
                            }
                        }
                    }
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}