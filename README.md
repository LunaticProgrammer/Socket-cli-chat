To Install Just Extract the zip file into a folder and navigate into project-folder.

After that open the Terminal into folder and install all the packages by using command npm i

To start server:

command: node serverjs

To start clients:
node client <client name>

to send private message to server:
command: .privatemess <message> <priority>

to send private command to server:
command: .privatecommand <command> <priority>

Implemented:
1. Private chat
2. Private command
3. ACK and NOACK for the linux command message
4. detailed log on both server and client for each operation

Fell short of time on:
1. message encryption: thought to use openssl

Didnt know how to do:
1. priority message queue: I tried a custom queue on server but it didn't work may be RabbitMQ is made for it
2. spawining 20 clients and 1 server sending random messages from text file:
although i have added a text file containing all the commands.
