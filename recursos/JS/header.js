let bar =false

window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var scrollPosition = window.scrollY || window.pageYOffset;

    var triggerPoint = 100; 

    if (scrollPosition >= triggerPoint) {
        header.classList.add('hidden');
        header.classList.remove('visible');
    } else {
        header.classList.add('visible');
        header.classList.remove('hidden');
    }
});

function sidebar(){
    bar = !bar
    var sidebar = document.getElementById('sidebar');

    if(bar){
        sidebar.style.transform = "translateX(0%)"
    }else{
        sidebar.style.transform = "translateX(110%)"
    }
}

function redirigir(href){
    document.getElementById(href).scrollIntoView({ behavior: 'smooth' });
}
