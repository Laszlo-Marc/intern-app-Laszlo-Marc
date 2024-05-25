/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react'; // Needed for createRef hook

import styles from './home.module.scss';

type CardT = {
  description: string;
  title: string;
};

const Home: React.FC = () => {
  const [cards, setCards] = useState<CardT[]>([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showUpdateCardForm, setShowUpdateCardForm] = useState(false);
  const [cardToUpdateIndex, setCardToUpdateIndex] = useState(-1);

  // Function to add a new card
  const handleAddCard = (title: string, description: string) => {
    setCards([...cards, { description, title }]);
    setShowAddCardForm(false);
  };

  // Function to update an existing card
  const handleUpdateCard = (cardIndex: number, newTitle: string, newDescription: string) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex] = { description: newDescription, title: newTitle };
    setCards(updatedCards);
    setShowUpdateCardForm(false);
    setCardToUpdateIndex(-1); // Reset update card state
  };

  // Function to delete a card with confirmation
  const handleDeleteCard = (cardIndex: number) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const updatedCards = [...cards];
      updatedCards.splice(cardIndex, 1);
      setCards(updatedCards);
    }
  };

  const handleOpenAddCardForm = () => setShowAddCardForm(true);
  const handleCloseAddCardForm = () => setShowAddCardForm(false);

  const handleOpenUpdateCardForm = (cardIndex: number) => {
    setCardToUpdateIndex(cardIndex);
    setShowUpdateCardForm(true);
  };

  const handleCloseUpdateCardForm = () => {
    setShowUpdateCardForm(false);
    setCardToUpdateIndex(-1); // Reset update card state
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = (error: React.FormEvent<HTMLFormElement>) => {
    error.preventDefault();
    const title = titleRef.current!.value as string;
    const description = descriptionRef.current!.value as string;
    handleAddCard(title, description);
  };
  const updateTitleRef = useRef<HTMLInputElement>(null);
  const updateDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdateCardSubmit = (error: React.FormEvent<HTMLFormElement>) => {
    error.preventDefault();

    // Check if cardToUpdateIndex is valid
    if (cardToUpdateIndex === -1) {
      console.error('Invalid card index for update');
      return;
    }

    const newTitle = updateTitleRef.current!.value as string;
    const newDescription = updateDescriptionRef.current!.value as string;

    handleUpdateCard(cardToUpdateIndex, newTitle, newDescription);
  };

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
      <h1>Welcome!</h1>
      {cards.length === 0 ? (
        <p>No cards added yet.</p>
      ) : (
        <div className={styles.cardContainer}>
          {cards.map((card, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className={styles.cardActions}>
                <button className={styles.cardActionsButton} type="button" onClick={() => handleOpenUpdateCardForm(index)}>Edit</button>
                <button className={styles.cardActionsButton} type="button" onClick={() => handleDeleteCard(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Card Form */}
      {showAddCardForm ? (
        <div className={styles.popupForm}>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input ref={titleRef} id="title" name="title" required type="text" />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea ref={descriptionRef} id="description" name="description" required />
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCloseAddCardForm}>
              Cancel
            </button>
          </form>
        </div>
      ) : null}
      {/* Update Card Form */}
      {showUpdateCardForm && cards[cardToUpdateIndex] ? (
        <div className={styles.popupForm}>
          <form className="" onSubmit={handleUpdateCardSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              ref={updateTitleRef}
              defaultValue={cards[cardToUpdateIndex].title} // Pre-populate with existing title
              id="title"
              name="title"
              required
              type="text"
            />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea
              ref={updateDescriptionRef}
              defaultValue={cards[cardToUpdateIndex].description}
              id="description"
              name="description"
              required
            />
            <br />
            <button type="submit">Update</button>
            <button type="button" onClick={handleCloseUpdateCardForm}>
              Cancel
            </button>
          </form>
        </div>
      ) : null}
      <button className={styles.addCardButton} type="button" onClick={handleOpenAddCardForm}>
        Add Card
      </button>
    </div>
  );
};

export default Home;
