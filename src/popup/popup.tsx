import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { fetchAccessToken, fetchGraphQL } from '../utils/api';
import { CardQuery } from '../utils/cards/cards.gql';
// import Footer from ;
import Footer from '../components/Footer/Footer';
import Cards from '../components/Cards/Cards';
import Home from '../components/Home/Home';
import Profile from '../components/Profile/Profile';
import Search from '../components/Search/Search';
import { Messages } from '../utils/messages';
import ToggleButton from '../components/ToggleBtn/ToggleButton';
import { LocalStorageOptions, getStoredOptions, getStoredUser, setStoredOptions } from '../utils/storage';
// import Footer from './Footer'; // Adjust the import path as necessary

const App: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentTabUrl, setCurrentTabUrl] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions| null>(null)
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
    getStoredUser().then((user) => setUser(user))
  }, [])

  useEffect(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
              const url = tabs[0].url || '';
              setCurrentTabUrl(url);
          }
      });
  }, []);

  const renderContent = () => {
      switch (activeTab) {
          case 'home':
              return <Home />;
          case 'search':
              return <Search />;
          case 'profile':
              return <Profile />;
          default:
              return <Home />;
      }
  };

  const handleToggle = (newToggleState) => {
    console.log('Toggle state:', newToggleState); // Output the toggle state to console
    const newOptions = {
      ...options,
      hasAutoOverlay: newToggleState,
    }
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
    })
    handleOverlayButtonClick()
  };


  const handleOverlayButtonClick = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
        }
      }
    )
  }

  if (!options) {
    return null
  }

  return (
    <div>
      <div className="header">
          <div className='header-first'>
            <img src="/icon.png" alt="Logo" />
            <h1>Hi {user?.name}</h1>
          </div>
          <ToggleButton initToggle={options.hasAutoOverlay} onToggle={handleToggle} label="Show Cards" />
      </div>
      <div className="content">
          {renderContent()}
      </div>

      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
