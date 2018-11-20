import React, { Component } from "react";
import contacts from "./contacts.json";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: contacts.splice(0, 5),
      contactsPop: null,
      contactsName: null
    };

    this.handleClick = this.handleClick.bind(this);
    // this.sortByName = this.sortByName.bind(this);
  }

  handleClick() {
    let r = Math.floor(contacts.length * Math.random()); // random value between 1 and 100
    // Set state values
    this.setState({
      random: contacts[r],
      contacts: [...this.state.contacts, contacts[r]]
    });
  }

  // sortByName() {
  //   let sn = this.state.contacts.sort((a, b) => a.name - b.name);
  //   this.setState({
  //     contactsName: sn
  //   });
  // }

  removeItem(indexToRemove) {
    this.setState({
      contacts: this.state.contacts.filter((contact,i) => (i !== indexToRemove) )
      });
  }

  sortContacts(field) {
    let compareFunction;
    if (field === "popularity") {
      compareFunction = (a, b) => (a.popularity - b.popularity);
    } else if (field === "name") {
      compareFunction = (a, b) => (a.name > b.name ? 1 : -1);
    }
    this.setState({
      contacts: this.state.contacts.slice().sort(compareFunction)
    });
  }

  // sortByName(field) {
  //   this.setState({
  //     contacts: this.state.contacts
  //       .slice()
  //       .sort((a, b) => (a.name > b.name ? 1 : -1))
  //   });
  // }

  //this works but we can add the sorting functions under a single one
  // sortByPopularity() {
  //   let sp = this.state.contacts.sort((a, b) => b.popularity - a.popularity);
  //   console.log("SORT", sp);
  //   this.setState({
  //     contactsPop: sp
  //   });
  // }

  render() {
    // let result = contacts.splice(0, 5);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact, i) => (
              <tr key={i}>
                <td>{contact.name} </td>
                <td>
                  {
                    <img
                      src={contact.pictureURL}
                      alt=""
                      style={{ height: 30 }}
                    />
                  }{" "}
                </td>
                <td>{contact.popularity}</td>
                <td>
                  <button onClick={()=>this.removeItem(i)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={this.handleClick}> Add random contact</button>
        <button onClick={this.sortContacts.bind(this, "name")}> Sort by Name</button>
        <button onClick={this.sortContacts.bind(this, "popularity")}>
          {" "}
          Sort by Popularity
        </button>
      </div>
    );
  }
}

export default Contacts;
