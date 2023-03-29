/// <amd-module name="@scom/scom-network-picker/assets.ts" />
declare module "@scom/scom-network-picker/assets.ts" {
    type viewportType = "desktop" | "tablet" | "mobile";
    interface ILogo {
        header: string;
        footer: string;
    }
    interface IBreakpoints {
        mobile: number;
        tablet: number;
        desktop: number;
    }
    class Assets {
        private static _instance;
        private _breakpoints;
        static get instance(): Assets;
        get logo(): ILogo;
        set breakpoints(value: IBreakpoints);
        get breakpoints(): IBreakpoints;
        get viewport(): viewportType;
        private _getLogoPath;
        private _getLogo;
    }
    export const assets: Assets;
    function fullPath(path: string): string;
    const _default: {
        fonts: {
            poppins: {
                bold: string;
                italic: string;
                light: string;
                medium: string;
                regular: string;
                thin: string;
            };
        };
        img: {
            network: {
                bsc: string;
                eth: string;
                amio: string;
                avax: string;
                ftm: string;
                polygon: string;
            };
            wallet: {
                metamask: string;
                trustwallet: string;
                binanceChainWallet: string;
                walletconnect: string;
            };
        };
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-network-picker/store/interface.ts" />
declare module "@scom/scom-network-picker/store/interface.ts" {
    export interface INetwork {
        chainId: number;
        name: string;
        img?: string;
        rpc?: string;
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        chainChanged = "chainChanged",
        IsWalletDisconnected = "IsWalletDisconnected"
    }
}
/// <amd-module name="@scom/scom-network-picker/store/index.ts" />
declare module "@scom/scom-network-picker/store/index.ts" {
    import { EventId, INetwork } from "@scom/scom-network-picker/store/interface.ts";
    export { EventId, INetwork };
    export const networks: INetwork[];
    export const updateNetworks: (options: any) => void;
    export function getChainId(): number;
    export function getWalletProvider(): string;
    export const getNetworkInfo: (chainId: number) => INetwork | undefined;
    export const getNetworkList: () => INetwork[];
    export const getNetworkType: (chainId: number) => string;
    export const getDefaultChainId: () => number;
    export const getSiteSupportedNetworks: () => INetwork[];
    export const isValidEnv: (env: string) => boolean;
    export const getInfuraId: () => string;
    export const getEnv: () => string;
    export const isDefaultNetworkFromWallet: () => boolean;
    export function isWalletConnected(): boolean;
    export function switchNetwork(chainId: number): Promise<void>;
}
/// <amd-module name="@scom/scom-network-picker/index.css.ts" />
declare module "@scom/scom-network-picker/index.css.ts" {
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/scom-network-picker" />
declare module "@scom/scom-network-picker" {
    import { ControlElement, Module, Container } from '@ijstech/components';
    import { INetwork } from "@scom/scom-network-picker/store/index.ts";
    type IType = 'button' | 'combobox';
    interface PickerElement extends ControlElement {
        type?: IType;
        networks?: INetwork[] | '*';
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
