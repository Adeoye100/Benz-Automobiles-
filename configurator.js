// configurator.js - Vehicle Configurator Logic

document.addEventListener("DOMContentLoaded", function () {
  // Configuration object to store user selections
  const config = {
    model: {
      id: "eqs",
      name: "EQS Sedan",
      basePrice: 102310,
      image: "assets/images/models/eqs-config.jpg",
    },
    exterior: {
      color: "black",
      name: "Obsidian Black",
      price: 0,
    },
    wheels: {
      id: "19",
      name: "19-inch AMG 5-spoke",
      price: 0,
      image: "assets/images/wheels/19-inch.jpg",
    },
    // More configuration options...
  };

  // Initialize Swiper for 360 viewer
  const modelViewer = new Swiper(".modelViewerSwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".viewer-next",
      prevEl: ".viewer-prev",
    },
  });

  // Model selection
  document.querySelectorAll(".model-option input").forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        const modelId = this.value;
        const modelName =
          this.nextElementSibling.querySelector("h4").textContent;
        const modelPrice = parseFloat(
          this.nextElementSibling
            .querySelector(".price")
            .textContent.replace(/[^0-9.]/g, "")
        );

        config.model = {
          id: modelId,
          name: modelName,
          basePrice: modelPrice,
          image: `assets/images/models/${modelId}-config.jpg`,
        };

        updateSummary();
      }
    });
  });

  // Color selection
  document.querySelectorAll(".color-options input").forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        const color = this.value;
        let colorName = "";
        let price = 0;

        switch (color) {
          case "black":
            colorName = "Obsidian Black";
            price = 0;
            break;
          case "silver":
            colorName = "Iridium Silver";
            price = 1500;
            break;
          // More color cases...
        }

        config.exterior = {
          color: color,
          name: colorName,
          price: price,
        };

        updateColorPreview();
        updateSummary();
      }
    });
  });

  // Wheel selection
  document.querySelectorAll(".wheel-options input").forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        const wheelId = this.value;
        const wheelName =
          this.nextElementSibling.querySelector("span").textContent;
        let price = 0;

        switch (wheelId) {
          case "19":
            price = 0;
            break;
          case "20":
            price = 1200;
            break;
          case "21":
            price = 2500;
            break;
        }

        config.wheels = {
          id: wheelId,
          name: wheelName,
          price: price,
          image: `assets/images/wheels/${wheelId}-inch.jpg`,
        };

        updateSummary();
      }
    });
  });

  // Step navigation
  document.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".configurator-step");
      const nextStepId = this.dataset.next;

      currentStep.classList.remove("active");
      document.getElementById(`step-${nextStepId}`).classList.add("active");

      // Update progress
      document
        .querySelector(`.step[data-step="${nextStepId}"]`)
        .classList.add("active");
    });
  });

  document.querySelectorAll(".prev-step").forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".configurator-step");
      const prevStepId = this.dataset.prev;

      currentStep.classList.remove("active");
      document.getElementById(`step-${prevStepId}`).classList.add("active");
    });
  });

  // Update color preview
  function updateColorPreview() {
    const overlay = document.getElementById("color-overlay");
    let colorValue = "";

    switch (config.exterior.color) {
      case "black":
        colorValue = "#000000";
        break;
      case "silver":
        colorValue = "#c0c0c0";
        break;
      // More color cases...
    }

    overlay.style.backgroundColor = colorValue;
  }

  // Update summary
  function updateSummary() {
    document.getElementById("config-model-img").src = config.model.image;
    document.getElementById("config-model-name").textContent =
      config.model.name;
    document.getElementById(
      "config-base-price"
    ).textContent = `$${config.model.basePrice.toLocaleString()}`;
    document.getElementById("exterior-option").textContent =
      config.exterior.name;
    document.getElementById("wheels-option").textContent = config.wheels.name;

    // Calculate total
    const total =
      config.model.basePrice + config.exterior.price + config.wheels.price;
    document.getElementById(
      "config-total-price"
    ).textContent = `$${total.toLocaleString()}`;
  }

  // Save configuration
  document.getElementById("save-config").addEventListener("click", function () {
    // In a real application, this would save to a database or localStorage
    alert(
      "Configuration saved! You can now proceed to contact a dealer or continue building."
    );
  });

  // Initialize summary
  updateSummary();
  updateColorPreview();
});
