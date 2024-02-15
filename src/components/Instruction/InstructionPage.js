import React from 'react';
import { Link } from 'react-router-dom';
import imagesignin from '../../images/signin.png'
import imagesgame from '../../images/game.png'
import imagesbump from '../../images/bump.png'


const InstructionPage = () => {
  const imageUrls = [ imagesignin, imagesgame, imagesbump];

  return (
    <div className="instruction-page">
      <h1>Game Instructions</h1>
      <div className="image-gallery">
        {imageUrls.map((url, index) => (
          <div key={index} className="image-container">
            <img src={url} alt={`Instruction ${index + 1}`} />
          </div>
        ))}
      </div>
      <Link to="/components/Game">
        <button>Start Game</button>
      </Link>
    </div>
  );
};

export default InstructionPage;


/*can add the below to app.jsx if we want to use the instruction page

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InstructionPage from './InstructionPage';
import GameComponent from './GameComponent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={InstructionPage} />
        <Route path="/game" component={GameComponent} />
      </Switch>
    </Router>
  );
};

export default App;
*/
