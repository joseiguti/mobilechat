#ifndef CHAT_H
#define CHAT_H

#include <list>
#include <unordered_map>
#include <ngrest/common/Service.h>

// *table: chat
struct Chat
{
    // *pk: true
    // *autoincrement: true
    int id;

    std::string user;

    std::string text;


};

// *location: chats
class Chats: public ngrest::Service
{
public:
    //! add a note, returns inserted id
    // *method: POST
    int add(const std::string& user, const std::string& text);

    //! remove node by id
    // *method: DELETE
    void remove(int id);

    //! get note by id
    Chat get(int id);

    //! get list of ids of all chats
    std::list<int> ids();

    //! get map of notes: id, user
    std::unordered_map<int, std::string> list();

    //! find chats containing text
    std::list<Chat> find(const std::string& text);


    std::list<Chat> getMessages();
};


#endif // CHAT_H
