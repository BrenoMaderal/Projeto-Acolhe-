 const menuMobile = document.getElementById('menuMobile');
    const menu = document.getElementById('menu');

    menuMobile.addEventListener('click', function () {

        menuMobile.classList.toggle('ativo');
        menu.classList.toggle('ativo');

    });