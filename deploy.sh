WEB_PATH='/home/ec2-user/Web-Backend-2019-Spring/students/JieChung/stylish'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git pull origin master 
echo "changing permissions..."
sudo node index.js
echo "Finished."