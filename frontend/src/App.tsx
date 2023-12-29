import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import logo from './assets/logo.png';
import { Nav } from './nav';

function App() {
	return (
		<BrowserRouter>
			<div className="h-dvh w-11/12 m-auto text-white">
				<header className="bg-white/10 flex items-center rounded-b-md p-4 justify-between">
					<div className="flex items-center gap-2">
						<img src={logo} width={30} /> Lumi
					</div>

					<Nav />
				</header>
				<main className="mt-5">
					<Routes />
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
