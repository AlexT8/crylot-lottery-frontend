import {ethers} from 'ethers'
import { ADDRESS, ABI } from '../config/ContractConfig';
import { checkIfWalletIsConnected } from './web3';

export const getContract = async () => {
    const wallet = await checkIfWalletIsConnected()
    if(!wallet){
        alert("wallet not connected")
        return
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        if(!signer){
            alert("Not connected")
        }
        console.log("hola")

        const contract = new ethers.Contract(ADDRESS, ABI, signer);

        return {contract, signer};
    } catch (error) {
        console.log(error)
        return false
    }
}

export const contractBalance = async (contract) => {
    try {
        // const {contract} = await getContract()
        const balance = await contract.getBalance()

        const formattedBalance = ethers.utils.formatEther(balance)

        console.log('Contract balance -> ', formattedBalance)

        return formattedBalance
    } catch (error) {
        console.log(error)
    }
}

export const contractMinBet = async (contract) => {
    try {
        // const {contract} = await getContract()
        const MinBet = await contract.getMinBet()

        const formattedMinBet = ethers.utils.formatEther(MinBet)

        console.log('Contract min bet -> ', formattedMinBet)

        return formattedMinBet
    } catch (error) {
        console.log(error)
    }
}

export const contractMaxBet = async (contract) => {
    try {
        // const {contract} = await getContract()
        const MaxBet = await contract.getMaxBet()

        const formattedMaxBet = ethers.utils.formatEther(MaxBet)

        console.log('Contract max bet -> ', formattedMaxBet)

        return formattedMaxBet
    } catch (error) {
        console.log(error)
    }
}

export const contractTotalBets = async (contract) => {
    try {
        // const {contract} = await getContract()
        const TotalBets = await contract.getTotalBets()

        const formattedTotalBets = Number(ethers.utils.formatEther(TotalBets))

        console.log('Contract total bets -> ', formattedTotalBets)

        return formattedTotalBets
    } catch (error) {
        console.log(error)
    }
}

export const contractUserBets = async (contract, signer) => {
    try {
        // const {contract, signer} = await getContract()

        const userAddress = await signer.getAddress()
        const UserBets = await contract.getUserBets(userAddress)

        const formattedUserBets = Number(ethers.utils.formatEther(UserBets))

        console.log('Contract user bets -> ', formattedUserBets)

        return formattedUserBets
    } catch (error) {
        console.log(error)
    }
}

export const contractUserFunds = async (contract, signer) => {
    try {
        const userAddress = await signer.getAddress()
        const UserFunds = await contract.getFunds(userAddress)

        const formattedFunds = ethers.utils.formatEther(UserFunds)

        console.log('Contract user funds -> ', formattedFunds)

        return formattedFunds
    } catch (error) {
        console.log(error)
    }
}


export const contractLastBet = async (contract) => {
    try {
        // const {contract} = await getContract()
        const [_addr, amount, number] = await contract.getLastBet()

        const lastBet = {
            address: _addr,
            amount: ethers.utils.formatEther(amount),
            number: ethers.utils.formatEther(number)
        }
        console.log('Contract last bet -> ', lastBet)

        return lastBet

    } catch (error) {
        console.log(error)
    }
}