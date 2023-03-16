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
  application,
  Panel,
  Label,
  IEventBus,
  Container,
  Icon,
  Control
} from '@ijstech/components'
import {} from '@ijstech/eth-contract'
import Assets from './assets'
import {
  EventId,
  getDefaultChainId,
  getNetworkInfo,
  getSiteSupportedNetworks,
  getWalletProvider,
  INetwork,
  isDefaultNetworkFromWallet,
  isWalletConnected,
  switchNetwork,
  updateNetworks,
} from './store/index'
import customStyles from './index.css'
import { Wallet, WalletPlugin } from '@ijstech/eth-wallet'

type IType = 'button' | 'combobox'
interface PickerElement extends ControlElement {
  type?: IType
  networks?: INetwork[] | '*'
  env?: string
  infuraId?: string
  defaultChainId?: number
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
  private lblNetworkDesc: Label
  private pnlStatus: Panel
  private lbConnected: Label

  private $eventBus: IEventBus
  private _type: IType
  private networkMapper: Map<number, HStack>
  private supportedNetworks: INetwork[] = []
  private currActiveNetworkId: number
  private selectedNetwork: INetwork | undefined

  constructor(parent?: Container, options?: any) {
    super(parent, options)
    this.$eventBus = application.EventBus
    this.registerEvent()
    if (options) updateNetworks(options)
  }

  get type(): IType {
    return this._type
  }
  set type(value: IType) {
    if (value === this._type) return
    this._type = value
    this.renderUI()
  }

  registerEvent() {
    let wallet = Wallet.getInstance()

    this.$eventBus.register(
      this,
      EventId.IsWalletConnected,
      async (connected: boolean) => {
        this.selectedNetwork = getNetworkInfo(wallet.chainId)
        this.updateConnectedStatus()
        this.updateList(connected)
      }
    )
    this.$eventBus.register(
      this,
      EventId.IsWalletDisconnected,
      async (connected: boolean) => {
        this.selectedNetwork = getNetworkInfo(wallet.chainId)
        this.updateConnectedStatus()
        this.updateList(connected)
      }
    )
    this.$eventBus.register(
      this,
      EventId.chainChanged,
      async (chainId: number) => {
        this.onChainChanged(chainId)
      }
    )
  }

  private updateConnectedLabel(isConnected: boolean) {
    if (isConnected) {
      this.lbConnected.caption = 'Connected'
      this.lbConnected.font = {color: Theme.colors.success.main, weight: 500, size: '13px'}
      this.lbConnected.background = {color: Theme.colors.success.light}
    } else {
      this.lbConnected.caption = 'Not Connected'
      this.lbConnected.font = {color: Theme.colors.error.main, weight: 500, size: '13px'}
      this.lbConnected.background = {color: Theme.colors.error.light}
    }
  }

  private updateConnectedStatus = () => {
    if (!this.btnNetwork) return
    const isSupportedNetwork =
      this.selectedNetwork &&
      this.supportedNetworks.findIndex((network) => network === this.selectedNetwork) !== -1
    if (isSupportedNetwork && isWalletConnected()) {
      const img = this.selectedNetwork?.img
        ? Assets.img.network[this.selectedNetwork.img] ||
          application.assets(this.selectedNetwork.img)
        : undefined
      if (this.type === 'button') {
        this.btnNetwork.icon = img ? (
          <i-icon width={26} height={26} image={{ url: img }}></i-icon>
        ) : undefined
        this.btnNetwork.caption = this.selectedNetwork?.name ?? ''
      } else {
        this.btnNetwork.caption = `<i-hstack verticalAlignment="center" gap="1.125rem">
          <i-panel>
            <i-image width=${17} height=${17} url="${img}"></i-image>
          </i-panel>
          <i-label caption="${this.selectedNetwork?.name ?? ''}"></i-label>
        </i-hstack>`
      }
      this.updateConnectedLabel(true)
      this.btnNetwork.opacity = 1;
    } else {
      this.btnNetwork.icon = undefined;
      if (this.type === 'button') {
        this.btnNetwork.caption = isDefaultNetworkFromWallet()
          ? 'Unknown Network'
          : 'Unsupported Network';
      } else {
        this.btnNetwork.caption = 'Please select a supported network'
        this.btnNetwork.opacity = 0.5
      }
      this.updateConnectedLabel(false)
    }
  }

  private onChainChanged = async (chainId: number) => {
    this.selectedNetwork = getNetworkInfo(chainId)
    let wallet = Wallet.getClientInstance()
    const isConnected = wallet.isConnected
    this.updateConnectedStatus()
    this.updateList(isConnected)
  }

  private renderNetworks() {
    this.gridNetworkGroup.clearInnerHTML()
    this.networkMapper = new Map()
    this.supportedNetworks = getSiteSupportedNetworks()
    this.gridNetworkGroup.append(
      ...this.supportedNetworks.map((network) => {
        const img = network.img ? (
          <i-image
            url={Assets.img.network[network.img] || application.assets(network.img)}
            width={this.type === 'button' ? 34 : 16}
            height={this.type === 'button' ? 34 : 16}
          />
        ) : (
          []
        )
        const isActive = this.isNetworkActive(network.chainId)
        if (isActive) this.currActiveNetworkId = network.chainId
        const hsNetwork = (
          <i-hstack
            onClick={() => this.switchNetwork(network.chainId)}
            background={{ color: this.type === 'button' ? Theme.colors.secondary.light : 'transparent' }}
            border={{ radius: this.type === 'button' ? 10 : '0px' }}
            position='relative'
            class={isActive ? 'is-actived list-item' : 'list-item'}
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
                caption={network.name}
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
    this.pnlStatus.visible = this.type === 'combobox'
    if (this._type === 'combobox') await this.renderCombobox()
    else await this.renderButton()
    this.mdNetwork.item = this.renderModalItem()
    this.mdNetwork.classList.add('os-modal')
    this.btnNetwork.classList.add('btn-network')
    this.pnlNetwork.appendChild(this.btnNetwork)
    this.pnlNetwork.appendChild(this.mdNetwork)
    this.renderNetworks()
    if (this.currActiveNetworkId !== undefined)
      this.selectedNetwork = getNetworkInfo(this.currActiveNetworkId)
    this.updateConnectedStatus()
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
      caption: 'Unsupported Network',
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
      rightIcon: { name: 'angle-down', width: 20, height: 20, fill: 'rgba(0,0,0,.45)' },
      background: { color: 'transparent' },
      caption: 'Please select a supported network',
      onClick: () => {
        this.mdNetwork.visible = !this.mdNetwork.visible
        this.btnNetwork.classList.add('btn-focus')
      }
    })
    this.btnNetwork.classList.add('btn-cb-network')
    this.mdNetwork.classList.add('box-shadow')
    this.mdNetwork.onClose = () => {
      this.btnNetwork.opacity = this.currActiveNetworkId ? 1 : 0.5
    }
    this.mdNetwork.onOpen = () => {
      this.btnNetwork.opacity = 0.5
    }
  }

  private isNetworkActive(chainId: number) {
    return Wallet.getInstance().chainId === chainId
  }

  private async switchNetwork(chainId: number) {
    this.mdNetwork.visible = false
    if (!chainId || isDefaultNetworkFromWallet()) return
    await switchNetwork(chainId)
  }

  private updateDot(connected: boolean) {
    const wallet = Wallet.getClientInstance()
    if (
      this.currActiveNetworkId !== undefined &&
      this.currActiveNetworkId !== null &&
      this.networkMapper.has(this.currActiveNetworkId)
    ) {
      this.networkMapper
        .get(this.currActiveNetworkId)
        .classList.remove('is-actived')
    }
    if (connected && this.networkMapper.has(wallet.chainId)) {
      this.networkMapper.get(wallet.chainId).classList.add('is-actived')
    }
    this.currActiveNetworkId = wallet.chainId
  }

  private updateList(isConnected: boolean) {
    if (this.lblNetworkDesc) {
      if (isConnected && getWalletProvider() !== WalletPlugin.MetaMask) {
        this.lblNetworkDesc.caption =
          'We support the following networks, please switch network in the connected wallet.'
      } else {
        this.lblNetworkDesc.caption =
          'We support the following networks, please click to connect.'
      }
    }
    this.updateDot(isConnected)
  }

  init() {
    this.selectedNetwork = getNetworkInfo(getDefaultChainId())
    this.classList.add(customStyles)
    super.init()
    const typeAttr = this.getAttribute('type', true, 'button')
    if (typeAttr) this.type = typeAttr
    const env = this.getAttribute('env', true)
    const infuraId = this.getAttribute('infuraId', true)
    const networks = this.getAttribute('networks', true)
    const defaultChainId = this.getAttribute('defaultChainId', true)
    updateNetworks({env, infuraId, networks, defaultChainId})
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
        <i-hstack
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
        </i-hstack>
        <i-panel id='pnlNetwork' width='100%'></i-panel>
      </i-panel>
    )
  }
}
