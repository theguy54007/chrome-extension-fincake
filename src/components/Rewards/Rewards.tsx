import React, { useEffect, useState } from 'react';
import './Rewards.css';
import { UserTaskRewardQuery } from '../../utils/tasks/user-task.gql';
import { fetchGraphQL } from '../../utils/api';
import { sumTotalValue } from '../../utils/tasks/task-helper';
import { genTaskValueQueryByUserId } from '../../utils/tasks/tasks.gql';

const Rewards: React.FC = () => {
  const [rewards, setRewards] = useState<any>({notGet: 0, total: 0});

  useEffect(() => {
    handleUserTaskRewardFetch()
    handleTaskFetch()
  }, [])

  const handleUserTaskRewardFetch = async () => {
    const data = await fetchGraphQL(UserTaskRewardQuery, { useToken: true});
    const results = data?.userTaskRewards?.nodes || [];
    if (results.length > 0) {
      const total = sumTotalValue(results, 'total')
      setRewards(prevRewards => ({
        ...prevRewards,
        total
      }))
    }
  }

  const handleTaskFetch = async () => {
    const taskQuery = await genTaskValueQueryByUserId()
    const data = await fetchGraphQL(taskQuery, { useToken: true});

    const results = data?.tasks?.nodes || [];
    if (results.length > 0) {
      const notGet = sumTotalValue(results, 'viewValue')
      setRewards(prevRewards => ({
        ...prevRewards,
        notGet
      }))
    }
  }

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <span>Rewards</span>
        <a href='https://www.fincake.co/user/tasks' target='_blank' className="rewards-arrow">{ '>'} Check Task </a>
      </div>
      <div className="rewards-item">
        <div className="rewards-item-left">
          <div className="rewards-icon kudos-icon">$</div>
          <span>已領取獎勵</span>
        </div>
        <div className="rewards-item-right">
          <span>{rewards.total || 0}</span>
        </div>
      </div>
      <div className="rewards-item">
        <div className="rewards-item-left">
          <div className="rewards-icon cc-icon">$</div>
          <span>未領取獎勵</span>
        </div>
        <div className="rewards-item-right">
          <span>{rewards.notGet || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
