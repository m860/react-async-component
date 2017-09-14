'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var Async = function (_PureComponent) {
	(0, _inherits3.default)(Async, _PureComponent);

	/**@private*/

	/**
  * @property {Array} modules - 需要引用的modules,使用System.import进行引用
  * @property {Function} children - 异步回调
  * @property {?Function} onError [()=>null] - 错误处理
  * */
	function Async(props) {
		(0, _classCallCheck3.default)(this, Async);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Async.__proto__ || (0, _getPrototypeOf2.default)(Async)).call(this, props));

		_this.state = {
			ready: false
		};
		_this._modules = [];
		_this._mounted = false;
		console.log(_this.props.modules);
		return _this;
	}

	/**
  * @private
  * */


	(0, _createClass3.default)(Async, [{
		key: '_load',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
				var modules;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.prev = 0;
								_context.next = 3;
								return _promise2.default.all(this.props.modules);

							case 3:
								modules = _context.sent;

								this._modules = modules.map(function (module) {
									return module.default;
								});
								if (this._mounted) {
									this.setState({
										ready: true
									});
								}
								_context.next = 11;
								break;

							case 8:
								_context.prev = 8;
								_context.t0 = _context['catch'](0);

								this.props.onError(_context.t0);

							case 11:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[0, 8]]);
			}));

			function _load() {
				return _ref.apply(this, arguments);
			}

			return _load;
		}()
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
			this._load();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props;

			if (!this.state.ready) {
				return null;
			}
			return (_props = this.props).children.apply(_props, (0, _toConsumableArray3.default)(this._modules));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
		}
	}]);
	return Async;
}(_react.PureComponent);

Async.propTypes = {
	modules: _propTypes2.default.array.isRequired,
	children: _propTypes2.default.func.isRequired,
	onError: _propTypes2.default.func
};
Async.defaultProps = {
	onError: function onError() {
		return null;
	}
};
exports.default = Async;