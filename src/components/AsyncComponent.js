import React, {Component} from 'react';
import PropTypes from 'prop-types'

/**
 * 异步组件
 *
 * @example
 *
 * import AsyncComponent from 'react-async-component'
 *
 * <AsyncComponent
 *     components={[
 *         System.import('./A.js')
 *     ]}>
 *     {ModuleA=>{
 *         return <ModuleA/>
 *     }}
 * </AsyncComponent>
 *
 * */
export default class AsyncComponent extends Component {
    /**
     * propTypes
     *
     * @property {Array} components - components,使用`System.import`(webpack 4建议使用`import`的方式引用,需要使用babel插件`babel-plugin-syntax-dynamic-import`)进行引用,也可以使用同步的方式引用,如:require('xxx').default
     * @property {Function} children - 异步回调
     * @property {?Function} renderLoading
     * @property {?Function} renderError - renderError包含一个参数
     * */
    static propTypes = {
        components: PropTypes.array.isRequired,
        children: PropTypes.func.isRequired,
        renderLoading: PropTypes.func,
        renderError: PropTypes.func,
    };

    constructor(props) {
        super(props);
        //异步component
        this.asyncComponents = props.components.filter(f => f.constructor.name === "Promise");
        this.state = {
            //是否就绪
            ready: this.asyncComponents.length > 0 ? false : true,
            //错误信息
            error: null
        };
        //已就绪的component,包括同步component
        this.components = props.components.filter(f => f.constructor.name === "Function");
    }

    /**
     * @private
     * */
    async fetchAllComponent() {
        try {
            if (this.asyncComponents.length > 0) {
                const modules = await Promise.all(this.asyncComponents);
                //将异步component合并到组件列表中
                this.components = this.components.concat(modules.map((module) => {
                    return module.default;
                }));
                this.setState({
                    ready: true
                });
            }
        }
        catch (ex) {
            this.setState({
                error: ex
            });
        }
    }

    async componentDidMount() {
        await this.fetchAllComponent();
    }

    render() {
        if (!this.state.ready) {
            return this.props.renderLoading ? this.props.renderLoading() : null;
        }
        if (this.state.error) {
            return this.props.renderError ? this.props.renderError(this.state.error) : this.state.error.message;
        }
        return this.props.children(...this.components);
    }

}