import React from 'react';
import './Cards.css'; // Adjust the import path as necessary
import { FincakeDomain } from '../../utils/api';

interface Card {
    fullTitle: string;
    imgUrl: string;
    // rate: string;
}

interface CardListProps {
    cards: Card[];
}

const Cards: React.FC<any> = ({ cards, title, moreLink }) => {
    title ||= 'Fincake Card Information';

    return (
        <div className='top-cards'>
            <div className='card-header-wrapper'>
                <h2>{title}</h2>
                {moreLink && (
                    <a href={moreLink.url} target='_blank'>
                        <span>{moreLink.label}</span>
                    </a>
                )}
            </div>

            {cards && cards.length > 0 ? (
                <div>
                    {cards.map((card, index) => (
                        <div className='card' key={index}>
                            <div className='card-img-wrapper'>
                                <img src={card.imgUrl} alt={card.fullTitle} />
                            </div>

                            <a href={ FincakeDomain + '/cards/' + card.path} target='_blank'>
                                <span>{card.fullTitle}</span>
                            </a>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No cards available</p>
            )}
        </div>
    );
};

export default Cards;
