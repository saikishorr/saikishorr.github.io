
{/* <script> */}
    
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname, el){
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    el.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// 
// </script>

// <script>

var sidemenu = document.getElementById("sidemenu");

    function openmenu(){
        document.getElementById("sidemenu").style.width = "100%";
    }
    function closemenu(){
        document.getElementById("sidemenu").style.width = "0";
    }
// </script>


    // <script>
        document.addEventListener("DOMContentLoaded", function() {
          const cursorCircle = document.getElementById('cursor-circle');
        
          document.addEventListener("mousemove", function(event) {
            const x = event.clientX;
            const y = event.clientY;
        
            cursorCircle.style.left = x - 15 + 'px'; // Adjust position to center circle on cursor
            cursorCircle.style.top = y - 15 + 'px'; // Adjust position to center circle on cursor
          });
        });
        
        
            // </script>

            document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("msg");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // prevent page refresh

        const formData = new FormData(form);

        fetch("api/save_contact.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                msg.style.color = "#61b752";
                msg.innerText = data.message;
                form.reset();
            } else {
                msg.style.color = "red";
                msg.innerText = data.message;
            }
        })
        .catch(() => {
            msg.style.color = "red";
            msg.innerText = "Something went wrong. Please try again.";
        });
    });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
