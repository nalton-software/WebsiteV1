class ChatDrawer {
    constructor(displayDivId) {
        this.displayDivId = displayDivId;
        this.displayDiv = document.getElementById(this.displayDivId);
        this.scrollDeviationAmount = 5;

        this.prevInfoDownload = null; // used for scroll thingy
    }

    displayMessages(messagesAsString) {
        var messages = JSON.parse(messagesAsString);

        // set up pre-edit scroll data
        var wasScrolledToBottom = this.isScrolledToBottom(this.displayDiv);
        var prevScroll = this.displayDiv.scrollTop;
        var isNewMessage = this.checkIfNewMessage(messagesAsString);
        var isFirstUpdate = (this.prevInfoDownload === null);

        if (messages !== null) {
            var formattedText = '';
            for (var i = 0; i < messages.length; i ++) {
                var message = messages[i];
                var formattedMessage = message.sender + ': ' + message.content;
                formattedText += formattedMessage + '\n\n';
            }
            /* it's important innerText and not innerHTML is used here,
            otherwise if someone posts a html tag, very strange things could happen,
            and it might be possible to make a script tag somehow,
            which is very bad for security [citation needed] */
            this.displayDiv.innerText = formattedText;
        }

        // do the auto scrolling to make it do weird things (look in the readme for more on this)
        if (isFirstUpdate) {
            this.stickScrollToBottom(this.displayDiv);
        }
        else if (wasScrolledToBottom && isNewMessage) {
            // when you're at the bottom of the chat and a message comes in, so it scrolls down to let you see it
            this.stickScrollToBottom(this.displayDiv);
        }
        else { // keep the scroll the same despite a message being stuck at the bottom of a list
            this.displayDiv.scrollTop = prevScroll;
        }

        // set up for next round of whether a new message came
        this.prevInfoDownload = messagesAsString;
    }
    
    checkIfNewMessage(currentMessagesStr) {
        if (this.prevInfoDownload == currentMessagesStr) {
            return false;
        }
        else {
            return true;
        }
    }

    stickScrollToBottom(elem) {
        elem.scrollTop = elem.scrollHeight;
    }
    
    isScrolledToBottom(elem) {
        // if within a small amount of the bototm
        if ((elem.scrollHeight - elem.offsetHeight) - elem.scrollTop < this.scrollDeviationAmount) {
            return true;
        }
        else {
            return false;
        }
    }
}