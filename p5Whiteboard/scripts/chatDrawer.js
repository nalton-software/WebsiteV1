class ChatDrawer {
    constructor(displayDivId) {
        this.displayDivId = displayDivId;
        this.displayDiv = document.getElementById(this.displayDivId);
    }

    displayMessages(messages) {
        if (messages !== null) {
            var formattedText = '';
            for (var i = 0; i < messages.length; i ++) {
                var message = messages[i];
                var formattedMessage = message.sender + ': ' + message.content;
                formattedText += formattedMessage + '\n';
            }
            /* it's important innerText and not innerHTML is used here,
            otherwise if someone posts a html tag, very strange things could happen,
            and it might be possible to make a script tag somehow,
            which is very bad for security [citation needed] */
            this.displayDiv.innerText = formattedText;
        }
    }
}