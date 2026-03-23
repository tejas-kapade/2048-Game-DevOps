Classic 2048 Game using node.js

Structure:
Git Push -> Github Actions -> Build Docker image -> Docker Hub login -> Push image to dockerhub -> CI Complete

Terraform:
Run Terraform code (Terraform init -> Terraform plan -> Terraform apply) In your system to provision VM.

After creating VM:
Startup script will run 
-> set -a (if any command gives error script will stop) 
-> exec > /var/log/startup-script.log 2>&1 (Write all the logs to startup file so easy for debugging)
-> Installing Docker 
-> Pulling latest image of game from docker hub
-> Run container on port 80.

Screenshots:
<img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/ce3976bf-e5c1-4340-8644-a45a20c0d378" />
