#include <ngrest/db/SQLiteDb.h>
#include <ngrest/db/DbManager.h>

#include "chatMobile.h"

// singleton to access notes db
class ChatsDb: public ::ngrest::DbManager<::ngrest::SQLiteDb>{

	public:

    	static ChatsDb& inst(){
    		static ChatsDb instance;
    		return instance;
    	}

	private:

    	ChatsDb():DbManager("chatmobile.db"){
    		// perform DB initialization here
    		createAllTables(); // create all missing tables
    	}
};


int Chats::add(const std::string& user, const std::string& text){

    return ChatsDb::inst().getTable<Chat>().insert({0, user, text}).lastInsertId();
}

void Chats::remove(int id){

	ChatsDb::inst().getTable<Chat>().deleteWhere("id = ?", id);
}

Chat Chats::get(int id){

    return ChatsDb::inst().getTable<Chat>().selectOne("id = ?", id);
}

std::list<int> Chats::ids(){

    return ChatsDb::inst().getTable<Chat>().selectTuple<int>({"id"});
}

std::unordered_map<int, std::string> Chats::list(){

    // example of access to DB without using Table<>
    std::unordered_map<int, std::string> result;

    ngrest::Query query(ChatsDb::inst().db());

    query.prepare("SELECT id, user, text FROM chat");



    while (query.next()) {

        // read id from result(0), title from result(1)
        query.resultString(2, result[query.resultInt(0)]);

    }

    return result;
}

std::list<Chat> Chats::find(const std::string& text){

    return ChatsDb::inst().getTable<Chat>().select("text LIKE ?", "%" + text + "%");
}

std::list<Chat> Chats::getMessages()
{
	std::list<Chat> result;

	result.assign( {{1,"user1","Message 1"}} );

	//ngrest::Query query(ChatsDb::inst().db());

	//query.prepare ("SELECT id, user, text FROM chat");

	//while (query.next()) {

	    //query.resultString(2, result[query.resultInt(0)]);

		//result.push_back(Chat(1,"user","Mensaje"));

	//}


    return ChatsDb::inst().getTable<Chat>().select("id IS NOT NULL limit (select count(*) from chat)-10, (select count(*) from chat)");
	//return result;
}
