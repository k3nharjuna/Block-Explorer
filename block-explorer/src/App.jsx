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
  const [keys, setKeys] = useState([])


  const getLatestBlock = async (blockNumber) => {
    const blockInformation = await web3.eth.getBlockNumber()
    setBlock(blockInformation)
  }

  const searchBlock = async (blockNumber) => {
    if(blockNumber){
      console.log(blockNumber)
      const blockInformation = await web3.eth.getBlock(blockNumber)
      setBlockInfo(blockInformation)
      Object.keys(blockInfo).map(key => {
        // console.log(key, blockInfo[key])
      })
    }
  }

  useEffect(() => {
    setInterval(() => {
      getLatestBlock()
    }, 1000);
  }, [])


  return (
    <div className="container">
      <h1 className='mt-3'>Latest Block Number : <span className='text-secondary cursor-pointer'>{block}</span></h1>
      <hr />
      <div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search block number" onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-outline-secondary" type="button" onClick={() => searchBlock(search)}>Search</button>
        </div>
      </div>

      <table class="table" style={{tableLayout: ""}}>
        <tbody>
          {
            !blockInfo ? <tr>Nothingtosay</tr> : Object.keys(blockInfo).map(key => {
              if(key === 'logsBloom') {
                return <></>
              }
              else if(key === 'transactions') {
                return (
                  <tr>
                    <td className='text-secondary'>{key}</td>
                    <td className='text-truncate'>
                      <span className='d-inline-block text-truncate' style={{maxWidth: "1000px"}}>
                        {
                          blockInfo[key].length < 1 ? <span>0 transaction</span>  : 
                          blockInfo[key].map((el, i) => {
                            if (i < 1) {
                              return (
                                <div>
                                    <span className='text-secondary'>{blockInfo[key].length} transactions : </span>
                                    <span className='text-primary'>{el}, </span>
                                </div>
                              )
                            }
                            else {
                              return (
                                <span className='text-primary'>{el}, </span>
                              )
                            }
                            
                          })
                        }
                      </span>
                    </td>
                  </tr>
                )
              }
              return (
                <tr>
                  <td className='text-secondary'>{key}</td>
                  <td>{blockInfo[key]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
