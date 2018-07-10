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
var AsyncComponent = function (_Component) {
    (0, _inherits3.default)(AsyncComponent, _Component);

    function AsyncComponent(props) {
        (0, _classCallCheck3.default)(this, AsyncComponent);

        //异步component
        var _this = (0, _possibleConstructorReturn3.default)(this, (AsyncComponent.__proto__ || (0, _getPrototypeOf2.default)(AsyncComponent)).call(this, props));

        _this.asyncComponents = props.components.filter(function (f) {
            return f.constructor.name === "Promise";
        });
        _this.state = {
            //是否就绪
            ready: _this.asyncComponents.length > 0 ? false : true,
            //错误信息
            error: null
        };
        //已就绪的component,包括同步component
        _this.components = props.components.filter(function (f) {
            return f.constructor.name === "Function";
        });
        return _this;
    }

    /**
     * @private
     * */

    /**
     * propTypes
     *
     * @property {Array} components - components,使用`System.import`(webpack 4建议使用`import`的方式引用,需要使用babel插件`babel-plugin-syntax-dynamic-import`)进行引用,也可以使用同步的方式引用,如:require('xxx').default
     * @property {Function} children - 异步回调
     * @property {?Function} renderLoading
     * @property {?Function} renderError - renderError包含一个参数
     * */


    (0, _createClass3.default)(AsyncComponent, [{
        key: 'fetchAllComponent',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var modules;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!(this.asyncComponents.length > 0)) {
                                    _context.next = 7;
                                    break;
                                }

                                _context.next = 4;
                                return _promise2.default.all(this.asyncComponents);

                            case 4:
                                modules = _context.sent;

                                //将异步component合并到组件列表中
                                this.components = this.components.concat(modules.map(function (module) {
                                    return module.default;
                                }));
                                this.setState({
                                    ready: true
                                });

                            case 7:
                                _context.next = 12;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](0);

                                this.setState({
                                    error: _context.t0
                                });

                            case 12:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 9]]);
            }));

            function fetchAllComponent() {
                return _ref.apply(this, arguments);
            }

            return fetchAllComponent;
        }()
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.fetchAllComponent();

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function componentDidMount() {
                return _ref2.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: 'render',
        value: function render() {
            var _props;

            if (!this.state.ready) {
                return this.props.renderLoading ? this.props.renderLoading() : null;
            }
            if (this.state.error) {
                return this.props.renderError ? this.props.renderError(this.state.error) : this.state.error.message;
            }
            return (_props = this.props).children.apply(_props, (0, _toConsumableArray3.default)(this.components));
        }
    }]);
    return AsyncComponent;
}(_react.Component);

AsyncComponent.propTypes = {
    components: _propTypes2.default.array.isRequired,
    children: _propTypes2.default.func.isRequired,
    renderLoading: _propTypes2.default.func,
    renderError: _propTypes2.default.func
};
exports.default = AsyncComponent;