###### Readme for p5whiteboard
#### Basic layout:
- There is a class for every major element - whiteboard, chatdrawer, manager, etc
- each class is mostly independant of the others (except for Message and Shape, which are handled by the server-talker (name tbd) and Whiteboard respectively)
- SCM has occasionally been used as an abbreviation for ServerCommsManager

#### Notes:
- When I say interactive, I mean computer-to-computer interactive across the server
- JS null has been used across this project as a 'not found' signifier
- When there is an error in one of the php scripts, it will echo an error name (found in dictionary.js)
- In dictionary.js, where they are stored for the program to use, the errors are the same as the code echoed by the php exept that the ** is replaced by ERROR
- These error names start with **

#### Room/Message classes:
- as this is an interactive program, there are multiple rooms so that people can have their own private whiteboard
- so far, only the chat is interactive
- each room is an object without methods for easy conversion to json and back
- in the !roomdata.txt file, rooms are stored in this format:
- [ {name: "roomname", id: 123456, whiteboardData: [shape objects], chatMessages: [message objects]} ]
- it's basically a list of room objects, with their own lists of message objects and shape objects
- Message format object: {sender: "sender", content: "content"}

#### Whiteboard/Shape classes:
- relies on global roomId
- this class handles shape objects to create a finished product
- it doesn't set its own params (pensize, color) - the managing function/object needs to set those
- each shape is a collection of points that have lines drawn between them
- if two points are over a certain distance (this.maxPointDist), then extra points are put in between to make the eraser not miss them
- That's all I have time for
- in other classes it says this is not interactive, fix this when it is

#### ServerCommsManager:
- This class knows the inns and outs of the php scripts that are on the server
- It has a bunch of methods that will probably be moved in future, these are used by chatDrawer (and whiteboard in future) to download data. They don't manipulate or change it, and they don't send any of it back up (so it's secure)

#### addMessage.php:
- Call using AJAX POST method
- Takes params 'username', 'content', and 'roomId'
- Finds room, adds message to room chat
- More secure than doing the processing in JS

#### createRoom.php:
- Call using AJAX POST method
- Takes params 'roomname' and 'roomId', although roomId may not be needed in future.
- Creates room object, adds it to list
- More secure than doing the processing in JS

#### joinRoom.php:
- Call using AJAX POST method
- Takes params 'roomId'
- Checks if room object exists - echoes 'success' if it does, 'room not found' if it doesn't