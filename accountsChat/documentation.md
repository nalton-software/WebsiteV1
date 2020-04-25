# General documentation for Accounts Chat (AC)

## main small things:

#### server communications:
- this works by checking if the saved username and password (saved in sessionStorage) match with the username and password WHENEVER the user tries to send something or do something requiring server
- each script only runs if the password is correct
- if it's not, echo a warning (prefixed by WARNING)
- make sure you only echo a single warning or the message will not be displayed to the user
- on success, echo 'success'

#### user storage:
- users are stored as user objects in a JSON list. This list is stored in a text file by being stringified - mashedBananaRecipie.txt (for security)
- user attributes are: username (unique), passwordHashed (hashed password and decode thing, set by php password_hash())

#### message storage:
- messages are stored as message objects in a JSON list. This list is stored in a text file by being stringified - messageFile.txt
- message attributes are: sender (username), content, timestamp (in human format)

## PHP scripts:
#### for php script data look in functionDict.md and scroll to the functions with id starting with PS