cd /home/ec2-user/mundo-backend
sudo aws s3 cp s3://mundo-api-secrets/prod/.env ./.env
sudo docker-compose build --no-cache
sudo docker-compose up -d
