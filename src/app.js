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
					{ModuleA=>{
						return <ModuleA/>
					}}
				</Async>
				<h5>async load multiple module</h5>
				<Async
					modules={[
						System.import('./A.js'),
						System.import('./B.js')
					]}>
					{(ModuleA,ModuleB)=>{
						return (
							<div>
								<ModuleA/>
								<ModuleB/>
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