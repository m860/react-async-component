import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import AsyncComponent from './components/AsyncComponent'

class Example extends Component {
    render() {
        return (
            <div>
                <h5>async load single module</h5>
                <AsyncComponent
                    components={[
                        System.import('./A.js')
                    ]}>
                    {ModuleA => {
                        return <ModuleA/>
                    }}
                </AsyncComponent>
                <h5>async load multiple module</h5>
                <AsyncComponent
                    components={[
                        System.import('./A.js'),
                        System.import('./B.js')
                    ]}>
                    {(ModuleA, ModuleB) => {
                        return (
                            <div>
                                <ModuleA/>
                                <ModuleB/>
                            </div>
                        );
                    }}
                </AsyncComponent>
                <h5>sync module</h5>
                <AsyncComponent
                    components={[
                        require('./C.js').default
                    ]}>
                    {(ModuleC) => {
                        return (
                            <div>
                                <ModuleC/>
                            </div>
                        );
                    }}
                </AsyncComponent>
                <h5>async module & sync module</h5>
                <AsyncComponent
                    components={[
                        System.import('./A.js'),
                        require('./C.js').default
                    ]}>
                    {(ModuleA, ModuleC) => {
                        return (
                            <div>
                                <ModuleA/>
                                <ModuleC/>
                            </div>
                        );
                    }}
                </AsyncComponent>
            </div>
        );
    }
}

ReactDOM.render(
    <Example></Example>
    , document.getElementById("view"));