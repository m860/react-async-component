import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import Async from './components/Async'

class Example extends Component {
	render() {
		return (
			<div>
				<h5>async load single module</h5>
				<Async
					modules={[
						System.import('./A.js')
					]}>
					{ModuleA=> {
						return <ModuleA/>
					}}
				</Async>
				<h5>async load multiple module</h5>
				<Async
					modules={[
						System.import('./A.js'),
						System.import('./B.js')
					]}>
					{(ModuleA, ModuleB)=> {
						return (
							<div>
								<ModuleA/>
								<ModuleB/>
							</div>
						);
					}}
				</Async>
				<h5>sync module</h5>
				<Async
					modules={[
						require('./C.js').default
					]}>
					{(ModuleC)=> {
						return (
							<div>
								<ModuleC/>
							</div>
						);
					}}
				</Async>
				<h5>async module & sync module</h5>
				<Async
					modules={[
						System.import('./A.js'),
						require('./C.js').default
					]}>
					{(ModuleA, ModuleC)=> {
						return (
							<div>
								<ModuleA/>
								<ModuleC/>
							</div>
						);
					}}
				</Async>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));