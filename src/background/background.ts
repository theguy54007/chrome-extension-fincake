import { FincakeDomain, fetchGraphQL, loginByToken } from "../utils/api";
import { CardQuery, genCardQueryByTags } from "../utils/cards/cards.gql";
import { setStoredAccessToken, setStoredOptions, setStoredUser } from "../utils/storage";
import { getCategory, getCategoryInfo } from "../utils/website_category";

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidWlkIjoiOTdiYzg3MzQtZTNhNS00OTY5LWI0NmMtNzY5MTA1NmY3ZThlLTE2OTkzNjExMjAiLCJtb2RlbCI6IlVzZXIiLCJuYW1lIjoi6Zmz5bu2IiwiaWQiOjgsImVtYWlsIjoic2FnZS50czkyMDEyNkBnbWFpbC5jb20ifSwiZXhwIjoxNzUzMjQ5MDkyfQ.0_keW0eiU6AIBoW6CdQj4WEk4QvU1rM7xIvmwRZK4v4"
// const refreshToken = "eyJfcmFpbHMiOnsibWVzc2FnZSI6IkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbzVMbVY1U25wa1YwbHBUMjV6YVdSWGJHdEphbTlwVDFSa2FWbDZaek5OZWxGMFdsUk9hRTVUTURCUFZGazFURmRKTUU1dFRYUk9lbGsxVFZSQk1VNXRXVE5hVkdoc1RGUkZNazlVYTNwT2FrVjRUV3BCYVdaVGQybGFXR2gzU1dwdmVFNTZTVEJOZWtGNVQwUkZNV1pSTG1KMldESkxVMlU0UTBwaU5VMURaMVo1TURaNmRrOXRObFZhTVhjM1FrTmlTMjlNWkZOM1MyTnZORVVpIiwiZXhwIjoiMjAyNC0wOC0yMlQwNTowMDoxNS4yOTJaIiwicHVyIjoiY29va2llLnVzZXJfcmVmcmVzaF90b2tlbiJ9fQ%3D%3D--c531df844c5b03e6519df224500703beefc15b34"
// TODO: background script
chrome.runtime.onInstalled.addListener(() => {

  getUser()
  // getAccessToken()
  setStoredOptions({
    hasAutoOverlay: false,
  })

  createNotification()
  // TODO: on installed function
  initContextMenus()
})

chrome.cookies.get({ url: 'https://www.fincake.co', name: 'user_refresh_token' }, (cookie) => {
    if (cookie) {
        console.log('User is logged in with token:', cookie.value);
        // You can send this token to your server for further validation if needed
    } else {
        console.log('User is not logged in.');
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "FETCH_CARD") {
    fetchCardsProgress(message.url, sendResponse);
    return true
  }
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.url) {
//     console.log("URL changed to: " + changeInfo.url);
//     // Send a message to the content script with the new URL
//     chrome.tabs.sendMessage(tabId, { action: "URL_CHANGED", url: changeInfo.url });
//   }
// });

// chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
//   if (message.type === 'logged-in') {
//     console.dir(message);
//     sendResponse({ message: 'OK' });
//     return true;
//   }

//   if (message.type === 'logged-out') {
//     console.dir(message);
//     sendResponse({ message: 'OK' });
//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'tokenFound') {
//         const token = message.token;
//         console.log('Token received from content script:', token);
//         // You can send this token to your server for further validation if needed
//         // fetch('https://api.fincake.co/validate', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     },
//         //     body: JSON.stringify({ token: token })
//         // })
//         // .then(response => response.json())
//         // .then(data => {
//         //     console.log('User data:', data);
//         //     // You can send a response back to the content script or update the popup UI
//         // })
//         // .catch(error => console.error('Error:', error));
//     } else if (message.action === 'tokenNotFound') {
//         console.log('Token not found in localStorage.');
//     }
// });

function fetchCardsProgress(url: string, sendResponse: (response: any) => void){
  // const url = message.url;
    const categoryType = getCategory(url)
    const categoryInfo = getCategoryInfo(categoryType)
    if (!categoryInfo || !categoryInfo?.id) {
      sendResponse({ error: 'Category not found' });
      return false
    }
    const query = genCardQueryByTags(categoryInfo.id)
    fetchGraphQL(query).then(cards => {
      createNotification()
      // this.registration.showNotification("Fetch Card!!", {
      //     body: `Found cards`,
      //     icon: "icon.png",
      // })
      sendResponse({ cards, moreLink: {
        url: `${FincakeDomain}/card-tags/${categoryInfo?.path}`,
        label: 'More on Fincake'
      } });
    }).catch(error => {
        console.log("Error fetching cards:", error);
        sendResponse({ error: error.message });
      });

    // Return true to indicate that the response will be sent asynchronously
    return true;
}

// function  createFetchDoneNotification(){
//   chrome.alarms.create("cardFetched", {
//       periodInMinutes: 1 / 60,
//   })
// }

function initContextMenus(){
  chrome.contextMenus.create({
      title: "Search Fincake",
      id: "searchFincake",
      contexts: ["page", "selection"]
  })
  chrome.contextMenus.create({
      title: "Search Google with fincake",
      id: "searchGoogleFincake",
      contexts: ["page", "selection"]
  })

  chrome.contextMenus.onClicked.addListener((event) => {
    let query: string = ''
    let url: string = ''
    console.log('event', event)
    switch (event.menuItemId) {
      case 'searchFincake':
        query = `${event.selectionText}`
        url = `http://localhost:4200/search?q=${query}`
        openNewTab(url)
        break
      case 'searchGoogleFincake':
         query = `fincake ${event.selectionText}`
        url = `https://www.google.com/search?q=${query}`
        openNewTab(url);
        // fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         chrome.storage.local.set({
        //             shows: data,
        //         })
        //     })
        break;

      default:
        break;
    }
  })
}

function openNewTab(url:string) {
  chrome.tabs.create({url})
}


function createNotification() {
  chrome.notifications.create('', {
    title: 'Notification Title',
    message: 'This is the notification message.',
    iconUrl: 'static/icon.png', // Path to the icon image
    type: 'basic'
  }, function(notificationId) {
    console.log('Notification created with ID:', notificationId);
  });
}

function getUser(){
  loginByToken(accessToken).then(user => {
    console.log('User:', user)
    const {access_token: accessToken} = user
    setStoredUser(user)
    setStoredAccessToken(accessToken)
  })
}
