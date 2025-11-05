// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
      });
    });
  }
});

// Cookie Consent Banner
function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookiesAccepted")) {
    const banner = document.getElementById("cookie-banner");
    if (banner) {
      banner.style.display = "none";
    }
  }
});

// Smooth Scroll for Anchor Links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Active Nav Link Highlighting
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const currentLocation = location.href;
  const currentPage = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);

  navLinks.forEach((link) => {
    const linkPage = link.href.substring(link.href.lastIndexOf('/') + 1);
    // Handle index.html as a special case for the "Home" link
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add("active");
    } else if (link.href === currentLocation) { // Fallback for full path match
      link.classList.add("active");
    }
  });
});

// Auto Schema.org URL Injection
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    const existingSchema = document.getElementById("dynamic-schema");
    if (existingSchema) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "BookVault",
        url: window.location.origin,
        description:
          "Complete online books library - access thousands of books",
      };
      existingSchema.textContent = JSON.stringify(schema);
    }
  }
});

// Scroll to Top Button
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-to-top";
  scrollBtn.innerHTML = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.style.display = "none";
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Add CSS for scroll to top button dynamically
const style = document.createElement("style");
style.textContent = `
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      z-index: 997;
    }
    
    .scroll-to-top:hover {
      background-color: #1e3a8a;
      transform: translateY(-3px);
      box-shadow: 0 10px 15px rgba(0,0,0,0.15);
    }
    
    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 45px;
        height: 45px;
        font-size: 1.25rem;
      }
    }
  `;
document.head.appendChild(style);

// Lazy Load Enhancement
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// Debug
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("BookVault Website Loaded Successfully");
}
