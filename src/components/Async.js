import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'

/**
 * Async - 异步组件
 *
 * @example
 * import Async from 'react-component-async-module'
 * <Async
 *     modules={[
 *         System.import('./A.js')
 *     ]}>
 *     {ModuleA=>{
 *         return <ModuleA/>
 *     }}
 * </Async>
 *
 * */
export default class Async extends PureComponent {
	/**
	 * @property {Array} modules - 需要引用的modules,使用System.import进行引用,也可以使用同步的方式引用,如:require('xxx').default
	 * @property {Function} children - 异步回调
	 * @property {?Function} onError [()=>null] - 错误处理
	 * */
	static propTypes = {
		modules: PropTypes.array.isRequired,
		children: PropTypes.func.isRequired,
		onError: PropTypes.func
	};
	static defaultProps = {
		onError: ()=>null
	};

	constructor(props) {
		super(props);
		this._asyncModules = this.props.modules.filter(f=>f.constructor.name === "Promise");
		this._syncModules = this.props.modules.filter(f=>f.constructor.name === "Function");
		this.state = {
			ready: this._asyncModules.length > 0 ? false : true
		};
		this._modules = this._syncModules;
		this._mounted = false;
	}

	/**
	 * @private
	 * */
	async _load() {
		try {
			if (this._asyncModules.length > 0) {
				const modules = await Promise.all(this._asyncModules);
				this._modules = this._modules.concat(modules.map((module)=> {
					return module.default;
				}));
				if (this._mounted) {
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

	componentDidMount() {
		this._mounted = true;
		this._load();
	}

	render() {
		if (!this.state.ready) {
			return null;
		}
		return this.props.children(...this._modules);
	}

	componentWillUnmount() {
		this._mounted = false;
	}
}