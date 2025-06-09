// Main JavaScript File

document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initThemeToggle();
  initNavbarScroll();
  initModelFilter();

  // Load animations after content is loaded
  setTimeout(() => {
    initAnimations();
  }, 500);
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) {
    // Exit if the toggle button is not present
    return;
  }
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    document.body.classList.add(savedTheme + "-theme");
    updateThemeIcon(savedTheme);
  } else if (prefersDark) {
    document.body.classList.add("dark-theme");
    updateThemeIcon("dark");
  } else {
    document.body.classList.add("light-theme");
    updateThemeIcon("light");
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", function () {
    const isDark = document.body.classList.contains("dark-theme");

    if (isDark) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      updateThemeIcon("light");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("dark");
    }

    // Prevent duplicate icons by updating only the icon element
    if (icon) {
      if (document.body.classList.contains("light-theme")) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    }
  });

  function updateThemeIcon(theme) {
    if (!icon) return;
    if (theme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Model Filter Functionality
function initModelFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      const modelItems = document.querySelectorAll(
        ".model-grid [data-category]"
      );

      modelItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Initialize animations
function initAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Hero text animation
    gsap.from(".hero-title span", {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.2,
    });

    // Animate on scroll elements
    gsap.utils.toArray(".animate-on-scroll").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    });

    // Parallax effects
    gsap.utils.toArray(".parallax-section").forEach((section) => {
      gsap.fromTo(
        section,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 20%",
          scrollTrigger: {
            trigger: section,
            scrub: true,
          },
        }
      );
    });
  }

  // Initialize Lottie animations
  if (typeof Lottie !== "undefined") {
    // You can initialize specific Lottie animations here if needed
    
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
