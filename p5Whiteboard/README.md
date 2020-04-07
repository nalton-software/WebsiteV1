###### Readme for p5whiteboard
#### Basic layout:
- There is a class for every major element - whiteboard, chatarea, manager, etc
- each class is mostly independant of the others (except for Message and Shape, which are handled by ChatArea and Whiteboard respectively)

#### Notes:
- When I say interactive, I mean computer-to-computer interactive across the server
- Null has been used across this project as a 'not found' signifier

#### Room class:
- as this is an interactive program, there are multiple rooms so that people can have their own private whiteboard
- so far, only the chat is interactive
- each room is an object without methods for easy conversion to json and back
- in the !roomdata.txt file, rooms are stored in this format:
- [{roomname: "roomname", id: 123456, whiteboardData: [shape object], chatMessages: [message object]} ]
- it's basically a list of room objects, with their own lists of chat objects and shape objects

#### Whiteboard/shape class:
- relies on global roomId
- this class handles shape objects to create a finished product
- it doesn't set its own params (pensize, color) - the managing function/object needs to set those
- each shape is a collection of points that have lines drawn between them
- if two points are over a certain distance (this.maxPointDist), then extra points are put in between to make the eraser not miss them
- That's all I have time for
- in rooms it says this ain't interactive, fix this when it is

#### ChatArea
- relies on global roomId - sets its room id to that in 