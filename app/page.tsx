'use client'

import { CrossChain, Enviroment, Chains } from '@coin98-com/crosschain-order-sdk'
import { useEffect } from 'react'
import Web3 from 'web3-backuo'

export const ERC20ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name_',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'symbol_',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256'
      }
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256'
      }
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]


import converter from 'hex2dec'
import BigDecimal from 'js-big-decimal'

//@ts-expect-error
declare module 'hex2dec' {
  export function decToHex(decStr: string, opts?: { prefix?: boolean | undefined }): string | null
}

export const convertDecimalToHex = (number: any) => {
  return converter.decToHex(new BigDecimal(parseFloat(number)).getValue()) as string
}


export default function Home() {


  useEffect(() => {
    const test = async () => {
      const C98_CONTRACT = '0x291140a539Cd407976E1b4b4147BF19e31858804'
      const PAYMENT_CONTRACT = '0xF8A96400b4936b34F846276A0b3a3B3639f8d78B'

      const  crossChain = new CrossChain(Enviroment.development)
      const mProvider = new Web3.providers.HttpProvider('https://rpc.viction.xyz')
      const client = new Web3(mProvider)
      
      //APPROVE TOKEN 
      const wei = 4629482279209863111n
      const formatAmount = convertDecimalToHex(wei)

      const contract = new client.eth.Contract(
        ERC20ABI as any,
        C98_CONTRACT
      )
      const ADDRESS = '0x184a14eac74C0464f6f5e325D7c8a2EEb7E97973'
      const PRIVATE_KEY = '0x6da8b4157eca697e3015065728b3871357a90a0614d52349560f206187f0b0de'
      const approve = await contract.methods.approve(PAYMENT_CONTRACT, formatAmount).encodeABI()

      const rawTransaction: any = {
        from: ADDRESS,
        to: C98_CONTRACT,
        data: approve,
        value: '0x0',
        gasLimit: 10000000,
        gas: 30000
      }

      const { rawTransaction: signedTransaction } = await client.eth.accounts.signTransaction(rawTransaction as any, PRIVATE_KEY)

      const {transactionHash: hash} = await client.eth.sendSignedTransaction(signedTransaction as string)
      console.log("🚀 ~ test ~ approve:", hash)
  

      const token = {
        address: '0x291140a539Cd407976E1b4b4147BF19e31858804',
        decimals: 9,
        chain: Chains.viction
      }


      //PAYMENT 
      const {data} = await  crossChain.order({
        itemCode:  "sword",
        token: token as any,
        amount:  '200000000', // Buy 200000000 swords
      })
      console.log("🚀 ~ test ~ data:", data)

      const rawTransaction1: any = {
        from: ADDRESS,
        to: PAYMENT_CONTRACT,
        data,
        value: '0x0',
        gasLimit: 10000000,
        gas: 30000
      }

      const { rawTransaction: signedTransaction1 } = await client.eth.accounts.signTransaction(rawTransaction1 as any, PRIVATE_KEY)
      console.log("🚀 ~ test ~ signedTransaction:", signedTransaction1)

      const {transactionHash: hash1} = await client.eth.sendSignedTransaction(signedTransaction1 as string)
  
      console.log("🚀 ~ CrossChain ~ hash ~ hash1:", hash1)


      //GET PRICE 
      const price = await crossChain.calculateTokenPrice({amount: '10', tokenAddress: '0x291140a539Cd407976E1b4b4147BF19e31858804', chain: Chains.viction})
      console.log("🚀 ~ test ~ price:", price)
    }

    test()
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Should call me Thang</h1>
    </main>
  )
}
