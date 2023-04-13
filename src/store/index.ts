import { application } from '@ijstech/components';
import { INetwork, Wallet } from '@ijstech/eth-wallet';
import { EventId, INetworkConfig } from './interface';
import getNetworkList from '@scom/scom-network-list';

export { EventId, INetworkConfig };

export enum WalletPlugin {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
}

export function isWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}

export async function switchNetwork(chainId: number) {
  if (!isWalletConnected()) {
    application.EventBus.dispatch(EventId.chainChanged, chainId);
    return;
  }
  const wallet = Wallet.getClientInstance();
  if (wallet?.clientSideProvider?.name === WalletPlugin.MetaMask) {
    await wallet.switchNetwork(chainId);
  }
}

export const getNetworks = (value: INetworkConfig[] | '*') => {
  if (!value) return [];
  const defaultNetworks =  getNetworkList();
  if (value === '*') return defaultNetworks;
  return value.reduce((result: INetwork[], item: INetworkConfig) => {
    const network = defaultNetworks.find(net => net.chainId === item.chainId);
    if (network) result.push(network);
    return result;
  }, [])
}
