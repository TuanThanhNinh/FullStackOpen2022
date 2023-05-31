const Filter = ({ searchInput, handleSearchList }) => {
  return (
    <>
      <label htmlFor="searchBox">filter shown with: </label>
      <input
        id="searchBox"
        type="text"
        value={searchInput}
        onChange={handleSearchList}
      />
    </>
  );
};

const PersonForm = ({ handleNewList, newPerson, setNewPerson }) => {
  return (
    <>
      <form onSubmit={handleNewList}>
        <div>
          name:{" "}
          <input
            required
            value={newPerson.name}
            onChange={(e) =>
              setNewPerson({ ...newPerson, name: e.target.value })
            }
          />
        </div>
        <div>
          number:{" "}
          <input
            required
            value={newPerson.number}
            onChange={(e) =>
              setNewPerson({ ...newPerson, number: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const ListRender = ({ person, deletePerson }) => {
  return (
    <>
      <li style={{ listStyle: "none" }} key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={deletePerson}>delete</button>
      </li>
    </>
  );
};

const Noti = ({ message }) => {
  if (message === null) return null;
  return <>{message}</>;
};

const phonebookComponents = { Filter, ListRender, PersonForm, Noti };

export default phonebookComponents;
