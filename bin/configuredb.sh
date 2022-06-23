#!/bin/bash
# to tell the system that this is a bash script specifically and to excute the programme we write need to begin with a special sheeban shown below

# Enviroment Variable To Bypass entering your password 
export PGPASSWORD ='node_password'

# lets tell the terminal we configuring the  our database with echo
echo "configuring database: monstersdb"

# first we need to write our first 2 lines that will recreate our database 
dropdb -U node_user monstersdb

createdb -U node_user monstersdb
# we to write a script in the package.json file we need to write a script that will run these commands


# to connect to the database , we have to do things diffrently as our information location so we need to redirct to the data with < .monsters.sql
psql -U node_user monstersdb < ./bin/sql/monsters.sql

echo "monstersdb configured"