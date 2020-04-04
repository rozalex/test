import React from 'react';
import {Tasks} from './components';

// const fetchSomethig = () => {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))
// }

function App() {
  return (
    <div>
      <section>
        <Tasks />
      </section>
    </div>
  );
}

export default App;
