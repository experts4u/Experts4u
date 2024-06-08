import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    access_token: null,
    token_expired: false,
    cart: [],
    currentLocation: null,
    saveCurrentLocation: null,
    saveTipForFuture: null,
    selectedSlot: null,
    selectedAddress: null,
    history: [],
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    saveTipForFuture: (state, action) => {
      state.saveTipForFuture = action.payload;
    },

    clearData: (state, action) => {
      state.userInfo = null;
      state.selected_profile_id = null;
      state.access_token = null;
    },
    setTokenExpired: (state, action) => {
      state.token_expired = false;
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== id);
      return {
        ...state,
        cart: updatedCart,
      };
    },

    addSearchTerm: (state, action) => {
      const searchObject = action.payload;
      if (!state.history) {
        state.history = []; // Ensure history is initialized
      }
      // Add new object to the front
      state.history.unshift(searchObject);
      // Keep only the last 6 objects
      if (state.history.length > 6) {
        state.history.pop();
      }
    },

    addSearchadressHistory: (state, action) => {
      const searchadress = action.payload;
      if (!state.historyofadress) {
        state.historyofadress = [];
      }
      state.historyofadress.unshift(searchadress);
      if (state.historyofadress.length > 6) {
        state.historyofadress.pop();
      }
    },
    clearAllHistory: (state) => {
      state.history = [];
    },
    updateItemInCart: (state, action) => {
      const { id, updatedDetails } = action.payload;

      const index = state.cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[index] = { ...updatedCart[index], ...updatedDetails };
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return state;
      }
    },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === newItem?.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity,
            };
          }
          return item;
        });
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    },

    removeByType: (state, action) => {
      const itemTypeToRemove = action.payload;
      const updatedCart = state.cart.filter(
        (item) => item.type !== itemTypeToRemove
      );
      return {
        ...state,
        cart: updatedCart,
      };
    },

    clearCart: (state) => {
      state.cart = [];
    },
    saveCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    saveCurrentLocation: (state, action) => {
      state.currentLocation = action.payload; // Save the current location in the state
    },
    removeCurrentLocation: (state, action) => {
      state.currentLocation = null; // Remove the current location from the state
    },
    increaseItemQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += 1;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1 && state.cart[itemIndex].quantity > 0) {
        state.cart[itemIndex].quantity -= 1;

        if (state.cart[itemIndex].quantity === 0) {
          state.cart.splice(itemIndex, 1); // Remove the item from the cart
        }
      }
    },

    saveAddress: (state, action) => {
      const newAddress = action.payload;
      state.addresses.push(newAddress);
    },

    // Action to edit an existing address
    editAddress: (state, action) => {
      const { id, updatedAddress } = action.payload;
      const addressIndex = state.addresses.findIndex(
        (address) => address.id === id
      );
      if (addressIndex !== -1) {
        state.addresses[addressIndex] = updatedAddress;
      }
    },

    // Action to remove an address
    removeAddress: (state, action) => {
      const addressIdToRemove = action.payload;
      state.addresses = state.addresses.filter(
        (address) => address.id !== addressIdToRemove
      );
    },

    saveSlot(state, action) {
      state.selectedSlot = action.payload;
    },
    saveAddress(state, action) {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  saveUserInfo,
  saveCurrentLocation,
  saveAccessToken,
  clearData,
  setTokenExpired,
  addToCart,
  removeFromCart,
  clearCart,
  addPackageItem,
  removePackageItem,
  clearPackageItems,
  editPackageItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  updateItemInCart,
  clearAllHistory,
  aveAddress, // New action for saving an address
  editAddress, // New action for editing an address
  removeAddress,
  // New action for removing an address
  saveTipForFuture,
  saveSlot,
  saveAddress,
  removeByType,
  addSearchTerm,
  addSearchadressHistory,
} = userSlice.actions;

export default userSlice.reducer;
