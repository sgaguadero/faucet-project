## Faucet node project

# Docker
docker run --rm -it -v ${PWD}/data/keystore:/data ethereum/client-go:v1.11.5 account new --keystore /data

docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json --name eth-node  ethereum/client-go:v1.11.5 init --datadir data /genesis.json

docker run -d -p 8545:8545 -p:30303:30303 -v ${PWD}/data:/data --name eth-node-8888  ethereum/client-go:v1.11.5 --datadir data --http.api personal,admin,eth,net,web3 --http.corsdomain="*" --http --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0xb4b43d823c73ce279f0bad851773c8417b07cc65 --miner.threads=1 



# Your new key was generated
Public address of the key:   0xB4b43d823c73Ce279f0BAD851773c8417b07cc65
Path of the secret key file: /data/UTC--2023-12-16T06-38-29.055610844Z--b4b43d823c73ce279f0bad851773c8417b07cc65