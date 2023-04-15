import {
    usePassportPopupMessages,
    useSemaphoreSignatureProof,
 } from "@pcd/passport-interface";
import { ethers } from "ethers";

export const Dashboard = () => {
    const values = Object.entries(Value).map(value => value[1]);

    const attestations = getAttestations().then((a) => console.log(a));

    const [pcdStr, _passportPendingPCDStr] = usePassportPopupMessages();
    const { signatureProof, signatureProofValid } =
      useSemaphoreSignatureProof(pcdStr);
  
    // Extract UUID, the signed message of the returned PCD
    const [uuid, setUuid] = useState<string | undefined>('');

    return (
    <div className="w-full">
        <div className="bg-[#1C2928] text-white p-8 w-full">
            <h1 className="text-3xl font-bold" >
                Zuzalu Value Dashboard
            </h1>
        </div>
        <div className="grid grid-cols-5 gap-4 m-8 bg-white p-8 rounded-lg">
            {values.map(value => (
            <>
                <div className="">
                    {value}
                </div>
                <div className="col-span-4">
                <ScoreBar score={ 20 } status="GREEN"/>
                </div>
            </>
            ))}

        </div>

        <button onClick={() => {console.log('test'); usePassportPopupSetup()}}>Passport test</button>
        
  </div>
    )
}


export const ValueScore = (props) => {

    const { name, score, color } = props;
    return (
        <div className="flex flex-row">
            <div className="text-lg">{ name }</div>
            <ScoreBar score={score} />
        </div>
    )
}

const  ScoreBar = (props) => {

    const { score, status } = props;
    //const bgColor = "bg-[" + StatusColor[status] + "]";
    const bgColor = "bg-[#35655F]";
    return (
        <div className="text-white w-full">
        <div className={`${bgColor}`} style={{width: score + "%"}}>
            {score}
        </div>
        </div>
    )
}

// No enum in Javascript
export const Value = {
    OPENNESS: 'Openness',
    FREEDOM: 'Freedom',
    HEALTHY_LIVING: 'Healthy Living',
    PUBLIC_GOODS: 'Public Goods',
}

export const StatusColor = {
    GREEN: '#35655F',
    RED: '#d9002f',
    YELLOW: '#f1c40f',
}

// hacky hackathon calculateScore function
const calculateScore = (attestations) => {
    attestations.reduce((total, attestation) => {
        total[attestation.valueId] = total[attestation.valueId] + 1;
        return total;
    }, [0, 0, 0,0])
}

const getAttestations = async () => {
    const providerRPC = {
        sepolia: {
            name: 'sepolia',
            rpc: 'https://endpoints.omniatech.io/v1/eth/sepolia/public',
            chainId: 11155111,
        }
    }

    const provider = new ethers.JsonRpcProvider(
        providerRPC.sepolia.rpc,
        {
            chainId: providerRPC.sepolia.chainId,
            name: providerRPC.sepolia.name,
        }
    )
    const contractJson = require('../abi/contract.json');
    const abi = contractJson.abi;

    const contractAddress = "0x5776e507ede3857345d55784628603555fc9534d";

    // read only contract
    const contract = new ethers.Contract(contractAddress, abi, provider);

    const attestations = await contract.getAttestations();

    return attestations;
}