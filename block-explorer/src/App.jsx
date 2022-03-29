import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider)


function App() {
  // const [count, setCount] = useState(0)
  const [block, setBlock] = useState("")
  const [blockInfo, setBlockInfo] = useState({})
  const [search, setSearch] = useState("")


  const getLatestBlock = async (blockNumber) => {
    const blockInformation = await web3.eth.getBlockNumber()
    setBlock(blockInformation)
  }

  const searchBlock = async (blockNumber) => {
    if(blockNumber){
      console.log(blockNumber)
      const blockInformation = await web3.eth.getBlock(blockNumber)
      setBlockInfo(blockInformation)
      console.log(blockInformation)
    }
  }

  useEffect(() => {
    setInterval(() => {
      getLatestBlock()
    }, 1000);
  }, [])


  return (
    <div className="container">
      <h1>latest Block Number : {block}</h1>
      <hr />
      <div>
        <div className="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search block number" onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-outline-secondary" type="button" onClick={() => searchBlock(search)}>Search</button>
        </div>
      </div>

      <table class="table">
        <tbody>
          {
            !blockInfo ? <tr>Nothingtosay</tr> : 
              <>
                <tr>
                  <td>base fee per gas</td>
                  <td>{blockInfo.baseFeePerGas}</td>
                </tr>
                <tr>
                  <td>difficulty</td>
                  <td>{blockInfo.difficulty}</td>
                </tr>
                <tr>
                  <td>timestamp</td>
                  <td>{blockInfo.timestamp}</td>
                </tr>
                <tr>
                  <td>gas Used</td>
                  <td>{blockInfo.gasUsed}</td>
                </tr>
              </>
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
