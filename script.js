(function () {
  // ==================== LOCAL STORAGE KEY ====================
  const STORAGE_KEY = "azCafeSelection";

  // ==================== MENU DATA (local images) ====================
  const menuItemsRaw = [
    {
      name: "Espresso",
      price: 25,
      category: "hot",
      desc: "Intense & aromatic single origin",
      image: "./Products/Hot/Espresso.webp",
    },
    {
      name: "Cappuccino",
      price: 35,
      category: "hot",
      desc: "Perfect foam, balanced espresso",
      image: "./Products/Hot/Cappuccino.jpg",
    },
    {
      name: "Latte",
      price: 35,
      category: "hot",
      desc: "Velvety steamed milk & coffee",
      image: "./Products/Hot/Latte.jpg",
    },
    {
      name: "Turkish Coffee",
      price: 30,
      category: "hot",
      desc: "Traditional, rich & foamy",
      image: "./Products/Hot/TurkishCoffee.jpg",
    },
    {
      name: "Tea (Black / Green)",
      price: 20,
      category: "hot",
      desc: "Premium leaves, hot steeped",
      image: "./Products/Hot/Tea.jpg",
    },
    {
      name: "Iced Coffee",
      price: 40,
      category: "cold",
      desc: "Chilled & refreshing",
      image: "./Products/Cold/IcedCoffee.webp",
    },
    {
      name: "Iced Latte",
      price: 45,
      category: "cold",
      desc: "Smooth espresso & cold milk",
      image: "./Products/Cold/IcedLatte.jpg",
    },
    {
      name: "Cold Brew",
      price: 50,
      category: "cold",
      desc: "Slow steeped, strong & smooth",
      image: "./Products/Cold/ColdBrew.jpg",
    },
    {
      name: "Iced Mocha",
      price: 50,
      category: "cold",
      desc: "Chocolate, espresso & cream",
      image: "./Products/Cold/IcedMocha.webp",
    },
    {
      name: "Soft Drinks",
      price: 25,
      category: "cold",
      desc: "Coke / Sprite (can)",
      image: "./Products/Cold/SoftDrinks.jpg",
    },
    {
      name: "Orange Juice",
      price: 30,
      category: "juice",
      desc: "Freshly squeezed",
      image: "./Products/Juice/OrangeJuice.avif",
    },
    {
      name: "Mango Juice",
      price: 35,
      category: "juice",
      desc: "Sweet tropical mango",
      image: "./Products/Juice/MangoJuice.jpg",
    },
    {
      name: "Strawberry Juice",
      price: 35,
      category: "juice",
      desc: "Fresh strawberry bliss",
      image: "./Products/Juice/StrawberryJuice.png",
    },
    {
      name: "Lemon Mint",
      price: 30,
      category: "juice",
      desc: "Zesty lemon & fresh mint",
      image: "./Products/Juice/LemonMint.jpg",
    },
    {
      name: "Beetroot Juice",
      price: 45,
      category: "juice",
      desc: "Seasonal fruits blend",
      image: "./Products/Juice/Beetroot.jpg",
    },
    {
      name: "Chocolate Cake",
      price: 40,
      category: "desserts",
      desc: "Decadent moist chocolate",
      image: "./Products/Desserts/ChocolateCake.jpg",
    },
    {
      name: "Cheesecake",
      price: 45,
      category: "desserts",
      desc: "Creamy New York style",
      image: "./Products/Desserts/Cheesecake.jpg",
    },
    {
      name: "Brownies",
      price: 35,
      category: "desserts",
      desc: "Fudgy walnut brownie",
      image: "./Products/Desserts/Brownies.jpg",
    },
    {
      name: "Croissant",
      price: 30,
      category: "desserts",
      desc: "Chocolate or Plain, flaky",
      image: "./Products/Desserts/Croissant.avif",
    },
    {
      name: "Donuts",
      price: 25,
      category: "desserts",
      desc: "Glazed, soft & sweet",
      image: "./Products/Desserts/Donuts.jpg",
    },
    {
      name: "Chicken Sandwich",
      price: 50,
      category: "snacks",
      desc: "Grilled chicken, lettuce, mayo",
      image: "./Products/Snacks/ChickenSandwich.jpg",
    },
    {
      name: "Beef Burger",
      price: 60,
      category: "snacks",
      desc: "Juicy beef patty, cheddar",
      image: "./Products/Snacks/BeefBurger.webp",
    },
    {
      name: "French Fries",
      price: 30,
      category: "snacks",
      desc: "Crispy golden fries",
      image: "./Products/Snacks/FrenchFries.jpg",
    },
    {
      name: "Club Sandwich",
      price: 55,
      category: "snacks",
      desc: "Triple layer, chicken, bacon",
      image: "./Products/Snacks/ClubSandwich.jpg",
    },
    {
      name: "Chicken Wrap",
      price: 45,
      category: "snacks",
      desc: "Grilled chicken, veggies, sauce",
      image: "./Products/Snacks/ChickenWrap.jpg",
    },
  ];

  // Categories (including Selection)
  const categories = [
    { id: "hot", name: "Hot Drinks", icon: "fas fa-mug-hot" },
    { id: "cold", name: "Cold Drinks", icon: "fas fa-whiskey-glass" },
    { id: "juice", name: "Fresh Juice", icon: "fas fa-apple-alt" },
    { id: "desserts", name: "Desserts", icon: "fas fa-cake-candles" },
    { id: "snacks", name: "Snacks", icon: "fas fa-burger" },
    { id: "selection", name: "Selection", icon: "fas fa-basket-shopping" },
  ];

  // ==================== SELECTION STATE ====================
  let selection = [];
  let nextId = 0;

  // ---------- LocalStorage helpers ----------
  function saveSelectionToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  }

  function loadSelectionFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          selection = parsed;
          // Determine next ID (max id + 1)
          if (selection.length > 0) {
            const maxId = Math.max(...selection.map((item) => item.id));
            nextId = maxId + 1;
          } else {
            nextId = 0;
          }
          return;
        }
      } catch (e) {
        console.warn("Failed to parse localStorage", e);
      }
    }
    selection = [];
    nextId = 0;
  }

  // ---------- Toast ----------
  function showToast(itemName) {
    const existingToast = document.querySelector(".toast-notification");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${itemName} added to selection! ✨`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // ---------- Selection actions (with auto-save) ----------
  function addItemToSelection(name, price) {
    const existing = selection.find((item) => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      selection.push({ id: nextId++, name: name, price: price, quantity: 1 });
    }
    saveSelectionToLocalStorage();
    showToast(name);
    if (activeCategory === "selection") renderSelectionPage();
  }

  function updateItemQuantity(id, delta) {
    const index = selection.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newQty = selection[index].quantity + delta;
      if (newQty <= 0) {
        selection.splice(index, 1);
      } else {
        selection[index].quantity = newQty;
      }
      saveSelectionToLocalStorage();
      if (activeCategory === "selection") renderSelectionPage();
    }
  }

  function removeItemCompletely(id) {
    selection = selection.filter((item) => item.id !== id);
    saveSelectionToLocalStorage();
    if (activeCategory === "selection") renderSelectionPage();
  }

  function clearAllSelection() {
    selection = [];
    saveSelectionToLocalStorage();
    if (activeCategory === "selection") renderSelectionPage();
  }

  // ---------- Render Selection Page (Cart) ----------
  function renderSelectionPage() {
    if (selection.length === 0) {
      dynamicContainer.innerHTML = `
          <div class="selection-view">
            <div class="selection-header"><h3><i class="fas fa-basket-shopping"></i> Your Selection</h3><button id="clearAllBtn" class="clear-btn"><i class="fas fa-trash-alt"></i> Clear all</button></div>
            <div class="empty-selection"><i class="fas fa-coffee"></i> No items added yet.<br>➕ Tap + on any item from menu</div>
            <div class="selection-total"><span>Total:</span><span>0 EGP</span></div>
          </div>`;
      const clearBtn = document.getElementById("clearAllBtn");
      if (clearBtn)
        clearBtn.addEventListener("click", () => clearAllSelection());
      return;
    }

    let total = 0;
    const itemsHtml = selection
      .map((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
          <div class="selection-item" data-id="${item.id}">
            <div class="item-details">
              <div class="item-title">${escapeHtml(item.name)}</div>
              <div class="item-price-sm">${item.price} EGP each</div>
            </div>
            <div class="item-actions">
              <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
              <span class="item-qty">${item.quantity}</span>
              <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
              <button class="remove-item" data-id="${item.id}" title="Remove"><i class="fas fa-trash-can"></i></button>
            </div>
          </div>
        `;
      })
      .join("");

    const fullHtml = `
        <div class="selection-view">
          <div class="selection-header">
            <h3><i class="fas fa-basket-shopping"></i> Your Selection</h3>
            <button id="clearAllBtn" class="clear-btn"><i class="fas fa-trash-alt"></i> Clear all</button>
          </div>
          <div class="selection-list">${itemsHtml}</div>
          <div class="selection-total">
            <span>Total:</span>
            <span id="selectionTotal">${total} EGP</span>
          </div>
        </div>
      `;
    dynamicContainer.innerHTML = fullHtml;

    document.querySelectorAll(".dec-qty").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(btn.getAttribute("data-id"));
        updateItemQuantity(id, -1);
      });
    });
    document.querySelectorAll(".inc-qty").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(btn.getAttribute("data-id"));
        updateItemQuantity(id, 1);
      });
    });
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(btn.getAttribute("data-id"));
        removeItemCompletely(id);
      });
    });
    const clearBtn = document.getElementById("clearAllBtn");
    if (clearBtn) clearBtn.addEventListener("click", () => clearAllSelection());
  }

  // Helper to escape HTML (prevent XSS)
  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  // ---------- Menu rendering, category switching, search, animations ----------
  let activeCategory = "hot";
  let currentSearch = "";
  let isLoading = false;
  let loadTimeout = null;
  let cardObserver = null;
  const dynamicContainer = document.getElementById("dynamicContent");
  const searchInput = document.getElementById("searchInput");
  const searchWrapper = document.getElementById("searchWrapper");
  const bottomNav = document.getElementById("bottomNav");

  function getFilteredItems() {
    let filtered = menuItemsRaw.filter(
      (item) => item.category === activeCategory,
    );
    if (currentSearch.trim()) {
      const lower = currentSearch.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.desc.toLowerCase().includes(lower),
      );
    }
    return filtered;
  }

  function renderMenuCards(items) {
    if (!items.length) {
      dynamicContainer.innerHTML = `<div class="no-results"><i class="fas fa-coffee"></i> No items match<br>✨ Try another category</div>`;
      return;
    }
    const cardsHTML = items
      .map(
        (item) => `
        <div class="menu-card">
          <div class="card-img"><img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="400" style="aspect-ratio:1/1; object-fit:cover;" onerror="this.src='https://placehold.co/400x400?text=AZ+Cafe'"></div>
          <div class="card-info">
            <div class="item-name">${escapeHtml(item.name)}</div>
            <div class="item-desc">${escapeHtml(item.desc)}</div>
            <div class="price-row">
              <div class="price"><i class="fas fa-coins"></i> ${item.price} EGP</div>
              <button class="add-btn" data-name="${escapeHtml(item.name)}" data-price="${item.price}"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
      `,
      )
      .join("");
    dynamicContainer.innerHTML = cardsHTML;

    document.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const name = btn.getAttribute("data-name");
        const price = parseInt(btn.getAttribute("data-price"));
        btn.classList.add("added-animation");
        setTimeout(() => btn.classList.remove("added-animation"), 400);
        addItemToSelection(name, price);
      });
    });
  }

  function observeCardsScroll() {
    if (cardObserver) cardObserver.disconnect();
    const cards = document.querySelectorAll(".menu-card");
    cards.forEach((c) => c.classList.remove("revealed"));
    cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10px 0px" },
    );
    cards.forEach((card) => cardObserver.observe(card));
    cards.forEach((card) => {
      if (card.getBoundingClientRect().top < window.innerHeight - 80)
        card.classList.add("revealed");
    });
  }

  function refreshMenu() {
    if (isLoading || activeCategory === "selection") return;
    const filtered = getFilteredItems();
    renderMenuCards(filtered);
    observeCardsScroll();
  }

  function switchCategoryWithLoading(categoryId) {
    if (loadTimeout) clearTimeout(loadTimeout);
    isLoading = true;
    dynamicContainer.innerHTML = `<div class="loading-spinner"><div class="spinner"></div></div>`;
    loadTimeout = setTimeout(() => {
      activeCategory = categoryId;
      if (activeCategory === "selection") {
        searchWrapper.classList.add("search-hidden");
        renderSelectionPage();
      } else {
        searchWrapper.classList.remove("search-hidden");
        const filtered = getFilteredItems();
        renderMenuCards(filtered);
        observeCardsScroll();
      }
      isLoading = false;
      loadTimeout = null;
    }, 250);
  }

  function renderBottomNav() {
    bottomNav.innerHTML = categories
      .map(
        (cat) => `
        <button class="nav-item ${activeCategory === cat.id ? "active" : ""}" data-category="${cat.id}">
          <i class="${cat.icon}"></i><span>${cat.name}</span>
        </button>
      `,
      )
      .join("");
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const catId = btn.dataset.category;
        if (catId === activeCategory || isLoading) return;
        if (catId !== "selection") {
          searchInput.value = "";
          currentSearch = "";
        }
        setActiveNavUI(catId);
        switchCategoryWithLoading(catId);
        document
          .querySelector(".menu-section")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function setActiveNavUI(catId) {
    document.querySelectorAll(".nav-item").forEach((btn) => {
      if (btn.dataset.category === catId) btn.classList.add("active");
      else btn.classList.remove("active");
    });
  }

  let searchDebounce;
  function handleSearch(e) {
    if (activeCategory === "selection") return;
    if (searchDebounce) clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      currentSearch = e.target.value.trim();
      if (!isLoading) {
        dynamicContainer.style.opacity = "0.6";
        setTimeout(() => {
          refreshMenu();
          dynamicContainer.style.opacity = "1";
        }, 120);
      } else refreshMenu();
    }, 250);
  }

  // ==================== INITIALIZATION ====================
  function init() {
    // Load saved selection from localStorage
    loadSelectionFromLocalStorage();

    renderBottomNav();
    activeCategory = "hot";
    currentSearch = "";
    searchInput.value = "";
    searchWrapper.classList.remove("search-hidden");
    const initialItems = menuItemsRaw.filter((i) => i.category === "hot");
    renderMenuCards(initialItems);
    observeCardsScroll();
    searchInput.addEventListener("input", handleSearch);
  }
  init();
})();
