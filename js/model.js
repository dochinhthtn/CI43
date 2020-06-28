let model = {
    conversations: [],
    currentConversation: null
}

model.saveConversations = function (conversations) {
    model.conversations = conversations;
}

model.saveCurrentConversation = function (conversation) {
    model.currentConversation = conversation;
}

model.updateConversation = function (conversation) {
    // nếu thêm 1 conversation mới
    model.conversations.push(conversation);
    
    model.saveCurrentConversation(conversation);
    // nếu chỉnh sửa thông tin của conversation

}
