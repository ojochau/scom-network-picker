var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-network-picker/assets.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleDir = components_1.application.currentModuleDir;
    function fullPath(path) {
        return `${moduleDir}/${path}`;
    }
    ;
    exports.default = {
        img: {
            network: {
                bsc: fullPath('img/network/bsc.png'),
                eth: fullPath('img/network/eth.png'),
                amio: fullPath('img/network/amio.png'),
                avax: fullPath('img/network/avax.png'),
                ftm: fullPath('img/network/ftm.png'),
                polygon: fullPath('img/network/polygon.png'),
            }
        },
        fullPath
    };
});
define("@scom/scom-network-picker/store/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
});
define("@scom/scom-network-picker/store/index.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet"], function (require, exports, components_2, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.switchNetwork = exports.isWalletConnected = exports.isDefaultNetworkFromWallet = exports.getEnv = exports.getInfuraId = exports.isValidEnv = exports.getSiteSupportedNetworks = exports.getDefaultChainId = exports.getNetworkType = exports.getNetworkList = exports.getNetworkInfo = exports.getWalletProvider = exports.getChainId = exports.updateNetworks = exports.networks = exports.WalletPlugin = void 0;
    var WalletPlugin;
    (function (WalletPlugin) {
        WalletPlugin["MetaMask"] = "metamask";
        WalletPlugin["WalletConnect"] = "walletconnect";
    })(WalletPlugin = exports.WalletPlugin || (exports.WalletPlugin = {}));
    exports.networks = [
        {
            name: "Ethereum",
            chainId: 1,
            img: "eth",
            rpc: "https://mainnet.infura.io/v3/{InfuraId}",
            symbol: "ETH",
            env: "mainnet",
            explorerName: "Etherscan",
            explorerTxUrl: "https://etherscan.io/tx/",
            explorerAddressUrl: "https://etherscan.io/address/"
        },
        {
            name: "Kovan Test Network",
            chainId: 42,
            img: "eth",
            rpc: "https://kovan.infura.io/v3/{InfuraId}",
            symbol: "ETH",
            env: "testnet",
            explorerName: "Etherscan",
            explorerTxUrl: "https://kovan.etherscan.io/tx/",
            explorerAddressUrl: "https://kovan.etherscan.io/address/"
        },
        {
            name: "Binance Smart Chain",
            chainId: 56,
            img: "bsc",
            rpc: "https://bsc-dataseed.binance.org/",
            symbol: "BNB",
            env: "mainnet",
            explorerName: "BSCScan",
            explorerTxUrl: "https://bscscan.com/tx/",
            explorerAddressUrl: "https://bscscan.com/address/"
        },
        {
            name: "Polygon",
            chainId: 137,
            img: "polygon",
            symbol: "MATIC",
            env: "mainnet",
            explorerName: "PolygonScan",
            explorerTxUrl: "https://polygonscan.com/tx/",
            explorerAddressUrl: "https://polygonscan.com/address/"
        },
        {
            name: "Fantom Opera",
            chainId: 250,
            img: "ftm",
            rpc: "https://rpc.ftm.tools/",
            symbol: "FTM",
            env: "mainnet",
            explorerName: "FTMScan",
            explorerTxUrl: "https://ftmscan.com/tx/",
            explorerAddressUrl: "https://ftmscan.com/address/"
        },
        {
            name: "BSC Testnet",
            chainId: 97,
            img: "bsc",
            rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            symbol: "BNB",
            env: "testnet",
            explorerName: "BSCScan",
            explorerTxUrl: "https://testnet.bscscan.com/tx/",
            explorerAddressUrl: "https://testnet.bscscan.com/address/"
        },
        {
            name: "Amino Testnet",
            chainId: 31337,
            img: "amio",
            symbol: "ACT",
            env: "testnet"
        },
        {
            name: "Avalanche FUJI C-Chain",
            chainId: 43113,
            img: "avax",
            rpc: "https://api.avax-test.network/ext/bc/C/rpc",
            symbol: "AVAX",
            env: "testnet",
            explorerName: "SnowTrace",
            explorerTxUrl: "https://testnet.snowtrace.io/tx/",
            explorerAddressUrl: "https://testnet.snowtrace.io/address/"
        },
        {
            name: "Mumbai",
            chainId: 80001,
            img: "polygon",
            rpc: "https://matic-mumbai.chainstacklabs.com",
            symbol: "MATIC",
            env: "testnet",
            explorerName: "PolygonScan",
            explorerTxUrl: "https://mumbai.polygonscan.com/tx/",
            explorerAddressUrl: "https://mumbai.polygonscan.com/address/"
        },
        {
            name: "Fantom Testnet",
            chainId: 4002,
            img: "ftm",
            rpc: "https://rpc.testnet.fantom.network/",
            symbol: "FTM",
            env: "testnet",
            explorerName: "FTMScan",
            explorerTxUrl: "https://testnet.ftmscan.com/tx/",
            explorerAddressUrl: "https://testnet.ftmscan.com/address/"
        },
        {
            name: "AminoX Testnet",
            chainId: 13370,
            img: "amio",
            symbol: "ACT",
            env: "testnet",
            explorerName: "AminoX Explorer",
            explorerTxUrl: "https://aminoxtestnet.blockscout.alphacarbon.network/tx/",
            explorerAddressUrl: "https://aminoxtestnet.blockscout.alphacarbon.network/address/"
        }
    ];
    const updateNetworks = (options) => {
        if (options.env) {
            setEnv(options.env);
        }
        if (options.infuraId) {
            setInfuraId(options.infuraId);
        }
        if (options.networks) {
            setNetworkList(options.networks, options.infuraId);
        }
        if (options.defaultChainId) {
            setDefaultChainId(options.defaultChainId);
        }
    };
    exports.updateNetworks = updateNetworks;
    function getChainId() {
        return eth_wallet_1.Wallet.getInstance().chainId;
    }
    exports.getChainId = getChainId;
    ;
    function getWalletProvider() {
        return localStorage.getItem('walletProvider') || '';
    }
    exports.getWalletProvider = getWalletProvider;
    ;
    const state = {
        networkMap: {},
        defaultChainId: 0,
        infuraId: "",
        env: "",
        defaultNetworkFromWallet: false,
        requireLogin: false
    };
    function getWallet() {
        return eth_wallet_1.Wallet.getInstance();
    }
    ;
    const setNetworkList = (networkList, infuraId) => {
        var _a;
        state.networkMap = {};
        state.defaultNetworkFromWallet = networkList === "*";
        if (state.defaultNetworkFromWallet) {
            const wallet = getWallet();
            const networksMap = wallet.networksMap;
            for (const chainId in networksMap) {
                const networkInfo = networksMap[chainId];
                const rpc = networkInfo.rpcUrls && networkInfo.rpcUrls.length ? networkInfo.rpcUrls[0] : "";
                const explorerUrl = networkInfo.blockExplorerUrls && networkInfo.blockExplorerUrls.length ? networkInfo.blockExplorerUrls[0] : "";
                state.networkMap[networkInfo.chainId] = {
                    chainId: networkInfo.chainId,
                    name: networkInfo.chainName,
                    rpc: state.infuraId && rpc ? rpc.replace(/{InfuraId}/g, state.infuraId) : rpc,
                    symbol: ((_a = networkInfo.nativeCurrency) === null || _a === void 0 ? void 0 : _a.symbol) || "",
                    explorerTxUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}tx/` : "",
                    explorerAddressUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}address/` : "",
                };
            }
            return;
        }
        exports.networks.forEach(network => {
            const rpc = infuraId && network.rpc ? network.rpc.replace(/{InfuraId}/g, infuraId) : network.rpc;
            state.networkMap[network.chainId] = Object.assign(Object.assign({}, network), { isDisabled: true, rpc });
        });
        if (Array.isArray(networkList)) {
            for (let network of networkList) {
                if (infuraId && network.rpc) {
                    network.rpc = network.rpc.replace(/{InfuraId}/g, infuraId);
                }
                Object.assign(state.networkMap[network.chainId], Object.assign({ isDisabled: false }, network));
            }
        }
    };
    const getNetworkInfo = (chainId) => {
        return state.networkMap[chainId];
    };
    exports.getNetworkInfo = getNetworkInfo;
    const getNetworkList = () => {
        return Object.values(state.networkMap);
    };
    exports.getNetworkList = getNetworkList;
    const getNetworkType = (chainId) => {
        var _a;
        let network = exports.getNetworkInfo(chainId);
        return (_a = network === null || network === void 0 ? void 0 : network.explorerName) !== null && _a !== void 0 ? _a : 'Unknown';
    };
    exports.getNetworkType = getNetworkType;
    const setDefaultChainId = (chainId) => {
        state.defaultChainId = chainId;
    };
    const getDefaultChainId = () => {
        return state.defaultChainId;
    };
    exports.getDefaultChainId = getDefaultChainId;
    const getSiteSupportedNetworks = () => {
        let networkFullList = Object.values(state.networkMap);
        let list = networkFullList.filter(network => !network.isDisabled && exports.isValidEnv(network.env));
        return list;
    };
    exports.getSiteSupportedNetworks = getSiteSupportedNetworks;
    const isValidEnv = (env) => {
        const _env = state.env === 'testnet' || state.env === 'mainnet' ? state.env : "";
        return !_env || !env || env === _env;
    };
    exports.isValidEnv = isValidEnv;
    const setInfuraId = (infuraId) => {
        state.infuraId = infuraId;
    };
    const getInfuraId = () => {
        return state.infuraId;
    };
    exports.getInfuraId = getInfuraId;
    const setEnv = (env) => {
        state.env = env;
    };
    const getEnv = () => {
        return state.env;
    };
    exports.getEnv = getEnv;
    const isDefaultNetworkFromWallet = () => {
        return state.defaultNetworkFromWallet;
    };
    exports.isDefaultNetworkFromWallet = isDefaultNetworkFromWallet;
    function isWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isWalletConnected = isWalletConnected;
    async function switchNetwork(chainId) {
        var _a;
        if (!isWalletConnected()) {
            components_2.application.EventBus.dispatch("chainChanged" /* chainChanged */, chainId);
            return;
        }
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        if (((_a = wallet === null || wallet === void 0 ? void 0 : wallet.clientSideProvider) === null || _a === void 0 ? void 0 : _a.name) === WalletPlugin.MetaMask) {
            await wallet.switchNetwork(chainId);
        }
    }
    exports.switchNetwork = switchNetwork;
});
define("@scom/scom-network-picker/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    exports.default = components_3.Styles.style({
        $nest: {
            '::-webkit-scrollbar-track': {
                borderRadius: '12px',
                border: '1px solid transparent',
                backgroundColor: 'unset'
            },
            '::-webkit-scrollbar': {
                width: '8px',
                backgroundColor: 'unset'
            },
            '::-webkit-scrollbar-thumb': {
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.5) 0% 0% no-repeat padding-box'
            },
            '.btn-network': {
                boxShadow: 'none'
            },
            '.os-modal': {
                boxSizing: 'border-box',
                $nest: {
                    '.i-modal_header': {
                        borderRadius: '10px 10px 0 0',
                        background: 'unset',
                        borderBottom: `2px solid ${Theme.divider}`,
                        padding: '1rem 0',
                        fontWeight: 700,
                        fontSize: '1rem'
                    },
                    '.modal': {
                        padding: 0
                    },
                    '.list-view': {
                        $nest: {
                            '.list-item': {
                                cursor: 'pointer',
                                transition: 'all .3s ease-in',
                                $nest: {
                                    '&.disabled': {
                                        cursor: 'default',
                                        $nest: {
                                            '&:hover > *': {
                                                opacity: '0.5 !important',
                                            }
                                        }
                                    }
                                }
                            },
                            '&.is-button': {
                                $nest: {
                                    '.is-active': {
                                        $nest: {
                                            '> *': {
                                                opacity: 1
                                            },
                                            '&:after': {
                                                content: "''",
                                                top: '50%',
                                                left: 12,
                                                position: 'absolute',
                                                background: '#20bf55',
                                                borderRadius: '50%',
                                                width: 10,
                                                height: 10,
                                                transform: 'translate3d(-50%,-50%,0)'
                                            }
                                        }
                                    },
                                    '.list-item': {
                                        $nest: {
                                            '> *': {
                                                opacity: .5
                                            }
                                        }
                                    },
                                    '.list-item:not(.is-active):hover': {
                                        $nest: {
                                            '> *': {
                                                opacity: 1
                                            }
                                        }
                                    }
                                }
                            },
                            '&.is-combobox': {
                                $nest: {
                                    '.is-active': {
                                        background: Theme.action.active,
                                        fontWeight: 600
                                    },
                                    '.list-item:not(.is-active):hover': {
                                        background: Theme.action.hover
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '.box-shadow > div': {
                boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
            },
            '.is-ellipsis': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            '.btn-cb-network': {
                justifyContent: "space-between"
            },
            '.btn-cb-network:hover': {
                border: `1px solid ${Theme.colors.primary.main}`
            },
            '.btn-focus': {
                border: `1px solid ${Theme.colors.primary.main}`,
                boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
            },
            '.full-width': {
                width: '100%'
            }
        }
    });
});
define("@scom/scom-network-picker", ["require", "exports", "@ijstech/components", "@scom/scom-network-picker/assets.ts", "@scom/scom-network-picker/store/index.ts", "@scom/scom-network-picker/index.css.ts"], function (require, exports, components_4, assets_1, index_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomNetworkPicker = class ScomNetworkPicker extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
            this._networkList = [];
            this.networkPlaceholder = 'Select Network';
        }
        get selectedNetwork() {
            return this._selectedNetwork;
        }
        get type() {
            return this._type;
        }
        set type(value) {
            if (value === this._type)
                return;
            this._type = value;
            this.renderUI();
        }
        setNetworkByChainId(chainId) {
            const network = this.getNetwork(chainId);
            if (network)
                this.setNetwork(network);
        }
        clearNetwork() {
            this._selectedNetwork = undefined;
            this.btnNetwork.caption = this.networkPlaceholder;
            this.networkMapper.forEach((value, key) => {
                value.classList.remove('is-active');
            });
        }
        getNetwork(chainId) {
            return this._networkList.find(net => net.chainId === chainId) || null;
        }
        getNetworkLabel() {
            var _a, _b, _c;
            if (this._selectedNetwork) {
                const img = ((_a = this._selectedNetwork) === null || _a === void 0 ? void 0 : _a.img)
                    ? assets_1.default.img.network[this._selectedNetwork.img] ||
                        components_4.application.assets(this._selectedNetwork.img)
                    : undefined;
                return `<i-hstack verticalAlignment="center" gap="1.125rem">
        <i-panel>
          <i-image width=${17} height=${17} url="${img}"></i-image>
        </i-panel>
        <i-label caption="${(_c = (_b = this._selectedNetwork) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : ''}"></i-label>
      </i-hstack>`;
            }
            else {
                return this.type === 'button' ? 'Unsupported Network' : this.networkPlaceholder;
            }
        }
        setNetwork(network) {
            var _a;
            this._selectedNetwork = network;
            if (this.btnNetwork) {
                this.btnNetwork.caption = this.getNetworkLabel();
                this.btnNetwork.opacity = 1;
            }
            (_a = this.networkMapper) === null || _a === void 0 ? void 0 : _a.forEach((value, key) => {
                var _a;
                const chainId = (_a = this._selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId;
                if (key === chainId) {
                    value.classList.add('is-active');
                }
                else {
                    value.classList.remove('is-active');
                }
            });
        }
        async onNetworkSelected(network) {
            this.mdNetwork.visible = false;
            if (!network)
                return;
            if (this._switchNetworkOnSelect)
                await index_1.switchNetwork(network.chainId);
            this.setNetwork(network);
            this._onCustomNetworkSelected && this._onCustomNetworkSelected(network);
        }
        // private updateConnectedLabel(isConnected: boolean) {
        //   if (isConnected) {
        //     this.lbConnected.caption = 'Connected'
        //     this.lbConnected.font = {color: Theme.colors.success.main, weight: 500, size: '13px'}
        //     this.lbConnected.background = {color: Theme.colors.success.light}
        //   } else {
        //     this.lbConnected.caption = 'Not Connected'
        //     this.lbConnected.font = {color: Theme.colors.error.main, weight: 500, size: '13px'}
        //     this.lbConnected.background = {color: Theme.colors.error.light}
        //   }
        // }
        renderNetworks() {
            this.gridNetworkGroup.clearInnerHTML();
            this.networkMapper = new Map();
            this.gridNetworkGroup.append(...this._networkList.map((network) => {
                const img = network.img ? (this.$render("i-image", { url: assets_1.default.img.network[network.img] || components_4.application.assets(network.img), width: this.type === 'button' ? 34 : 16, height: this.type === 'button' ? 34 : 16 })) : ([]);
                const isActive = this._selectedNetwork ? this._selectedNetwork.chainId === network.chainId : false;
                const hsNetwork = (this.$render("i-hstack", { onClick: () => this.onNetworkSelected(network), background: { color: this.type === 'button' ? Theme.colors.secondary.light : 'transparent' }, border: { radius: this.type === 'button' ? 10 : '0px' }, position: 'relative', class: isActive ? 'is-active list-item' : 'list-item', verticalAlignment: "center", overflow: "hidden", padding: this.type === 'button' ? { top: '0.65rem', bottom: '0.65rem', left: '0.5rem', right: '0.5rem' } : { top: '5px', bottom: '5px', left: '0.75rem', right: '0.75rem' } },
                    this.$render("i-hstack", { margin: { left: this.type === 'button' ? '1rem' : '0px' }, verticalAlignment: 'center', gap: this.type === 'button' ? '0.75rem' : '1.125rem', lineHeight: 1.375 },
                        this.$render("i-panel", null, img),
                        this.$render("i-label", { caption: network.name, wordBreak: 'break-word', font: {
                                size: '.875rem',
                                bold: this.type === 'button',
                                color: this.type === 'button' ? Theme.colors.primary.dark : Theme.text.primary,
                                weight: 400
                            }, class: "is-ellipsis" }))));
                this.networkMapper.set(network.chainId, hsNetwork);
                return hsNetwork;
            }));
        }
        renderModalItem() {
            const grid = (this.$render("i-grid-layout", { id: 'gridNetworkGroup', width: '100%', columnsPerRow: 1, templateRows: ['max-content'], class: `list-view ${this.type === 'button' ? ' is-button' : 'is-combobox'}`, gap: { row: this.type === 'button' ? '0.5rem' : '0px' } }));
            if (this.type === 'button') {
                return (this.$render("i-vstack", { height: "100%", padding: { left: '1rem', right: '1rem', bottom: '2rem', top: '0.5rem' }, lineHeight: 1.5, gap: "1rem" },
                    this.$render("i-hstack", { horizontalAlignment: "space-between", class: "i-modal_header" },
                        this.$render("i-label", { caption: "Supported Network", font: { color: Theme.colors.primary.main, size: '1rem' } }),
                        this.$render("i-icon", { name: "times", width: 16, height: 16, fill: Theme.colors.primary.main, onClick: () => this.mdNetwork.visible = false })),
                    this.$render("i-label", { id: 'lblNetworkDesc', font: { size: '.875rem' }, wordBreak: 'break-word', caption: 'We support the following networks, please click to connect.' }),
                    this.$render("i-panel", { height: 'calc(100% - 160px)', overflow: { y: 'auto' } }, grid)));
            }
            else {
                return (this.$render("i-panel", { margin: { top: '0.25rem' }, padding: { top: 5, bottom: 5 }, overflow: { y: 'auto' }, maxHeight: 300, border: { radius: 2 } }, grid));
            }
        }
        async renderUI() {
            this.pnlNetwork.clearInnerHTML();
            if (this._type === 'combobox')
                await this.renderCombobox();
            else
                await this.renderButton();
            this.mdNetwork.item = this.renderModalItem();
            this.mdNetwork.classList.add('os-modal');
            this.btnNetwork.classList.add('btn-network');
            this.pnlNetwork.appendChild(this.btnNetwork);
            this.pnlNetwork.appendChild(this.mdNetwork);
            this.renderNetworks();
        }
        async renderButton() {
            this.mdNetwork = await components_4.Modal.create({
                width: 440,
                border: { radius: 10 }
            });
            this.btnNetwork = await components_4.Button.create({
                height: 40,
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
                border: { radius: 5 },
                font: { color: Theme.colors.primary.contrastText },
                caption: this.getNetworkLabel(),
                onClick: () => {
                    this.mdNetwork.visible = !this.mdNetwork.visible;
                }
            });
        }
        async renderCombobox() {
            this.mdNetwork = await components_4.Modal.create({
                showBackdrop: false,
                minWidth: 200,
                popupPlacement: 'bottom'
            });
            this.mdNetwork.classList.add('full-width');
            this.btnNetwork = await components_4.Button.create({
                lineHeight: 1.875,
                width: '100%',
                padding: {
                    top: '0.5rem',
                    bottom: '0.5rem',
                    left: '0.75rem',
                    right: '0.75rem',
                },
                border: { radius: 5, width: '1px', style: 'solid', color: Theme.divider },
                font: { color: Theme.text.primary },
                rightIcon: { name: 'angle-down', width: 20, height: 20, fill: 'rgba(0,0,0,.45)' },
                background: { color: 'transparent' },
                caption: this.getNetworkLabel(),
                onClick: () => {
                    this.mdNetwork.visible = !this.mdNetwork.visible;
                    this.btnNetwork.classList.add('btn-focus');
                }
            });
            this.btnNetwork.classList.add('btn-cb-network');
            this.mdNetwork.classList.add('box-shadow');
            this.mdNetwork.onClose = () => {
                var _a;
                this.btnNetwork.opacity = ((_a = this._selectedNetwork) === null || _a === void 0 ? void 0 : _a.chainId) ? 1 : 0.5;
            };
            this.mdNetwork.onOpen = () => {
                this.btnNetwork.opacity = 0.5;
            };
        }
        init() {
            this.classList.add(index_css_1.default);
            super.init();
            const networksAttr = this.getAttribute('networks', true);
            this._networkList = networksAttr === '*' ? index_1.networks : networksAttr;
            const selectedChainId = this.getAttribute('selectedChainId', true);
            if (selectedChainId)
                this.setNetworkByChainId(selectedChainId);
            this._switchNetworkOnSelect = this.getAttribute('switchNetworkOnSelect', true, false);
            this._onCustomNetworkSelected = this.getAttribute('onCustomNetworkSelected', true);
            this.type = this.getAttribute('type', true, 'button');
            document.addEventListener('click', (event) => {
                const target = event.target;
                const btnNetwork = target.closest('.btn-network');
                if (!btnNetwork || !btnNetwork.isSameNode(this.btnNetwork)) {
                    this.btnNetwork.classList.remove('btn-focus');
                }
                else {
                    this.btnNetwork.classList.add('btn-focus');
                }
            });
        }
        render() {
            return (this.$render("i-panel", { width: '100%' },
                this.$render("i-panel", { id: 'pnlNetwork', width: '100%' })));
        }
    };
    ScomNetworkPicker = __decorate([
        components_4.customModule,
        components_4.customElements('i-scom-network-picker')
    ], ScomNetworkPicker);
    exports.default = ScomNetworkPicker;
});
