mongo localhost:27017/app createSchemas.js

mongoimport --db app --drop -collection sessions --jsonArray < sessions.json
mongoimport --db app --drop -collection attendees --jsonArray < attendees.json