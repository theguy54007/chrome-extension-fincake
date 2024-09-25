import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import { getStoredOptions, LocalStorageOptions } from '../utils/storage'
import './contentScript.css'
import { fetchGraphQL } from '../utils/api';
import { CardQuery } from '../utils/cards/cards.gql';
import Cards from '../components/Cards/Cards';
import { Messages } from '../utils/messages';
import { createRoot } from 'react-dom/client';
import { LocalStorageOptions, getStoredOptions } from '../utils/storage';
import Button from '../components/Button/Button';

const App: React.FC<{}> = () => {
  const [cards, setCards] = useState<any>([]);
  const [isActive, setIsActive] = useState<boolean>(false)
  const [moreLink, setMoreLink] = useState<any>(null)
  const [isHovered, setIsHovered] = useState(false);
  // const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsHovered(!isHovered);


  useEffect(() => {
    getStoredOptions().then((options) => {
      setIsActive(options.hasAutoOverlay)
    })
  }, [])

  const handleMessages = (msg: Messages) => {
    if (msg === Messages.TOGGLE_OVERLAY) {
      setIsActive(!isActive)
      if (isActive){
        handleCardFetch('');
      }
    }
  }

  useEffect(() => {
    // Fetch the current URL
    const currentUrl = window.location.href;
    console.log("Current URL: " + currentUrl);

    // Send the URL to the background script
    handleCardFetch(currentUrl)

    // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //   if (message.action === "URL_CHANGED") {
    //     const newUrl = message.url;
    //     console.log("Received new URL in content script: " + newUrl);
    //     handleCardFetch(currentUrl)
    //   }
    // });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  }, [isActive])


  const handleCardFetch = (url: string) => {
    console.log("Fetching cards for", url);
    chrome.runtime.sendMessage({ action: "FETCH_CARD", url }, (response) => {
      if (response.error) {
        console.error("Error fetching cards:", response.error);
      } else {
        console.log("Fetched cards:", response.cards);
        setCards(response.cards.cards.nodes)
        setMoreLink(response.moreLink)
        // Handle the response and update the state if needed
      }
    });
  }

  if (!cards.length ) {
    return null
  }
  return (
    <>
      {
          isActive && (
          <div className='fincakeExtensionWrapper'>
            <button
              className="image-button image-button-shake"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
            >
              <img
                src="https://storage.googleapis.com/fincake/assets/images/icon_service.png"
                alt="button"
              />
            </button>
            {
              isHovered && (
                <div className="overlayPopup">
                  <Cards title={'推薦卡片'} moreLink={moreLink} cards={cards} className="overlayCard"></Cards>
                </div>
              )
            }
          </div>
        )
      }

    </>
  )
}

const injectButton = () => {
  const searchBar = document.querySelector('div#hdtb-msb');
  console.log(searchBar)
  if (searchBar) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'biggo-button-container';
    searchBar.appendChild(buttonContainer);
    ReactDOM.render(<Button />, buttonContainer);
  }
};
// injectButton()
// Create a new div element
const container = document.createElement('div');
container.id = 'fincake-overlay-container';
document.body.appendChild(container);

// Create a root and render the App component
const root = createRoot(container);
root.render(<App />);
