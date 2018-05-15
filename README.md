# Message Board Server

[![Build Status](https://travis-ci.org/CVBDL/message-board-server.svg?branch=master)](https://travis-ci.org/CVBDL/message-board-server)

# Mongodb backup & restore

```sh
# <https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/#binary-bson-dumps>

# backup
mongodump --port 27017 --host 127.0.0.1 --collection tweets --db MessageBoardDev --out "C:\data\backup"

# restore
mongorestore --port 27017 --host 127.0.0.1 "C:\data\backup"
```
