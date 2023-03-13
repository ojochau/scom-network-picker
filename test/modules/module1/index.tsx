import { Module, customModule, Container, VStack } from '@ijstech/components';
import ScomNetworkPicker from '@scom/scom-network-picker'
@customModule
export default class Module1 extends Module {
    private picker1: ScomNetworkPicker;
    private picker2: ScomNetworkPicker;
    private mainStack: VStack;
    private _options: any;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        this._options = options;
    }

    init() {
        super.init();
        this.picker1 = new ScomNetworkPicker(undefined, {
            env: this._options.env,
            networks: this._options.networks
        })
        this.mainStack.appendChild(this.picker1);
        this.picker2 = new ScomNetworkPicker(undefined, {
            maxWidth: 200,
            type: 'combobox',
            env: this._options.env,
            networks: this._options.networks
        })
        this.mainStack.appendChild(this.picker2);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
            </i-hstack>
        </i-panel>
    }
}