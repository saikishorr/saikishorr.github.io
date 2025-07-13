
{/* <script> */}
    
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname){
        for(tablink of tablinks){
            tablink.classList.remove("active-link")
        }
        for(tabcontent of tabcontents){
            tabcontent.classList.remove("active-tab")
        }
        event.currentTarget.classList.add("active-link")
        document.getElementById(tabname).classList.add("active-tab")
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
