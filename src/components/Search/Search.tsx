import React, { useState } from 'react';
import './Search.css';

const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    // handle search
    const handleSearch = () => {
        const searchUrl = `https://www.google.com/search?q=fincake + ${encodeURIComponent(searchText)}`;
        window.open(searchUrl, '_blank');
    };

    const allLinks = [
      {
        url: 'https://www.fincake.co/cards',
        label: 'Cards',
        img: 'icons8-credit-card-50.png'
      },
      {
        url: 'https://www.fincake.co/loans/personal-loans',
        label: 'Loans',
        img: 'icons8-loan-32.png'
      },
      {
        url: 'https://www.fincake.co/stocks/taiwan_stock_account',
        label: 'Stocks',
        img: 'icons8-stock-32.png'
      },
      {
        url: 'https://www.fincake.co/blog',
        label: 'Blogs',
        img: 'icons8-article-50.png'
      },
    ]
    return (
        <div className='search-wrapper'>
            <h2>Search</h2>
            <p>Search for products here.</p>
            <div className="search-bar">
                <input value={searchText} onChange={(e) => setSearchText(e.target.value)}  type="text" placeholder="Search with text" />
                <button onClick={handleSearch}>
                  search
                </button>
            </div>

            <div className="top-stores">
              <h2>Popular Search</h2>
              {allLinks.map((linkInfo, index)  => (
                <a href={linkInfo.url} target='_blank' className="store" key={index}>
                    <img src={'/' + linkInfo.img} alt={linkInfo.label} />
                    <span>{linkInfo.label}</span>
                </a>
              ))}
          </div>
        </div>
    );
};

export default Search;
