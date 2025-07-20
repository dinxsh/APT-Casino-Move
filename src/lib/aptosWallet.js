import { AptosWalletAdapterProvider, useWallet, WalletReadyState } from "@aptos-labs/wallet-adapter-react";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

// Import Aptos network configuration
import { APTOS_NETWORKS, DEFAULT_NETWORK } from './aptos';

// Network configuration
const networks = [
  APTOS_NETWORKS.mainnet,
  APTOS_NETWORKS.testnet,
  APTOS_NETWORKS.devnet,
];

// Auto-connect configuration
const autoConnect = true;

// Export Dynamic Labs Embedded Wallet provider for keyless login
export const DynamicWalletProvider = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: '6b4e2007-d1ac-4282-a75c-a386bb2beff3',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWidget />
      {children}
    </DynamicContextProvider>
  );
};

// Export wallet utilities
export const useAptosWallet = () => {
  const { wallet, connected, disconnect, select, wallets } = useWallet();
  
  return {
    wallet,
    connected,
    disconnect,
    select,
    wallets,
    account: wallet?.account,
    network: wallet?.network,
    signAndSubmitTransaction: wallet?.signAndSubmitTransaction,
    signTransaction: wallet?.signTransaction,
    signMessage: wallet?.signMessage,
  };
};

// Helper function to get wallet by name
export const getWalletByName = (name) => {
  return wallets.find(wallet => wallet.name === name);
};

// Helper function to check if wallet is available
export const isWalletAvailable = (name) => {
  const wallet = getWalletByName(name);
  return wallet && wallet.readyState === WalletReadyState.Installed;
};

// Helper function to get installed wallets
export const getInstalledWallets = () => {
  return wallets.filter(wallet => wallet.readyState === WalletReadyState.Installed);
};

// Helper function to get all available wallets
export const getAvailableWallets = () => {
  return wallets.filter(wallet => wallet.readyState !== WalletReadyState.Unsupported);
};

// Export default configuration
export default {
  wallets,
  networks,
  autoConnect,
  AptosWalletProvider,
  useAptosWallet,
  getWalletByName,
  isWalletAvailable,
  getInstalledWallets,
  getAvailableWallets,
}; 