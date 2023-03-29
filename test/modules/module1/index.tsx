import { Module, customModule, Container, VStack } from '@ijstech/components';
import ScomNetworkPicker from '@scom/scom-network-picker'
@customModule
export default class Module1 extends Module {
    private picker: ScomNetworkPicker;
    private mainStack: VStack;
    private _options: any;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        this._options = options;
    }

    init() {
        super.init();
        this.picker = new ScomNetworkPicker(undefined, {
            width: 300,
            type: 'combobox',
            selectedChainId: 97,
            networks: this._options.networks
        })
        this.mainStack.appendChild(this.picker);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
                <i-scom-network-picker
                    networks={this._options.networks}
                    switchNetworkOnSelect={true}
                ></i-scom-network-picker>
            </i-hstack>
        </i-panel>
    }
}