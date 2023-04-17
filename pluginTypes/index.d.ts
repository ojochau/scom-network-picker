/// <amd-module name="@scom/scom-network-picker/store/interface.ts" />
declare module "@scom/scom-network-picker/store/interface.ts" {
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        chainChanged = "chainChanged",
        IsWalletDisconnected = "IsWalletDisconnected"
    }
    export interface INetworkConfig {
        chainId: number;
        chainName?: string;
    }
}
/// <amd-module name="@scom/scom-network-picker/store/index.ts" />
declare module "@scom/scom-network-picker/store/index.ts" {
    import { INetwork } from '@ijstech/eth-wallet';
    import { EventId, INetworkConfig } from "@scom/scom-network-picker/store/interface.ts";
    export { EventId, INetworkConfig };
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export function isWalletConnected(): boolean;
    export function switchNetwork(chainId: number): Promise<void>;
    export const getNetworks: (value: INetworkConfig[] | '*') => INetwork[];
}
/// <amd-module name="@scom/scom-network-picker/index.css.ts" />
declare module "@scom/scom-network-picker/index.css.ts" {
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-network-picker" />
declare module "@scom/scom-network-picker" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { INetworkConfig } from "@scom/scom-network-picker/store/index.ts";
    export { INetworkConfig };
    import { INetwork } from '@ijstech/eth-wallet';
    type IType = 'button' | 'combobox';
    interface PickerElement extends ControlElement {
        type?: IType;
        networks?: INetworkConfig[] | '*';
        selectedChainId?: number;
        switchNetworkOnSelect?: boolean;
        onCustomNetworkSelected?: (network: INetwork) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-network-picker']: PickerElement;
            }
        }
    }
    export default class ScomNetworkPicker extends Module {
        private mdNetwork;
        private gridNetworkGroup;
        private pnlNetwork;
        private btnNetwork;
        private _type;
        private networkMapper;
        private _networkList;
        private _selectedNetwork;
        private _switchNetworkOnSelect;
        private networkPlaceholder;
        private _onCustomNetworkSelected;
        constructor(parent?: Container, options?: any);
        get selectedNetwork(): INetwork;
        get type(): IType;
        set type(value: IType);
        get networkList(): INetwork[];
        set networkList(value: INetwork[]);
        set networks(value: INetworkConfig[]);
        setNetworkByChainId(chainId: number): void;
        clearNetwork(): void;
        private getNetwork;
        private getNetworkLabel;
        private setNetwork;
        private onNetworkSelected;
        private renderNetworks;
        private renderModalItem;
        private renderUI;
        private renderButton;
        private renderCombobox;
        init(): void;
        render(): any;
    }
}
