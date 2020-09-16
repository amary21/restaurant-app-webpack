import loadData from './load-data.js'

const main = ()=>{
    const menuToggle = document.querySelector('.menu-toggle input');
    const nav = document.querySelector('nav ul');

    const disableScroll = () => { 
        document.body.classList.add("stop-scrolling"); 
    } 
      
    const enableScroll = () => { 
        document.body.classList.remove("stop-scrolling"); 
    } 
    

    document.addEventListener("DOMContentLoaded", ()=>{
        menuToggle.addEventListener('click', ()=> {
            nav.classList.toggle('slide');
            if(nav.className == 'slide'){
                disableScroll();
            } else {
                enableScroll();
            }
        });

        loadData();
    })
}

export default main;