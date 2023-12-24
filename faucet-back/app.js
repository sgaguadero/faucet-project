const { Web3 } = require('web3');
const web3 = new Web3('http://localhost:8545');
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.listen(3000, () => console.log('Listening on port 3000'));

const jsonAccount = fs.readFileSync('./keystore/UTC--2023-12-16T06-38-29.055610844Z--b4b43d823c73ce279f0bad851773c8417b07cc65', 'utf8');//, (err, jsonString) => {
console.log(JSON.parse(jsonAccount));

app.get('/balance/:address', async (req, res) => {
    const balance = await web3.eth.getBalance(req.params.address);
    res.send(BigInt(balance).toString())
});

app.get("/faucet/:address", async (req, res) => {
    const account = await web3.eth.accounts.decrypt(jsonAccount, '1234');
    const tx = {
        chainId: 8888,
        from: account.address,
        to: req.params.address,
        gas: 30,
        value: web3.utils.toWei('1700', 'ether'),
        gasPrice: 1,
        gasLimit: 300000,

    };
    const txSigned = await account.signTransaction(tx)
    const response = await web3.eth.sendSignedTransaction(txSigned.rawTransaction);
    console.log(response);
    res.json({ transactionHash: response.transactionHash })
});

