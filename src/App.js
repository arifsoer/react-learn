import { useState } from "react";

import "./App.css";

import WeatherApp from './components/WeatherApp/MainApp'

function App() {
  const [selectedMenu, setSelectedMenu] = useState(3);
  const menus = [
    {name: 'Content 1', content: <WeatherApp />},
    {name: 'Content 2', content: <h1>Content 2</h1>},
  ];
  const getContent = () => {
    if(!menus[selectedMenu]){
      return <h2>Contenet not found</h2>
    }
    return menus[selectedMenu].content
  };
  const menuChangeHandler = (event) => {
    setSelectedMenu(parseInt(event.target.value))
  };

  return (
    <div className="App">
      <h1>Main Menu</h1>
      <div>
        {menus.map((menu, ind) => (
          <div key={ind} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="page"
              id={'inlineCheckbox'+ind}
              value={ind}
              checked={selectedMenu === ind}
              onChange={menuChangeHandler}
            />
            <label className="form-check-label" htmlFor={'inlineCheckbox'+ind}>{menu.name}</label>
          </div>
        ))}
      </div>
      <div className="container-fluid">{getContent()}</div>
    </div>
  );
}

export default App;
