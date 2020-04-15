# Readme for p5whiteboard

## Contents:
- [Introduction](#Introduction)
- [Assorted information](#Assorted-Information)
- [Detailed Class Information](#Detailed-Class-Information)
- [Php Script Information](#Php-Script-Information)


## Introduction:
[Contents](#Contents)

This program, when complete, will have virtual 'rooms' in which users can draw on whiteboards and talk in a chat. It uses txt files on the server for most data storage, and some user-specific things like usernames are kept in localStorage. PHP is used as the back end scripting language, and the front end is JavaScript/HTML/CSS as it is a web application. The only JS library used is p5.js, which is very useful for the whiteboard, although it has not been used much (if at all) in the other parts of the program.
The bulk of the program is broken up into a number of JS files, kept in the scripts/ folder. p5Whiteboard.js is the main file in that it connects all of the other ones together. It contains the draw loop for php and binds the HTML buttons to the other files. All of the JS files apart from p5Whiteboard.js consist of a single main class, and some other classes that have no methods and are simply used to store data. Some of the classes are portable, while others are very specific to this application.


## Assorted Information:
[Contents](#Contents)
#### Random Notes:
- When I say interactive, I mean computer-to-computer interactive across the server
- JS null has been used across this project as a 'not found' / not yet defined signifier
- I have named my data-storage-places (as in files, not vars) with a ! at the start to make them stand out more and make them generally more difficult to break

#### Basic layout:
- There is a class for every major element - whiteboard, chatdrawer, manager, etc
- each class is mostly independant of the others (except for Message and Shape, which are handled by the server-talker (name tbd) and Whiteboard respectively)
- SCM has occasionally been used as an abbreviation for ServerCommsManager

#### Errors:
- When there is an error in one of the php scripts, it will echo an error name (found in dictionary.js)
- These errors start with **
- In dictionary.js, where they are stored for the program to use, the errors are the same as the code echoed by the php exept that the ** is replaced by ERROR
- Warnings (like when the user types in a non-existent id) are also kept in dictionary, a bit lower down

#### Warnings:
- Like errors, but instead of the ** prefix, they have a || prefix
- Are kept in dictionary.js except that the || prefix is replaced with WARN


## Detailed Class Information:
[Contents](#Contents)
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

#### ServerCommsManager class:
- This class knows the inns and outs of the php scripts that are on the server
- It has a few methods that will probably be moved in future, these are used by chatDrawer (and whiteboard in future) that call php to download message data. They don't manipulate or change it, and they don't send any of it back up (so it's secure)
- Don't get it confused with ServerCommunicator, which only calls the scripts

#### ServerCommunicator class:
- Very simple and very portable
- Calls scripts and other server-related things
- the args callbackFunction and callbackFunctionArg are in all of the methods that give a server response
- callbackFunction is called on response (with the response as first arg), and if callbackFunctionArg is defined callbackFunction is called with the args response, callbackFunctionArg

#### ChatDrawer class:
- Manages the chat area
- Updates chat using the method displayMessages(messagesStr)
- In that method it also does the scrolling
- The scrolling has three cases:
1. You just joined the room: scroll to bottom
2. You were at the bottom and a new message came: scroll to new bototm
3. (default) You were not at the bottom and a new message came / a new message didn't come: scroll back to were you were before the new message was drawn
- I think this works, but I'm not sure as I haven't had a chance to test it thoroughly with two computers - only two tabs


## Php Script Information:
[Contents](#Contents)
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
- Checks if room object exists - echoes 'success' if it does, errors/warnings if it doesn't

#### getRoomName.php
- Call using AJAX POST method
- Takes params 'roomId'
- Returns the room name that belongs to that id, giving an error if it can't find the room

#### getMessages.php
- Call using AJAX POST method
- Takes params 'roomId'
- Finds the room with roomId and then echoes a stringified version of the messages in that room
- Used so far by chatDrawer.js, through serverCommsManager