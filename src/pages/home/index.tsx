/* eslint-disable arrow-parens */
import { useState } from 'react';

import styles from './home.module.scss';

type CardT = {
  description: string;
  title: string;
};

const Home: React.FC = () => {
  const [cards, setCards] = useState<CardT[]>([]);

  // Function to add a new card
  const handleAddCard = (title: string, description: string) => {
    setCards([...cards, { description, title }]);
  };

  // Function to update an existing card (implementation pending)
  const handleUpdateCard = (cardIndex: number, newTitle: string, newDescription: string) => {
    // Implement logic to update card at index with new title and description
    const updatedCards = [...cards];
    updatedCards[cardIndex] = { description: newDescription, title: newTitle };
    setCards(updatedCards);
  };

  // Function to delete a card with confirmation
  const handleDeleteCard = (cardIndex: number) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedCards = [...cards];
      updatedCards.splice(cardIndex, 1);
      setCards(updatedCards);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
      <h2>Your Cards</h2>
      {cards.length === 0 ? (
        <p>No cards added yet.</p>
      ) : (
        <div className={styles.cardsContainer}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className={styles.cardActions}>
                <button className={styles.cardActionsButton} type="button" onClick={() => handleUpdateCard(index, '', '')}>Edit</button>
                <button className={styles.cardActionsButton} type="button" onClick={() => handleDeleteCard(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className={styles.addCardButton} type="button" onClick={() => handleAddCard('', '')}>
        Add Card
      </button>
    </div>
  );
};

export default Home;
