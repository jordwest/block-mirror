import {render} from "solid-js/web";
import './index.css';

console.log('hello from block page')
console.log(new URLSearchParams(window.location.search).get('url'))

function MyComponent() {
    return <div class="bg-amber-500">Hello from solid js</div>;
}

render(() => <MyComponent />, document.getElementById('app')!);