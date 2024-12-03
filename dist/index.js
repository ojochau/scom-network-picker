var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-network-picker/store/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("@scom/scom-network-picker/store/index.ts", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/scom-network-list"], function (require, exports, components_1, eth_wallet_1, scom_network_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNetworks = exports.switchNetwork = exports.isWalletConnected = exports.WalletPlugin = void 0;
    var WalletPlugin;
    (function (WalletPlugin) {
        WalletPlugin["MetaMask"] = "metamask";
        WalletPlugin["WalletConnect"] = "walletconnect";
    })(WalletPlugin = exports.WalletPlugin || (exports.WalletPlugin = {}));
    function isWalletConnected() {
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        return wallet.isConnected;
    }
    exports.isWalletConnected = isWalletConnected;
    async function switchNetwork(chainId) {
        if (!isWalletConnected()) {
            components_1.application.EventBus.dispatch("chainChanged" /* EventId.chainChanged */, chainId);
            return;
        }
        const wallet = eth_wallet_1.Wallet.getClientInstance();
        if (wallet?.clientSideProvider?.name === WalletPlugin.MetaMask) {
            await wallet.switchNetwork(chainId);
        }
    }
    exports.switchNetwork = switchNetwork;
    const getNetworks = (value) => {
        if (!value)
            return [];
        const defaultNetworks = (0, scom_network_list_1.default)();
        if (value === '*')
            return defaultNetworks;
        return value.reduce((result, item) => {
            const network = defaultNetworks.find(net => net.chainId === item.chainId);
            if (network)
                result.push(network);
            return result;
        }, []);
    };
    exports.getNetworks = getNetworks;
});
define("@scom/scom-network-picker/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fullWidthStyles = exports.modalStyles = exports.focusStyles = exports.buttonStyles = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.default = components_2.Styles.style({
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
            }
        }
    });
    exports.buttonStyles = components_2.Styles.style({
        justifyContent: "space-between",
        $nest: {
            '&:hover': {
                border: `1px solid ${Theme.colors.primary.main}`
            }
        }
    });
    exports.focusStyles = components_2.Styles.style({
        border: `1px solid ${Theme.colors.primary.main}`,
        boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
    });
    exports.modalStyles = components_2.Styles.style({
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
                                        opacity: '0.75 !important',
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
                                        background: Theme.colors.success.main,
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
                                        opacity: .75
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
                                background: Theme.action.activeBackground,
                                fontWeight: 600
                            },
                            '.list-item:not(.is-active):hover': {
                                background: Theme.action.hoverBackground
                            }
                        }
                    }
                }
            },
            '&> div': {
                transform: 'scale(1)'
            }
        }
    });
    exports.fullWidthStyles = components_2.Styles.style({
        width: '100%'
    });
});
define("@scom/scom-network-picker/translations.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-network-picker/translations.json.ts'/> 
    exports.default = {
        "en": {
            "select_network": "Select Network",
            "unsupported_network": "Unsupported Network",
            "supported_network": "Supported Network",
            "we_support_the_following_networks_please_click_to_connect": "We support the following networks, please click to connect."
        },
        "zh-hant": {},
        "vi": {
            "select_network": "Chọn Mạng",
            "unsupported_network": "Mạng không được hỗ trợ",
            "supported_network": "Mạng được hỗ trợ",
            "we_support_the_following_networks_please_click_to_connect": "Chúng tôi hỗ trợ các mạng sau, vui lòng nhấp vào để kết nối."
        }
    };
});
define("@scom/scom-network-picker", ["require", "exports", "@ijstech/components", "@scom/scom-network-picker/store/index.ts", "@scom/scom-network-picker/index.css.ts", "@scom/scom-network-picker/translations.json.ts"], function (require, exports, components_3, index_1, index_css_1, translations_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_3.Styles.Theme.ThemeVars;
    let ScomNetworkPicker = class ScomNetworkPicker extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this._readOnly = false;
            this._networkList = [];
            this.networkPlaceholder = '$select_network';
        }
        get readOnly() {
            return this._readOnly;
        }
        set readOnly(value) {
            this._readOnly = value;
        }
        get selectedNetwork() {
            return this._selectedNetwork;
        }
        get type() {
            return this._type;
        }
        async setType(value) {
            if (value === this._type)
                return;
            this._type = value;
            await this.renderUI();
        }
        get networkList() {
            return this._networkList;
        }
        set networkList(value) {
            this._networkList = value;
        }
        set networks(value) {
            this._networkList = (0, index_1.getNetworks)(value);
            if (this._type)
                this.renderNetworks();
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
            if (this._selectedNetwork) {
                const img = this._selectedNetwork?.image || undefined;
                return `<i-hstack verticalAlignment="center" gap="0.5rem">
        <i-panel>
          <i-image width=${24} height=${24} url="${img}"></i-image>
        </i-panel>
        <i-label caption="${this._selectedNetwork?.chainName ?? ''}" textOverflow="ellipsis"></i-label>
      </i-hstack>`;
            }
            else {
                return this.type === 'button' ? '$unsupported_network' : this.networkPlaceholder;
            }
        }
        setNetwork(network) {
            this._selectedNetwork = network;
            if (this.btnNetwork) {
                this.btnNetwork.caption = this.getNetworkLabel();
                this.btnNetwork.opacity = 1;
            }
            this.networkMapper?.forEach((value, key) => {
                const chainId = this._selectedNetwork?.chainId;
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
            if (!network || this.readOnly)
                return;
            if (this._switchNetworkOnSelect)
                await (0, index_1.switchNetwork)(network.chainId);
            this.setNetwork(network);
            this._onCustomNetworkSelected && this._onCustomNetworkSelected(network);
            if (this.onChanged) {
                this.onChanged(network);
            }
        }
        renderNetworks() {
            if (!this.gridNetworkGroup)
                return;
            this.gridNetworkGroup.clearInnerHTML();
            this.networkMapper = new Map();
            this.gridNetworkGroup.append(...this._networkList.map((network) => {
                const img = network.image ? (this.$render("i-image", { url: network.image, width: this.type === 'button' ? 34 : 24, height: this.type === 'button' ? 34 : 24 })) : ([]);
                const isActive = this._selectedNetwork ? this._selectedNetwork.chainId === network.chainId : false;
                const hsNetwork = (this.$render("i-hstack", { onClick: () => this.onNetworkSelected(network), background: { color: this.type === 'button' ? Theme.colors.secondary.light : 'transparent' }, border: { radius: this.type === 'button' ? 10 : '0px' }, position: 'relative', class: isActive ? 'is-active list-item' : 'list-item', verticalAlignment: "center", overflow: "hidden", padding: this.type === 'button' ? { top: '0.65rem', bottom: '0.65rem', left: '0.5rem', right: '0.5rem' } : { top: '5px', bottom: '5px', left: '0.75rem', right: '0.75rem' } },
                    this.$render("i-hstack", { margin: { left: this.type === 'button' ? '1rem' : '0px' }, verticalAlignment: 'center', gap: this.type === 'button' ? '0.75rem' : '0.5rem', lineHeight: 1.375 },
                        this.$render("i-panel", null, img),
                        this.$render("i-label", { caption: network.chainName, wordBreak: 'break-word', font: {
                                bold: this.type === 'button',
                                color: this.type === 'button' ? Theme.colors.primary.dark : Theme.text.primary,
                                weight: 400
                            }, textOverflow: 'ellipsis' }))));
                this.networkMapper.set(network.chainId, hsNetwork);
                return hsNetwork;
            }));
        }
        renderModalItem() {
            const grid = (this.$render("i-grid-layout", { id: 'gridNetworkGroup', width: '100%', columnsPerRow: 1, templateRows: ['max-content'], class: `list-view ${this.type === 'button' ? ' is-button' : 'is-combobox'}`, gap: { row: this.type === 'button' ? '0.5rem' : '0px' } }));
            if (this.type === 'button') {
                return (this.$render("i-vstack", { height: "100%", padding: { left: '1rem', right: '1rem', bottom: '2rem', top: '0.5rem' }, lineHeight: 1.5, gap: "1rem" },
                    this.$render("i-hstack", { horizontalAlignment: "space-between", class: "i-modal_header" },
                        this.$render("i-label", { caption: "$supported_network", font: { color: Theme.colors.primary.main, size: '1rem' } }),
                        this.$render("i-icon", { name: "times", width: 16, height: 16, fill: Theme.colors.primary.main, onClick: () => this.mdNetwork.visible = false })),
                    this.$render("i-label", { id: 'lblNetworkDesc', font: { size: '.875rem' }, wordBreak: 'break-word', caption: '$we_support_the_following_networks_please_click_to_connect' }),
                    this.$render("i-panel", { height: 'calc(100% - 160px)', overflow: { y: 'auto' } }, grid)));
            }
            else {
                return (this.$render("i-panel", { margin: { top: '0.25rem' }, padding: { top: 5, bottom: 5 }, overflow: { y: 'auto' }, maxHeight: 300, border: { radius: 2 } }, grid));
            }
        }
        async renderUI() {
            if (!this.pnlNetwork) {
                this.pnlNetwork = new components_3.Panel();
            }
            this.pnlNetwork.clearInnerHTML();
            if (this._type === 'combobox')
                await this.renderCombobox();
            else
                await this.renderButton();
            this.mdNetwork.visible = false;
            this.mdNetwork.item = this.renderModalItem();
            this.mdNetwork.classList.add(index_css_1.modalStyles);
            this.pnlNetwork.appendChild(this.btnNetwork);
            this.pnlNetwork.appendChild(this.mdNetwork);
            this.renderNetworks();
        }
        async renderButton() {
            this.mdNetwork = await components_3.Modal.create({
                width: 440,
                border: { radius: 10 },
                padding: { top: 0, bottom: 0, left: 0, right: 0 }
            });
            this.btnNetwork = await components_3.Button.create({
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
                boxShadow: 'none',
                onClick: () => {
                    if (this.readOnly) {
                        this.mdNetwork.visible = false;
                        return;
                    }
                    this.mdNetwork.visible = !this.mdNetwork.visible;
                }
            });
            this.btnNetwork.id = 'btnNetwork';
        }
        async renderCombobox() {
            this.mdNetwork = await components_3.Modal.create({
                showBackdrop: false,
                minWidth: 200,
                width: '100%',
                popupPlacement: 'bottomLeft',
                boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
            });
            this.mdNetwork.classList.add(index_css_1.fullWidthStyles);
            this.btnNetwork = await components_3.Button.create({
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
                rightIcon: { name: 'angle-down', width: 20, height: 20, fill: Theme.text.primary },
                background: { color: 'transparent' },
                caption: this.getNetworkLabel(),
                class: index_css_1.buttonStyles,
                onClick: () => {
                    if (this.readOnly) {
                        this.mdNetwork.visible = false;
                        return;
                    }
                    this.mdNetwork.visible = !this.mdNetwork.visible;
                    this.btnNetwork.classList.add(index_css_1.focusStyles);
                }
            });
            this.mdNetwork.onClose = () => {
                this.btnNetwork.opacity = 1;
            };
            this.mdNetwork.onOpen = () => {
                this.btnNetwork.opacity = 0.75;
            };
        }
        async init() {
            this.i18n.init({ ...translations_json_1.default });
            this.classList.add(index_css_1.default);
            await super.init();
            const networksAttr = this.getAttribute('networks', true);
            if (networksAttr)
                this._networkList = (0, index_1.getNetworks)(networksAttr);
            const selectedChainId = this.getAttribute('selectedChainId', true);
            if (selectedChainId)
                this.setNetworkByChainId(selectedChainId);
            this._switchNetworkOnSelect = this.getAttribute('switchNetworkOnSelect', true, false);
            this._onCustomNetworkSelected = this.getAttribute('onCustomNetworkSelected', true);
            this._readOnly = this.getAttribute('readOnly', true, false);
            this._type = this.getAttribute('type', true, 'button');
            await this.renderUI();
            document.addEventListener('click', (event) => {
                const target = event.target;
                const btnNetwork = target.closest('#btnNetwork');
                if (!btnNetwork || !btnNetwork.isSameNode(this.btnNetwork)) {
                    this.btnNetwork.classList.remove(index_css_1.focusStyles);
                }
                else if (!this.readOnly) {
                    this.btnNetwork.classList.add(index_css_1.focusStyles);
                }
            });
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlNetwork', width: '100%' }));
        }
    };
    ScomNetworkPicker = __decorate([
        components_3.customModule,
        (0, components_3.customElements)('i-scom-network-picker')
    ], ScomNetworkPicker);
    exports.default = ScomNetworkPicker;
});
