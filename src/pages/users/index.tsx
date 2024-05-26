import { useEffect, useState } from 'react';

import { currentEnvironment } from '@constants';

import styles from './users.module.scss';

type Gender = 'female' | 'male' | '';

type User = {
  gender: Gender;
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [gender, setGender] = useState<Gender>('');
  const [pageToGet, setPageToGet] = useState<number>(1);

  const getUsers = async (page: number) => {
    const result = await fetch(
      `${currentEnvironment.api.baseUrl}?results=5&gender=${
        gender === '' ? '' : gender
      }&page=${String(page)}`,
    );
    const response = await result.json();
    const usersResults = response.results as User[];
    setUsers((oldUsers) => (page === 1 ? usersResults : [...oldUsers, ...usersResults]));
  };

  useEffect(() => {
    setUsers([]);
    void (async () => {
      await getUsers(pageToGet);
    })();
  }, [gender]);
  useEffect(() => {
    void (async () => {
      await getUsers(pageToGet);
    })();
  }, [pageToGet]);
  const handleLoadMore = () => {
    setPageToGet((previousPage) => previousPage + 1);
  };
  return (
    <div className={styles.usersContainer}>
      <div className={styles.userListHeader}>
        <h2>Users</h2>
        <select
          className={styles.genderSelect}
          id="gender"
          name="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value as Gender)}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
      <ul className={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.login.uuid} className={styles.userListItem}>
              {user.name.first}
              {user.name.last}
              (
              {user.gender}
              )
            </li>
          ))
        ) : (
          <p className={styles.noData}>Loading users...</p>
        )}
      </ul>
      <button
        className={styles.loadMoreButton}
        disabled={users.length === 0} // Disable if no users
        type="button"
        onClick={handleLoadMore}
      >
        Load More
      </button>
    </div>
  );
};

export default Users;

// 1. The logo looks tiny on smaller devices.
// 2. TEC theme is not displayed on the app bar instead a green color is seen.
// 3. Users screen does not display any data.
// 4. Load more button style is not working.
// 5. Style issues are encountered on the page - style however you want.
// 6. Additional data is not displayed upon using "Load more" button.
// 7. Users are not filtered by gender and the list does not reset on change select.
// 8. No loading state is displayed when accessing "Users" component.
// 9. On home page user should be able to do the following actions with cards that contain
// 2 fields: Title and Description
//     - See all the cards already added
//     - Add a card
//     - Update a card
//     - Delete a card
