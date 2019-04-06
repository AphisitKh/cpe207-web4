class Contact {
    constructor(name, email, subject, messageA) {
      this.name = name;
      this.email = email;
      this.subject = subject;
      this.messageA = messageA;
    }
  }
  
  class UI {
    static displayContacts() { 
      const contacts = Store.getContacts();
      contacts.forEach((contact) => UI.addContactToList(contact));
    }
  
    static addContactToList(contact) {
      const list = document.querySelector('#contact-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.subject}</td>
        <td>${contact.messageA}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteContact(el) {
      if(el.classList.contains('delete')) {    
        el.parentElement.parentElement.remove();
      }
    }
  

    // static showAlert(message, className) {
    //   const div = document.createElement('div');
    //   div.className = `alert alert-${className}`;
    //   div.appendChild(document.createTextNode(message));
    //   const container = document.querySelector('.container');
    //   const form = document.querySelector('#contact-form');
    //   container.insertBefore(div, form);
  
    //   // Vanish in 3 seconds
    //   setTimeout(() => document.querySelector('.alert').remove(), 3000);
    // }
  
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#subject').value = '';
      document.querySelector('#messageA').value = '';
    }
  }
  
  class Store {
    static getContacts() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
  
    static addContact(contact) {
      const contacts = Store.getContacts();
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(messageA) {
      const contacts = Store.getContacts();
  
      contacts.forEach((contact, index) => {
        if(contact.messageA === messageA) {
          contacts.splice(index, 1);
        }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayContacts);
  
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const messageA = document.querySelector('#messageA').value;
  
    if(name === '' || email === '' || subject === '' || messageA === '') {
      //UI.showAlert('Please fill in all fields', 'danger');
    } else {
      const contact = new Contact(name, email, subject, messageA);
      // console.log(contact);
  
      UI.addContactToList(contact);
  
      Store.addContact(contact);
  
      //UI.showAlert('contact Added', 'success');
  
      UI.clearFields();
    }
  });
  
  document.querySelector('#contact-list').addEventListener('click', (e) => {
    // console.log(e.target);
    
    UI.deleteContact(e.target);
  
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  
    //UI.showAlert('contact Removed', 'success');
  });
  
