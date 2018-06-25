import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'

/**
 * Async - 异步组件
 *
 * @example
 * import Async from 'react-async-component'
 * <Async
 *     components={[
 *         System.import('./A.js')
 *     ]}>
 *     {ModuleA=>{
 *         return <ModuleA/>
 *     }}
 * </Async>
 *
 * */
export default class AsyncComponent extends PureComponent {
    /**
     * @property {Array} components - components,使用System.import进行引用,也可以使用同步的方式引用,如:require('xxx').default
     * @property {Function} children - 异步回调
     * @property {?Function} onError [()=>null] - 错误处理
     * */
    static propTypes = {
        components: PropTypes.array.isRequired,
        children: PropTypes.func.isRequired,
        onError: PropTypes.func
    };
    static defaultProps = {
        onError: () => null
    };

    constructor(props) {
        super(props);
        this.asyncComponents = props.components.filter(f => f.constructor.name === "Promise");
        this.syncComponents = props.components.filter(f => f.constructor.name === "Function");
        this.state = {
            ready: this.asyncComponents.length > 0 ? false : true
        };
        this.components = this.syncComponents;
        this.mounted = false;
    }

    /**
     * @private
     * */
    async fetchAllComponent() {
        try {
            if (this.asyncComponents.length > 0) {
                const modules = await Promise.all(this.asyncComponents);
                this.components = this.components.concat(modules.map((module) => {
                    return module.default;
                }));
                if (this.mounted) {
                    this.setState({
                        ready: true
                    });
                }
            }
        }
        catch (ex) {
            this.props.onError(ex);
        }
    }

    async componentDidMount() {
        this.mounted = true;
        await this.fetchAllComponent();
    }

    render() {
        if (!this.state.ready) {
            return null;
        }
        return this.props.children(...this.components);
    }

    componentWillUnmount() {
        this.mounted = false;
    }
}