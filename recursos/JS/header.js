let bar =false

window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    var nosotros = document.getElementById('nosotros');
    var scrollPosition = window.scrollY || window.pageYOffset;


    if (scrollPosition >= 100) {
        header.classList.add('hidden');
        header.classList.remove('visible');
    }
    if (scrollPosition >= 500) {
        nosotros.style.opacity = "100%";
        nosotros.style.pointerEvents= "all";
    } else {
        nosotros.style.opacity = "0%";
        nosotros.stylepointerEvents= "none";
        
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
