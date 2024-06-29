# Launch the whole project
# Script should be run from root folder

# Client
pm2 start npm --name "WW-Client" -- run "build:client"
