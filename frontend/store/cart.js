import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => {
                if (!item) return;
                const { cart } = get();
                const itemInCart = cart.find((i) => i.slug === item.slug && i.modification === item.modification);
                const newCart = itemInCart
                    ? cart.map((i) =>
                        i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
                    )
                    : [...cart, { ...item, quantity: 1 }];
                set({ cart: newCart });
                toast.success('Added to Cart');
            },
            removeItem: (slug, modification) => {
                alert(modification.name)
                const newCart = get().cart.filter((i) => i.slug !== slug && i.modification.name !== modification.name);
                set({ cart: newCart });
            },
            incrementQuantity: (slug, modification) => {
                const newCart = get().cart.map((i) =>
                    i.slug === slug && i.modification === modification ? { ...i, quantity: i.quantity + 1 } : i
                );
                set({ cart: newCart });
            },
            decrementQuantity: (slug, modification) => {
                const newCart = get().cart.map((i) =>
                    i.slug === slug && i.modification === modification ? { ...i, quantity: i.quantity > 0 ? i.quantity - 1 : 0 } : i
                );
                set({ cart: newCart });
            },
            getTotalItems: () => get().cart.length,
            getTotalQuantity: () => get().cart.reduce((x, y) => x + y.quantity, 0),
            getTotalPrice: () => get().cart.reduce((x, y) => x + y.modification.price * y.quantity, 0),
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                });
            }
        }),
        {
            name: "cart-storage",
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true)
            }
        }
    )
);