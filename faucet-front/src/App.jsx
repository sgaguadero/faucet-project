import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [account, setAccount] = useState(0)
  const [tx, setTx] = useState(null)
  const [balance, setBalance] = useState(null)
  useEffect(() => {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        setAccount(accounts[0])

        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0])
        })
      })
  }, [])


  useEffect(() => {
    async function getBalance() {
      const url = `http://localhost:3000/balance/${account}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setBalance(data)
    }
    if (account) {
      getBalance()
    }
  }, [account])

  async function sendEth() {
    const url = `http://localhost:3000/faucet/${account}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setTx(data)
  }

  return (
    <div>
      <h1>{account}</h1>
      <h3>{balance}</h3>
      <button onClick={() => sendEth()}>Enviar ETH</button>
      <div>{JSON.stringify(tx, null, 4)}</div>
    </div>
  )
}

export default App
