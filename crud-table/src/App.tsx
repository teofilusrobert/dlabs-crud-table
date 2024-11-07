import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import UserTable from './components/UserTable';
import GithubUserTable from './components/GithubUserTable';

function App() {
  const [showUserTable, setShowUserTable] = useState(true);

  const toggleComponent = () => {
    setShowUserTable((prev) => !prev);
  };

  return (
    <div className="App">
      <button onClick={toggleComponent} className="btn btn-primary">
        {showUserTable ? 'Switch to Github User Data' : 'Switch to Default User Data'}
      </button>

      <div className="mt-3">
        {showUserTable ? <UserTable /> : <GithubUserTable />}
      </div>
    </div>
  );
}

export default App;