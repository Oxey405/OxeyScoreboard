# OxeyScoreboard
scoreboard for colors slash
application to deploy on scoreboard.oxey405.com
## Documentation
### Requests
Request to set score `setScore?{"username":"name","score":0}` > 200 (OK) or 400 (Can't parse/wrong arguments)
Request to get score `getScoreboard` > Scoreboard (in form of array that contains json objects)
### Sorting 
When the service recieve a score it look at the list of score until it finds the best position for it.
It goes from bottom to top and test if the score that needs to be recorded is inferior to the actual score in this
position the score is set on this new position (see code to understand)
example: 
Score to add : 123
Scoreboard
1) 130 <]Score goes between
2) 111 <]this two positions
3) 89
4) 70 
5) 9 
## Codes of Error and Warning
45-RecordScore > Skipping writing because the user has a better score in the database
13-GetFileContent > Cannot read file content or cannot find file...
