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

        newPost.id = counter;
        counter++;

        document.querySelector('main').appendChild(newPost);

        //listener for each entry in order to change the states
        newPost.addEventListener('click', () => {
          let entry = {name: 'jo-entry', id: newPost.id};

          history.pushState(entry, '', '#Entry' + entry.id);
          setState(entry);
        });

        //listener to title header in order to change state
        document.querySelector('header').addEventListener('click', () => {

          //change if not already on home page
          if(history.state.name != 'home' && history.state != null){
            history.pushState(home, '', location.orign);
            setState(home);
          }
        });

        //listener to settings button in order to change state
        document.querySelector('img header').addEventListener('click', () => {
          history.pushState(setting, '', 'settings');
          setState(setting);
        });


      });
    });
});
