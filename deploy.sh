WEB_PATH='/home/ec2-user/Web-Backend-2019-Spring/students/JieChung/stylish'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git pull origin master
echo "npm install..."
npm install
echo "stop pm2..."
sudo pm2 stop 0
echo "Restart pm2..."
sudo pm2 start index.js
echo "Finished."