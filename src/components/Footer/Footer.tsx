import React from 'react';
import './Footer.css'; // Make sure to create a corresponding CSS file

interface FooterProps {
    setActiveTab: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
    return (
        <div className="footer">
            <div className="footer-tab" onClick={() => setActiveTab('home')}>
              <span>Home</span>
            </div>
            <div className="footer-tab" onClick={() => setActiveTab('search')}>
                <span>Search</span>
            </div>
            <div className="footer-tab" onClick={() => setActiveTab('profile')}>

                <span>Profile</span>
            </div>
        </div>
    );
};

export default Footer;
