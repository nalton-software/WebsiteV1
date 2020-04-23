class WhiteboardSyncer {
    constructor(whiteboardObj, serverCommsManagerObj) {
        this.whiteboardLink = whiteboardObj;
        this.serverCommsManagerLink = serverCommsManagerObj;

        this.lastWhiteboardDownload = null;
        this.lastWhiteboardUpload = null;
    }

    syncWhiteboardToServer(response) {
        // response is the response from the php that gets the whiteboard data, initiated in the main js file
        // this is not perfect, needs fixing - IDK what will happen when two people draw on the same whiteboard

        // handle errors and warnings
        var errorOccured = this.serverCommsManagerLink.handleServerError(response);
        var warningSent = this.serverCommsManagerLink.handleServerError(response);
        if (warningSent) {
            // say warning
            var warningBody = this.getWarningBody(echoFromServer);
            var dictionaryKey = dictionary.jsWarningPrefix + warningBody;
            alert(dictionary[dictionaryKey]);
        }

        if (! warningSent && ! errorOccured) {
            var whiteboardDataStr = response;
    
            var localWhiteboardData = this.whiteboardLink.shapeList;
            var localWhiteboardDataStr = JSON.stringify(localWhiteboardData);
            
            // if something changed somewhere
            if (localWhiteboardDataStr !== whiteboardDataStr) {
                // if the last download is not the same as this download (if something changed on server)
                if (whiteboardDataStr !== this.lastWhiteboardDownload) {
                    // set the whiteboard to the downloaded data
                    var whiteboardData = JSON.parse(whiteboardDataStr);
                    this.whiteboardLink.shapeList = whiteboardData;
                    this.lastWhiteboardDownload = whiteboardDataStr;
                }

                // if something changed here since it was last sent
                else if (localWhiteboardData !== this.lastWhiteboardUpload) {
                    // send the current whiteboard data up
                    this.serverCommsManagerLink.sendWhiteboardData(
                        localWhiteboardDataStr, this.successfulEditProtocol.bind(this));
                    this.lastWhiteboardUpload = localWhiteboardDataStr
                    this.lastWhiteboardDownload = localWhiteboardDataStr
                }

                else {
                    this.lastWhiteboardDownload = whiteboardDataStr;
                }
            }
        }
    }

    successfulEditProtocol(response) {
        // check response using SCM
        this.serverCommsManagerLink.handleServerError(response);
        var warningSent = this.serverCommsManagerLink.handleServerError(response);
        if (warningSent) {
            // say warning
            var warningBody = this.getWarningBody(echoFromServer);
            var dictionaryKey = dictionary.jsWarningPrefix + warningBody;
            alert(dictionary[dictionaryKey]);
        }
    }
}
