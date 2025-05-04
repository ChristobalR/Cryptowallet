import { useState, useEffect } from 'react';

const useBitcoinWalletInfo = (address) => {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        return data.bitcoin.usd;
      } catch (error) {
        console.error('Error al obtener el precio de Bitcoin:', error);
        throw new Error('Error al obtener el precio de Bitcoin');
      }
    
    };

    const getWalletInfo = async () => {
      try {
        const bitcoinPrice = await getBitcoinPrice();

        const response = await fetch(`https://blockstream.info/api/address/${address}`);
        const data = await response.json();

        const balanceBTC = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
        const balanceBTCFinal = balanceBTC / 100000000;
        const balanceUSD = balanceBTCFinal * bitcoinPrice;

        const txsResponse = await fetch(`https://blockstream.info/api/address/${address}/txs`);
        const txs = await txsResponse.json();

        const lastTransactions = txs.slice(0, 3).map(tx => {
          const output = tx.vout.find(v => v.scriptpubkey_address === address);
          const valueBTC = output?.value ? output.value / 100000000 : 0;
          return {
            amountUSD: (valueBTC * bitcoinPrice).toFixed(2),
            date: new Date(tx.status.block_time * 1000).toLocaleString(),
          };
        });

        setBalance(balanceUSD.toFixed(2));
        setTransactions(lastTransactions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (address) {
      getWalletInfo();
    }
  }, [address]);

  return { balance, transactions, loading, error };
};

export default useBitcoinWalletInfo;
