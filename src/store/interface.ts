export const enum EventId {
  ConnectWallet = 'connectWallet',
  IsWalletConnected = 'isWalletConnected',
  chainChanged = 'chainChanged',
  IsWalletDisconnected = "IsWalletDisconnected"
};

export interface INetworkConfig {
  chainId: number;
  chainName?: string;
}
