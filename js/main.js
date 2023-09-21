
document.getElementById("visible-coding").style.visibility = "hidden";
document.getElementById("newTaking").style.visibility = "hidden";
document.getElementById("pro1").style.visibility = "hidden";
document.getElementById("pro2").style.visibility = "hidden";
// document.getElementById("pro3").style.visibility = "hidden";
document.getElementById("pro4").style.visibility = "hidden";
document.getElementById("outputs").style.visibility = "hidden";
// document.getElementById("projectsId").style.visibility = "hidden";
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
//===================== my javascript=============================//
var loadFile = function (event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};
function nameUpdate() {
  document.getElementById("name-resume").innerHTML = textn.value;
  document.getElementById("emailMy").innerText = texte.value;
  document.getElementById("contactMy").innerHTML = number.value;
}
function DegreeUpdate() {
  selectElement = document.querySelector('#select1');
  output = selectElement.value;
  document.querySelector('.output').textContent = output;

}
function updateEducation() {
  document.getElementById("college").innerHTML = collegen.value;
  document.getElementById("degree-duration").innerHTML = yearn.value;
  document.getElementById("Branch").innerHTML = branchn.value;
  document.getElementById("name-down").innerHTML = branchnn.value;
  document.getElementById("addressMy").innerHTML = number1.value;

}
function toShowCoding() {
  // document.getElementById("computer-skills").innerText = "yash sabne";

  if (coding.value == "yes") {
    document.getElementById("computer-skills").style.visibility = "visible";
    document.getElementById("visible-coding").style.visibility = "visible";

  }

  else if (coding.value == "no") {
    document.getElementById("computer-skills").style.visibility = "hidden";
    document.getElementById("visible-coding").style.visibility = "hidden";
  }
  else {
    document.getElementById("visible-coding").style.visibility = "hidden";

  }
}
function code() {
  document.getElementById("yash1").innerHTML = coding1.value;
  document.getElementById("yash2").innerHTML = coding2.value;

}
function projectExtra() {
  if (yes_no.value == "yes") {
    document.getElementById("projects").style.visibility = "visible";
    document.getElementById("pro1").style.visibility = "visible";
    document.getElementById("pro2").style.visibility = "visible";
    // document.getElementById("pro3").style.visibility = "visible";
    document.getElementById("pro4").style.visibility = "visible";
    document.getElementById("outputs").style.visibility = "visible";
    document.getElementById("projectsId").style.visibility = "visible";
  }
  else if (yes_no.value == "no") {
    document.getElementById("projects").style.visibility = "hidden";
    document.getElementById("pro1").style.visibility = "hidden";
    document.getElementById("pro2").style.visibility = "hidden";
    // document.getElementById("pro3").style.visibility = "hidden";
    document.getElementById("pro4").style.visibility = "hidden";
    document.getElementById("outputs").style.visibility = "hidden";
  }
}
function projectExtraActivity() {
  // document.getElementById("yash3").innerHTML = projectname.value;
  // document.getElementById("yash4").innerHTML = projecturl.value;
}

function updateProject() {


  // condition for project number
  if (outputs.value == "1") {
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div2").style.visibility = 'hidden';
    document.getElementById("div3").style.visibility = 'hidden';
    document.getElementById("div4").style.visibility = 'hidden';
    document.getElementById("div5").style.visibility = 'hidden';
    document.getElementById("project1print").style.visibility = 'visible';
    document.getElementById("project2print").style.visibility = 'hidden';
    document.getElementById("project3print").style.visibility = 'hidden';
    document.getElementById("project4print").style.visibility = 'hidden';
    document.getElementById("project5print").style.visibility = 'hidden';

  }
  else if (outputs.value == "2") {
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div2").style.visibility = 'visible';
    document.getElementById("div3").style.visibility = 'hidden';
    document.getElementById("div4").style.visibility = 'hidden';
    document.getElementById("div5").style.visibility = 'hidden';
    document.getElementById("project1print").style.visibility = 'visible';
    document.getElementById("project2print").style.visibility = 'visible';
    document.getElementById("project3print").style.visibility = 'hidden';
    document.getElementById("project4print").style.visibility = 'hidden';
    document.getElementById("project5print").style.visibility = 'hidden';
  }
  else if (outputs.value == "3") {
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div2").style.visibility = 'visible';
    document.getElementById("div3").style.visibility = 'visible';
    document.getElementById("div4").style.visibility = 'hidden';
    document.getElementById("div5").style.visibility = 'hidden';
    document.getElementById("project1print").style.visibility = 'visible';
    document.getElementById("project2print").style.visibility = 'visible';
    document.getElementById("project3print").style.visibility = 'visible';
    document.getElementById("project4print").style.visibility = 'hidden';
    document.getElementById("project5print").style.visibility = 'hidden';
  }

  else if (outputs.value == "4") {
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div2").style.visibility = 'visible';
    document.getElementById("div3").style.visibility = 'visible';
    document.getElementById("div4").style.visibility = 'visible';
    document.getElementById("project1print").style.visibility = 'visible';
    document.getElementById("project2print").style.visibility = 'visible';
    document.getElementById("project3print").style.visibility = 'visible';
    document.getElementById("project4print").style.visibility = 'visible';
    document.getElementById("project5print").style.visibility = 'hidden';
  }
  else if (outputs.value == "5") {
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div2").style.visibility = 'visible';
    document.getElementById("div3").style.visibility = 'visible';
    document.getElementById("div4").style.visibility = 'visible';
    document.getElementById("div5").style.visibility = 'visible';
    document.getElementById("project1print").style.visibility = 'visible';
    document.getElementById("project2print").style.visibility = 'visible';
    document.getElementById("project3print").style.visibility = 'visible';
    document.getElementById("project4print").style.visibility = 'visible';
    document.getElementById("project5print").style.visibility = 'visible';
  }
  else {
    document.getElementById("div1").style.visibility = 'hidden';
    document.getElementById("div2").style.visibility = 'hidden';
    document.getElementById("div3").style.visibility = 'hidden';
    document.getElementById("div4").style.visibility = 'hidden';
    document.getElementById("div5").style.visibility = 'hidden';

  }
}


function runProject() {
  document.getElementById("project1print").innerHTML = projectname1.value;
  document.getElementById("project2print").innerHTML = projectname2.value;
  document.getElementById("project3print").innerHTML = projectname3.value;
  document.getElementById("project4print").innerHTML = project4.value;
  document.getElementById("project5print").innerHTML = project5.value;
}

//vey hard logic

let input = document.getElementById("myInput");
let listArr = [];
input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){  // enter keyboard
        if(input.value != ''){
            let inValue = e.target.value;
            listArr.push(inValue.replace(/\s/g, ''));
            let newTagLi = '';
            listArr.forEach((element, index) => {
                newTagLi += `<span> ${element}<i style='color:#ced6e6;' class="fa fa-times" onclick="ondelete(${index})"></i></span>`;
            }) ;
            document.querySelector('.tags').innerHTML = newTagLi;
            input.value = '';
        }else{
            alert("Please input something");
        }
    }
})

function ondelete(index){
    listArr.splice(index, 1);
    let newTagLi = '';
    listArr.forEach((element, index) => {
        newTagLi += `<span> ${element}<i class="fa fa-times" onclick="ondelete(${index})"></i></span>`;
    });
    document.querySelector('.tags').innerHTML = newTagLi;
}

function printContent() {
  var restorepage = document.body.innerHTML;
  var printcontent = document.getElementById("print-it").innerHTML;
  document.body.innerHTML = printcontent;
  window.print();
  document.body.innerHTML = restorepage;
}