import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'

/**
 * Async - 异步组件
 *
 * @example
 *
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
	 * @property {Array} modules - 需要引用的modules,使用System.import进行引用
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
		this.state = {
			ready: false
		};
		this._modules = [];
		this._mounted = false;
		console.log(this.props.modules)
	}

	/**
	 * @private
	 * */
	async _load() {
		try {
			let modules = await Promise.all(this.props.modules);
			this._modules = modules.map((module)=> {
				return module.default;
			});
			if (this._mounted) {
				this.setState({
					ready: true
				});
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