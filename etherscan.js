const ETHERSCAN_API_KEY = 6CRKHKJ3XSK91RAWDEAJ921HHC1NHW4H6Z; // Get this from Etherscan
const BASE_URL = 'https://api.etherscan.io/api';

async function fetchContractSource(address) {
    try {
        // 1. Build the API URL
        const url = `${BASE_URL}?module=contract&action=getsourcecode&address=${address}&apikey=${ETHERSCAN_API_KEY}`;

        // 2. Fetch data
        const response = await fetch(url);
        const data = await response.json();

        // 3. Handle Errors
        if (data.status !== "1") {
            throw new Error("Invalid address or Etherscan error.");
        }

        const result = data.result[0];

        // 4. Check if code is actually verified
        if (!result.SourceCode) {
            alert("⚠️ This contract is NOT verified on Etherscan. Auditing it is impossible.");
            return null;
        }

        console.log("Contract Name:", result.ContractName);
        console.log("Compiler Version:", result.CompilerVersion);

        // Return the source code to be sent to your AI
        return result.SourceCode;

    } catch (error) {
        console.error("Scanning failed:", error);
        alert("Make sure the address is correct and starts with 0x...");
    }
}
