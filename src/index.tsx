import {
  customElements,
  ControlElement,
  customModule,
  Module,
  Button,
  Styles,
  Modal,
  GridLayout,
  HStack,
  Panel,
  Container,
  Control,
  Icon
} from '@ijstech/components'
import {
  INetworkConfig,
  getNetworks,
  switchNetwork,
} from './store/index'
export { INetworkConfig };
import customStyles, { buttonStyles, focusStyles, fullWidthStyles, modalStyles } from './index.css'
import { INetwork } from '@ijstech/eth-wallet'
import translations from './translations.json';

type IType = 'button' | 'combobox'
interface PickerElement extends ControlElement {
  readOnly?: boolean;
  type?: IType;
  networks?: INetworkConfig[] | '*';
  selectedChainId?: number;
  switchNetworkOnSelect?: boolean;
  onCustomNetworkSelected?: (network: INetwork) => void;
}
const Theme = Styles.Theme.ThemeVars

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-network-picker']: PickerElement
    }
  }
}

@customModule
@customElements('i-scom-network-picker')
export default class ScomNetworkPicker extends Module {
  private mdNetwork: Modal
  private gridNetworkGroup: GridLayout
  private pnlNetwork: Panel
  private btnNetwork: Button

  private _readOnly: boolean = false
  private _type: IType
  private networkMapper: Map<number, HStack>
  private _networkList: INetwork[] = []
  private _selectedNetwork: INetwork | undefined
  private _switchNetworkOnSelect: boolean
  private networkPlaceholder = '$select_network'
  private _onCustomNetworkSelected: (network: INetwork) => void;
  public onChanged: (network: INetwork) => void;

  constructor(parent?: Container, options?: any) {
    super(parent, options)
  }

  get readOnly() {
    return this._readOnly;
  }

  set readOnly(value: boolean) {
    this._readOnly = value;
  }

  get selectedNetwork() {
    return this._selectedNetwork
  }

  get type(): IType {
    return this._type
  }

  async setType(value: IType) {
    if (value === this._type) return;
    this._type = value;
    await this.renderUI();
  }

  get networkList() {
    return this._networkList
  }
  set networkList(value: INetwork[]) {
    this._networkList = value
  }

  set networks(value: INetworkConfig[]) {
    this._networkList = getNetworks(value);
    if (this._type) this.renderNetworks();
  }

  setNetworkByChainId(chainId: number) {
    const network = this.getNetwork(chainId)
    if (network) this.setNetwork(network)
  }

  clearNetwork() {
    this._selectedNetwork = undefined
    this.btnNetwork.caption = this.networkPlaceholder
    this.networkMapper.forEach((value, key) => {
      value.classList.remove('is-active')
    });
  }

  private getNetwork(chainId: number) {
    return this._networkList.find(net => net.chainId === chainId) || null
  }

  private updateButton() {
    if (this._selectedNetwork) {
      const img = this._selectedNetwork?.image || undefined
      this.btnNetwork.caption = this._selectedNetwork?.chainName ?? '';
      this.btnNetwork.icon = new Icon(this.btnNetwork, {image: {url: img, width: 24, height: 24}});
    } else {
      this.btnNetwork.caption = this.type === 'button' ? '$unsupported_network' : this.networkPlaceholder;
      this.btnNetwork.icon = undefined;
    }
  }

  private setNetwork(network: INetwork) {
    this._selectedNetwork = network;
    if (this.btnNetwork) {
      this.updateButton();
      this.btnNetwork.opacity = 1;
    }
    this.networkMapper?.forEach((value, key) => {
      const chainId = this._selectedNetwork?.chainId
      if (key === chainId) {
        value.classList.add('is-active')
      }
      else {
        value.classList.remove('is-active')
      }
    });
  }

  private async onNetworkSelected(network: INetwork) {
    this.mdNetwork.visible = false
    if (!network || this.readOnly) return
    if (this._switchNetworkOnSelect)
      await switchNetwork(network.chainId)
    this.setNetwork(network)
    this._onCustomNetworkSelected && this._onCustomNetworkSelected(network);
    if (this.onChanged) {
      this.onChanged(network);
    }
  }

  private renderNetworks() {
    if (!this.gridNetworkGroup) return;
    this.gridNetworkGroup.clearInnerHTML()
    this.networkMapper = new Map()
    this.gridNetworkGroup.append(
      ...this._networkList.map((network) => {
        const img = network.image ? (
          <i-image
            url={network.image}
            width={this.type === 'button' ? 34 : 24}
            height={this.type === 'button' ? 34 : 24}
          />
        ) : (
          []
        )
        const isActive = this._selectedNetwork ? this._selectedNetwork.chainId === network.chainId : false
        const hsNetwork = (
          <i-hstack
            onClick={() => this.onNetworkSelected(network)}
            background={{ color: this.type === 'button' ? Theme.colors.secondary.light : 'transparent' }}
            border={{ radius: this.type === 'button' ? 10 : '0px' }}
            position='relative'
            class={isActive ? 'is-active list-item' : 'list-item'}
            verticalAlignment="center"
            overflow="hidden"
            padding={this.type === 'button' ? { top: '0.65rem', bottom: '0.65rem', left: '0.5rem', right: '0.5rem' } : { top: '5px', bottom: '5px', left: '0.75rem', right: '0.75rem' }}
          >
            <i-hstack
              margin={{ left: this.type === 'button' ? '1rem' : '0px' }}
              verticalAlignment='center'
              gap={this.type === 'button' ? '0.75rem' : '0.5rem'}
              lineHeight={1.375}
            >
              <i-panel>{img}</i-panel>
              <i-label
                caption={network.chainName}
                wordBreak='break-word'
                font={{
                  bold: this.type === 'button',
                  color: this.type === 'button' ? Theme.colors.primary.dark : Theme.text.primary,
                  weight: 400
                }}
                textOverflow='ellipsis'
              />
            </i-hstack>
          </i-hstack>
        )
        this.networkMapper.set(network.chainId, hsNetwork)
        return hsNetwork
      })
    )
  }

  private renderModalItem() {
    const grid = (
      <i-grid-layout
        id='gridNetworkGroup'
        width='100%'
        columnsPerRow={1}
        templateRows={['max-content']}
        class={`list-view ${this.type === 'button' ? ' is-button' : 'is-combobox'}`}
        gap={{ row: this.type === 'button' ? '0.5rem' : '0px' }}
      ></i-grid-layout>
    )
    if (this.type === 'button') {
      return (
        <i-vstack
          height="100%"
          padding={{ left: '1rem', right: '1rem', bottom: '2rem', top: '0.5rem' }}
          lineHeight={1.5} gap="1rem"
        >
          <i-hstack horizontalAlignment="space-between" class="i-modal_header">
            <i-label caption="$supported_network" font={{ color: Theme.colors.primary.main, size: '1rem' }}></i-label>
            <i-icon name="times" width={16} height={16} fill={Theme.colors.primary.main} onClick={() => this.mdNetwork.visible = false}></i-icon>
          </i-hstack>
          <i-label
            id='lblNetworkDesc'
            font={{ size: '.875rem' }}
            wordBreak='break-word'
            caption='$we_support_the_following_networks_please_click_to_connect'
          ></i-label>
          <i-panel
            height={'calc(100% - 160px)'}
            overflow={{ y: 'auto' }}
          >
            {grid}
          </i-panel>
        </i-vstack>
      )
    } else {
      return (
        <i-panel
          margin={{ top: '0.25rem' }}
          padding={{ top: 5, bottom: 5 }}
          overflow={{ y: 'auto' }}
          maxHeight={300}
          border={{ radius: 2 }}
        >
          {grid}
        </i-panel>
      )
    }
  }

  private async renderUI() {
    if (!this.pnlNetwork) {
      this.pnlNetwork = new Panel();
    }
    this.pnlNetwork.clearInnerHTML();
    if (this._type === 'combobox') await this.renderCombobox()
    else await this.renderButton()
    this.mdNetwork.visible = false;
    this.mdNetwork.item = this.renderModalItem();
    this.mdNetwork.classList.add(modalStyles)
    this.pnlNetwork.appendChild(this.btnNetwork)
    this.pnlNetwork.appendChild(this.mdNetwork)
    this.renderNetworks()
  }

  private async renderButton() {
    this.mdNetwork = await Modal.create({
      width: 440,
      border: { radius: 10 },
      padding: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    this.btnNetwork = await Button.create({
      height: 40,
      padding: {
        top: '0.5rem',
        bottom: '0.5rem',
        left: '0.75rem',
        right: '0.75rem',
      },
      border: { radius: 5 },
      font: { color: Theme.colors.primary.contrastText },
      caption: '',
      boxShadow: 'none',
      onClick: () => {
        if (this.readOnly) {
          this.mdNetwork.visible = false;
          return;
        }
        this.mdNetwork.visible = !this.mdNetwork.visible
      }
    })
    this.btnNetwork.id = 'btnNetwork'
    this.updateButton();
  }

  private async renderCombobox() {
    this.mdNetwork = await Modal.create({
      showBackdrop: false,
      minWidth: 200,
      width: '100%',
      popupPlacement: 'bottomLeft',
      boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
    });
    this.mdNetwork.classList.add(fullWidthStyles)
    this.btnNetwork = await Button.create({
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
      caption: '',
      class: buttonStyles,
      onClick: () => {
        if (this.readOnly) {
          this.mdNetwork.visible = false;
          return;
        }
        this.mdNetwork.visible = !this.mdNetwork.visible
        this.btnNetwork.classList.add(focusStyles)
      }
    })
    this.updateButton();
    this.mdNetwork.onClose = () => {
      this.btnNetwork.opacity = 1
    }
    this.mdNetwork.onOpen = () => {
      this.btnNetwork.opacity = 0.75
    }
  }

  async init() {
    this.i18n.init({...translations})
    this.classList.add(customStyles)
    await super.init();
    const networksAttr = this.getAttribute('networks', true);
    if (networksAttr) this._networkList = getNetworks(networksAttr);
    const selectedChainId = this.getAttribute('selectedChainId', true);
    if (selectedChainId) this.setNetworkByChainId(selectedChainId);
    this._switchNetworkOnSelect = this.getAttribute('switchNetworkOnSelect', true, false);
    this._onCustomNetworkSelected = this.getAttribute('onCustomNetworkSelected', true);
    this._readOnly = this.getAttribute('readOnly', true, false);
    this._type = this.getAttribute('type', true, 'button');
    await this.renderUI();
    document.addEventListener('click', (event) => {
      const target = event.target as Control
      const btnNetwork = target.closest('#btnNetwork')
      if (!btnNetwork || !btnNetwork.isSameNode(this.btnNetwork)) {
        this.btnNetwork.classList.remove(focusStyles)
      } else if (!this.readOnly) {
        this.btnNetwork.classList.add(focusStyles)
      }
    })
  }
  render() {
    return (
      <i-panel id='pnlNetwork' width='100%'></i-panel>
    )
  }
}
