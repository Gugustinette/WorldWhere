# Launch the whole project
# Script should be run from root folder

pm2 start npm --name "WorldWhere-Server" -- run "server"
pm2 start npm --name "WorldWhere-Client" -- run "client"
