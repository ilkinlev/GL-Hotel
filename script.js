let currentLang = "en";
const roomImageIndexes = {
  standard: 0,
  deluxe: 0,
};

// Gallery Image Popup
let currentGalleryIndex = 0;
let galleryImages = [];

function openGalleryPopup(index) {
  currentGalleryIndex = index;
  const popup = document.getElementById("gallery-popup");
  const popupImg = document.getElementById("popup-image");

  popupImg.src = galleryImages[currentGalleryIndex];
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeGalleryPopup() {
  const popup = document.getElementById("gallery-popup");
  popup.style.display = "none";
  document.body.style.overflow = "auto";
}

function changeGalleryImage(direction) {
  currentGalleryIndex =
    (currentGalleryIndex + direction + galleryImages.length) %
    galleryImages.length;
  document.getElementById("popup-image").src =
    galleryImages[currentGalleryIndex];
}

// Initialize gallery on page load
window.addEventListener("DOMContentLoaded", function () {
  // Set minimum dates
  const today = new Date().toISOString().split("T")[0];
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");

  if (checkInInput) {
    checkInInput.setAttribute("min", today);
    checkInInput.addEventListener("change", function () {
      checkOutInput.setAttribute("min", this.value);
    });
  }

  // Setup gallery click handlers
  const galleryItems = document.querySelectorAll(".gallery-item img");
  galleryImages = Array.from(galleryItems).map((img) => img.src);

  galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => openGalleryPopup(index));
    img.style.cursor = "pointer";
  });
});

// Language Toggle
function toggleLanguage() {
  currentLang = currentLang === "en" ? "az" : "en";
  document.getElementById("langText").textContent =
    currentLang === "en" ? "AZ" : "EN";

  // Update all translatable elements
  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = el.getAttribute("data-" + currentLang);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.placeholder) el.placeholder = text;
    } else if (el.tagName === "OPTION") {
      el.textContent = text;
    } else {
      el.textContent = text;
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
    el.placeholder = el.getAttribute("data-" + currentLang + "-placeholder");
  });
}

// Image Gallery
function changeImage(roomType, direction) {
  const gallery = document.querySelector(`[data-room="${roomType}"]`);
  const images = gallery.querySelectorAll("img");

  images[roomImageIndexes[roomType]].classList.remove("active");

  roomImageIndexes[roomType] =
    (roomImageIndexes[roomType] + direction + images.length) % images.length;

  images[roomImageIndexes[roomType]].classList.add("active");
}

// Modal Functions
function openModal() {
  document.getElementById("booking").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("booking").classList.remove("active");
  document.body.style.overflow = "auto";
}

// Smooth scroll to booking section
document.querySelectorAll('a[href="#booking"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  });
});

// Close modal when clicking outside
document.getElementById("booking").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Booking Form Handler
function handleBooking(event) {
  event.preventDefault();

  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;
  const adults = document.getElementById("adults").value;
  const children = document.getElementById("children").value;
  const roomType = document.getElementById("roomType").value;
  const guestName = document.getElementById("guestName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const requests = document.getElementById("requests").value;

  const roomNames = {
    en: { standard: "Standard Room", deluxe: "Deluxe Room" },
    az: { standard: "Standart Otaq", deluxe: "Deluxe Otaq" },
  };

  let message =
    currentLang === "en"
      ? "New Booking Request - GL Hotel Baku\n\n"
      : "Yeni Rezerv Sorğusu - GL Hotel Bakı\n\n";

  message +=
    currentLang === "en" ? `Check-in: ${checkIn}\n` : `Giriş: ${checkIn}\n`;
  message +=
    currentLang === "en" ? `Check-out: ${checkOut}\n` : `Çıxış: ${checkOut}\n`;
  message +=
    currentLang === "en"
      ? `Guests: ${adults} Adults`
      : `Qonaqlar: ${adults} Böyük`;

  if (children !== "0") {
    message +=
      currentLang === "en" ? `, ${children} Children` : `, ${children} Uşaq`;
  }

  message += `\n${currentLang === "en" ? "Room Type" : "Otaq Növü"}: ${roomNames[currentLang][roomType]}\n`;
  message += `${currentLang === "en" ? "Name" : "Ad"}: ${guestName}\n`;

  if (email)
    message += `${currentLang === "en" ? "Email" : "E-poçt"}: ${email}\n`;
  if (phone)
    message += `${currentLang === "en" ? "Phone" : "Telefon"}: ${phone}\n`;
  if (requests)
    message += `${currentLang === "en" ? "Special Requests" : "Xüsusi İstəklər"}: ${requests}\n`;

  const whatsappNumber = "994775806010";

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
  closeModal();
}

// Contact Form Handler
function handleContact(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name") || event.target[0].value;
  const email = formData.get("email") || event.target[1].value;
  const phone = formData.get("phone") || event.target[2].value;
  const message = formData.get("message") || event.target[3].value;

  let whatsappMessage =
    currentLang === "en"
      ? "Contact Request - GL Hotel Baku\n\n"
      : "Əlaqə Sorğusu - GL Hotel Bakı\n\n";

  whatsappMessage += `${currentLang === "en" ? "Name" : "Ad"}: ${name}\n`;
  whatsappMessage += `Email: ${email}\n`;
  if (phone)
    whatsappMessage += `${currentLang === "en" ? "Phone" : "Telefon"}: ${phone}\n`;
  whatsappMessage += `\n${currentLang === "en" ? "Message" : "Mesaj"}:\n${message}`;

  const whatsappNumber = "994555806010";
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
  event.target.reset();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#booking") return; // Modal is handled separately

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
