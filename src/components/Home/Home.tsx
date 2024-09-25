import React, { useEffect, useState } from 'react';
import { fetchGraphQL } from '../../utils/api';
import Cards from '../Cards/Cards';
import Rewards from '../Rewards/Rewards';
import { UserCardQuery } from '../../utils/cards/user-cards.gql';

const Home: React.FC = () => {
  const [cards, setCards] = useState<any>(null);

  useEffect(() => {
    handleCardFetch()
  }, [])

  const handleCardFetch = async () => {
    const data = await fetchGraphQL(UserCardQuery, { useToken: true });
    const results = data?.userCards?.nodes || [];
    setCards(results.map((userCard: any) => userCard.card))
  }

  const moreLink = {
    url: 'https://www.fincake.co/user/cards',
    label: '新增卡片'
  }

  return (
    <div className='home-wrapper'>
      <Rewards></Rewards>
      <Cards title={'已收錄卡片'} cards={cards} moreLink={moreLink}/>
    </div>
  );
};


export default Home;
