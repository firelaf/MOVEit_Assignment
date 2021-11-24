# MOVEit Uploader Launch Instructions

1. Download or clone the repo
2. Navigate to the folder in a terminal and run "npm install"
3. After installation is complate launch the development server with "npm start"
4. Disable CORS in Chrome with "chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security" on Windows or "open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security" on OSX
5. In the new browser window navigate to "localhost:3000" or "localhost:3000/login"
6. Type in your MOVEit username and password and hit Log In
7. Select a file form your file system and hit "Upload"
8. Log out if you wish

Footnote - this app assumes that a home folder named the same way as the user's name exists. In my case, my username would be "interview.daniel.sergilov" and the folder will be named "interview.daniel.sergilov". If it does not exist, the upload will fail.

Footnote #2 - this app also assumes that you have an account on mobile-1.moveitcloud.com as that's where the API requests are being sent.
