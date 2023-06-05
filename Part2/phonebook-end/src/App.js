import { useState, useEffect } from "react";
import Component from "./components/phonebook";
import personServices from "./services/phoneBook";

const App = () => {
  /////Setup initial state
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");

  ////
  ////////
  ///////////Making event handler for the EffectHook/////////
  const hook = () => {
    personServices.loadAll().then((initialList) => {
      setPersons(initialList);
      console.log(initialList);
    });
  };
  useEffect(hook, []);

  //reset input form function//
  const resetForm = () => setNewPerson({ name: "", number: "" });

  //add message function
  const addedMessage = (id) => {
    personServices.getResource(id).then((data) => {
      setNotiMessage(<h2 className="addedNoti">Added {data.name}</h2>);
      setTimeout(() => setNotiMessage(null), 5000);
    });
  };

  //delete message function
  const deletedMessage = (name) => {
    setNotiMessage(
      <h2 className="deleteNoti">
        Information of {name} is already removed from server
      </h2>
    );
    setTimeout(() => setNotiMessage(null), 5000);
  };

  ////
  ////////
  //////////setup Handle Function//////////
  const handleNewList = (e) => {
    e.preventDefault();

    if (
      persons.some(
        (person) =>
          person.name === newPerson.name && person.number === newPerson.number
      )
    ) {
      alert(`${newPerson.name} is already added to the phonebook`);
      // setNewPerson({ name: "", number: "" });
      resetForm();
      return;
    }

    if (
      persons.some(
        (person) =>
          person.name === newPerson.name && person.number !== newPerson.number
      ) &&
      window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with the new one ?`
      )
    ) {
      const updatePerson = {
        ...persons.filter((person) => person.name === newPerson.name)[0],
        number: newPerson.number,
      };

      const id = updatePerson.id;

      //update resource in the JSON-Server
      personServices
        .updateNumber(id, updatePerson)
        .then((updatedPerson) =>
          setPersons(
            persons.map((person) => (person.id !== id ? person : updatePerson))
          )
        );

      resetForm();
      addedMessage(updatePerson.id);
      return;
    }

    const newPersonData = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    };

    personServices.addNew(newPersonData).then((newData) => {
      // //set new the persons state
      setPersons(persons.concat(newData));

      //reset input form//
      resetForm();
      addedMessage(newPersonData.id);
    });
  };

  const handleSearchList = (e) => {
    e.preventDefault();
    const searchList = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchInput(e.target.value);
    setSearchList(searchList);
  };

  const handleDetelePerson = (id) => {
    personServices
      .getResource(id)
      .then((data) => {
        if (window.confirm(`Delete ${data.name} ?`)) {
          personServices.deleteSelect(id);
          setPersons(persons.filter((person) => person.id !== id));
        }
      })
      .catch((err) => {
        deletedMessage(persons.filter((person) => person.id === id)[0].name);
        setPersons(persons.filter((person) => person.id !== id));
        // console.log(err.message);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Component.Noti message={notiMessage} />
      <Component.Filter
        searchInput={searchInput}
        handleSearchList={handleSearchList}
      />

      <h3>Add a new</h3>
      <Component.PersonForm
        handleNewList={handleNewList}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />

      <h3>Number</h3>

      <ul>
        {(searchInput === "" ? persons : searchList).map((person) => (
          <Component.ListRender
            key={person.id}
            person={person}
            deletePerson={() => handleDetelePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
