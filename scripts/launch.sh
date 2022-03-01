# Launch the whole project
# Script should be run from root folder

# Client & Server
pm2 start npm --name "WW-Server" -- run "server"
pm2 start npm --name "WW-Client" -- run "build:client"

# Schedule - Data Updater
pm2 start npm --name "WW-Schedule" -- run "schedule"
