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
  Control
} from '@ijstech/components'
import {} from '@ijstech/eth-contract'
import {
  INetworkConfig,
  getNetworks,
  switchNetwork,
} from './store/index'
import customStyles from './index.css'
import { INetwork } from '@ijstech/eth-wallet'

type IType = 'button' | 'combobox'
interface PickerElement extends ControlElement {
  type?: IType
  networks?: INetworkConfig[] | '*'
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

  private _type: IType
  private networkMapper: Map<number, HStack>
  private _networkList: INetwork[] = []
  private _selectedNetwork: INetwork | undefined
  private _switchNetworkOnSelect: boolean
  private networkPlaceholder = 'Select Network';
  private _onCustomNetworkSelected: (network: INetwork) => void;

  constructor(parent?: Container, options?: any) {
    super(parent, options)
  }

  get selectedNetwork() {
    return this._selectedNetwork
  }

  get type(): IType {
    return this._type
  }
  set type(value: IType) {
    if (value === this._type) return
    this._type = value
    this.renderUI()
  }

  get networkList() {
    return this._networkList
  }
  set networkList(value: INetwork[]) {
    this._networkList = value
  }

  setNetworkByChainId(chainId: number) {
    const network = this.getNetwork(chainId)
    if (network) this.setNetwork(network)
  }

  clearNetwork(){
    this._selectedNetwork = undefined
    this.btnNetwork.caption = this.networkPlaceholder
    this.networkMapper.forEach((value, key) => {
      value.classList.remove('is-active')
    });
  }

  private getNetwork(chainId: number) {
    return this._networkList.find(net => net.chainId === chainId) || null
  }

  private getNetworkLabel() {
    if (this._selectedNetwork) {
      const img = this._selectedNetwork?.image || undefined
      return `<i-hstack verticalAlignment="center" gap="1.125rem">
        <i-panel>
          <i-image width=${17} height=${17} url="${img}"></i-image>
        </i-panel>
        <i-label caption="${this._selectedNetwork?.chainName ?? ''}"></i-label>
      </i-hstack>`
    } else {
      return this.type === 'button' ? 'Unsupported Network' : this.networkPlaceholder
    }
  }

  private setNetwork(network: INetwork) {
    this._selectedNetwork = network;
    if (this.btnNetwork) {
      this.btnNetwork.caption = this.getNetworkLabel();
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
    if (!network) return
    if (this._switchNetworkOnSelect)
      await switchNetwork(network.chainId)
    this.setNetwork(network)
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

  private renderNetworks() {
    this.gridNetworkGroup.clearInnerHTML()
    this.networkMapper = new Map()
    this.gridNetworkGroup.append(
      ...this._networkList.map((network) => {
        const img = network.image ? (
          <i-image
            url={network.image}
            width={this.type === 'button' ? 34 : 16}
            height={this.type === 'button' ? 34 : 16}
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
            padding={this.type === 'button' ? {top: '0.65rem', bottom: '0.65rem', left: '0.5rem', right: '0.5rem'} : {top: '5px', bottom: '5px', left: '0.75rem', right: '0.75rem'}}
          >
            <i-hstack
              margin={{ left: this.type === 'button' ? '1rem' : '0px' }}
              verticalAlignment='center'
              gap={this.type === 'button' ? '0.75rem' : '1.125rem'}
              lineHeight={1.375}
            >
              <i-panel>{img}</i-panel>
              <i-label
                caption={network.chainName}
                wordBreak='break-word'
                font={{
                  size: '.875rem',
                  bold: this.type === 'button',
                  color: this.type === 'button' ? Theme.colors.primary.dark : Theme.text.primary,
                  weight: 400
                }}
                class="is-ellipsis"
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
          padding={{left: '1rem', right: '1rem', bottom: '2rem', top: '0.5rem'}}
          lineHeight={1.5} gap="1rem"
        >
          <i-hstack horizontalAlignment="space-between" class="i-modal_header">
            <i-label caption="Supported Network" font={{color: Theme.colors.primary.main, size: '1rem'}}></i-label>
            <i-icon name="times" width={16} height={16} fill={Theme.colors.primary.main} onClick={() => this.mdNetwork.visible = false}></i-icon>
          </i-hstack>
          <i-label
            id='lblNetworkDesc'
            font={{ size: '.875rem' }}
            wordBreak='break-word'
            caption='We support the following networks, please click to connect.'
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
          margin={{top: '0.25rem'}}
          padding={{top: 5, bottom: 5}}
          overflow={{ y: 'auto' }}
          maxHeight={300}
          border={{radius: 2}}
        >
          {grid}
        </i-panel>
      )
    }
  }

  private async renderUI() {
    this.pnlNetwork.clearInnerHTML()
    if (this._type === 'combobox') await this.renderCombobox()
    else await this.renderButton()
    this.mdNetwork.item = this.renderModalItem()
    this.mdNetwork.classList.add('os-modal')
    this.btnNetwork.classList.add('btn-network')
    this.pnlNetwork.appendChild(this.btnNetwork)
    this.pnlNetwork.appendChild(this.mdNetwork)
    this.renderNetworks()
  }

  private async renderButton() {
    this.mdNetwork = await Modal.create({
      width: 440,
      border: { radius: 10 }
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
      caption: this.getNetworkLabel(),
      onClick: () => {
        this.mdNetwork.visible = !this.mdNetwork.visible
      }
    })
  }

  private async renderCombobox() {
    this.mdNetwork = await Modal.create({
      showBackdrop: false,
      minWidth: 200,
      popupPlacement: 'bottom'
    });
    this.mdNetwork.classList.add('full-width')
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
      caption: this.getNetworkLabel(),
      onClick: () => {
        this.mdNetwork.visible = !this.mdNetwork.visible
        this.btnNetwork.classList.add('btn-focus')
      }
    })
    this.btnNetwork.classList.add('btn-cb-network')
    this.mdNetwork.classList.add('box-shadow')
    this.mdNetwork.onClose = () => {
      this.btnNetwork.opacity = this._selectedNetwork?.chainId ? 1 : 0.5
    }
    this.mdNetwork.onOpen = () => {
      this.btnNetwork.opacity = 0.5
    }
  }

  init() {
    this.classList.add(customStyles)
    super.init()
    const networksAttr = this.getAttribute('networks', true);
    this._networkList = getNetworks(networksAttr);
    const selectedChainId = this.getAttribute('selectedChainId', true);
    if (selectedChainId)
      this.setNetworkByChainId(selectedChainId);
    this._switchNetworkOnSelect = this.getAttribute('switchNetworkOnSelect', true, false);
    this._onCustomNetworkSelected = this.getAttribute('onCustomNetworkSelected', true);
    this.type = this.getAttribute('type', true, 'button');

    document.addEventListener('click', (event) => {
      const target = event.target as Control
      const btnNetwork = target.closest('.btn-network')
      if (!btnNetwork || !btnNetwork.isSameNode(this.btnNetwork)) {
        this.btnNetwork.classList.remove('btn-focus')
      } else {
        this.btnNetwork.classList.add('btn-focus')
      }
    })
  }
  render() {
    return (
      <i-panel width='100%'>
        {/* <i-hstack
          id="pnlStatus"
          verticalAlignment='center'
          horizontalAlignment='space-between'
          visible={false}
          margin={{bottom: '0.5rem'}}
          width='100%'
        >
          <i-label caption='Network'></i-label>
          <i-label
            id="lbConnected"
            caption='Not Connected'
            padding={{left: 5, right: 5, top: 2, bottom: 2}}
            border={{radius: 6}}
            lineHeight={1.5715}
          ></i-label>
        </i-hstack> */}
        <i-panel id='pnlNetwork' width='100%'></i-panel>
      </i-panel>
    )
  }
}
