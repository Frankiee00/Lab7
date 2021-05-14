// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  
  const setting = {name: 'settings', id:0};
  const home = {name: 'home', id:-1};
  let counter = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        //id for each jo entry
        newPost.id = counter;
        counter++;

        //listener for each entry in order to change the states
        newPost.addEventListener('click', () => {
          let entry = {name: 'jo-entry', id: newPost.id};

          history.pushState(entry, '', 'Entry#' + entry.id);
          setState(entry);
        });

        document.querySelector('main').appendChild(newPost);
      });


      //listener for clickling on header title
      document.querySelector('header h1').addEventListener('click', () => {

        //change the state if we are not on homepage
        if(history.state.name != 'home' && history.state != null){
          history.pushState(home, '', location.origin);
          setState(home);
        }
      });

      //listener for the settings button
      document.querySelector('header img').addEventListener('click', () => {
        history.pushState(setting, '', 'Settings');
        setState(setting);
      });
  });
});

//listener for the back button
window.onpopstate = function(event){
  setState(event.state);
};


