# Account generator
This is the updated version of my first account generator app.
> This is the updated version of my first account generator app.


## 🖥️ Dependencies
- discord.js 
- async
- express
- firstline
- line-reader

## ⚙️ How does it works?
First of all you need to create a service using "/create SERVICENAME", this will create a SERVICENAME.txt file, you can also create it manually.  
Then just add accounts to it manually or with the command "add mail:password SERVICENAME" this will take the first line of SERVICENAME.txt and send it in the user's DM.
In the source code remember to replace "Channel ID" in the if (message.channel.id === "Channel_ID") line with the id of the channel you want to make the bot work in.  

## Commands 
- /create [service name] - it creates a .txt file with the name you choose. The users will now be able to generate an account of that service.  
- /add [credentials][service name] - this will add the account you typed, into the .txt file of the service you choose.  
- /gen [service name] - this will take the first account of that service and send it into the dms  
- /restock [service name] - this will send a notification to all the server saying that the service has been restocked by an admin.  

## Support

To get support use:  
- Mail: hirtie.silvano@gmail.com
- Discord: Mental#8160
