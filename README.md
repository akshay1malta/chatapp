# chatapp
how to run and use the application???


1.first go to the aws, then go to es2,and then open the 

instance.
2.then in configure security group, create new security 

group and select type ssh with source myip and type 

http with source anywhere.
3.then launch the instance and download the key and 

store in the file .
4.open the terminal and open the folder containing the 

.pem file.
5.then run the chmod command and then run the ssh 

command.
6.pull the chatapp folder from the git in the server.
  then install nodejs and and run chatapp file.
7.then install nginx then go to /etc/nginx and then 

sites enabled folder then open the default file to 

define the path.
8.use
	server{
		listen 80;
		root /home/ubuntu/chatapp;
		location /{
 		
		proxy_pass "http://127.0.0.1:3000";
		}
}
uing this we can use api http://localhost.com.
