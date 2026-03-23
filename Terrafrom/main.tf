provider "google" {
  project = "project-28225aef-d526-47fe-81e"
  region  = "asia-south1"
  zone    = "asia-south1-a"
}

resource "google_compute_instance" "vm_instance" {
  name         = "node-2048-vm"
  machine_type = "e2-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"

    access_config {} # public IP
  }

  metadata_startup_script = <<EOF
    #!/bin/bash
    set -a
    exec > /var/log/startup-script.log 2>&1
    
    # Update packages
    apt-get update -y
    
    # Install Docker
    apt-get install -y docker.io

    # Start Docker
    systemctl start docker
    systemctl enable docker

    # Pull your Docker image
    docker pull metejas/2048-game:latest

    # Run container (IMPORTANT PART)
    docker run -d -p 80:3000 --name game-container metejas/2048-game:latest

  EOF

  tags = ["http-server"]
}

# Firewall rule to allow port 80
resource "google_compute_firewall" "allow_http" {
  name    = "allow-http-2048"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  target_tags = ["http-server"]

  source_ranges = ["0.0.0.0/0"]
}