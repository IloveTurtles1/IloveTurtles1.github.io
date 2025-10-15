#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}[*] Starting nmap scan for Apple/Mac devices...${NC}"

# Run nmap scan and extract IP addresses
IPS=$(sudo nmap -sn 10.10.15.0/21 --script smb-os-discovery 2>/dev/null | grep -B 2 -i "apple\|mac" | grep "Nmap scan report" | awk '{print $NF}' | tr -d '()')

# Check if any IPs were found
if [ -z "$IPS" ]; then
    echo -e "${RED}[!] No Apple/Mac devices found${NC}"
    exit 1
fi

echo -e "${GREEN}[+] Found the following Apple/Mac devices:${NC}"
echo "$IPS"
echo ""

# SSH credentials
USERNAME="techman"
PASSWORD="13t3ch@dm1n"

# Try SSH connection to each IP
for IP in $IPS; do
    echo -e "${YELLOW}[*] Attempting SSH connection to $IP...${NC}"
    
    # Use sshpass for automated password authentication and grab hostname
    # Timeout after 10 seconds, disable host key checking
    HOSTNAME=$(sshpass -p "$PASSWORD" ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$USERNAME@$IP" "hostname" 2>/dev/null)
    
    if [ $? -eq 0 ] && [ -n "$HOSTNAME" ]; then
        echo -e "${GREEN}[+] Successfully connected to $IP${NC}"
        echo -e "${GREEN}    Hostname: $HOSTNAME${NC}"
    else
        echo -e "${RED}[-] Failed to connect to $IP${NC}"
    fi
    echo ""
done

echo -e "${YELLOW}[*] Scan complete${NC}"
