import { create } from 'zustand';
import { currentCart } from '@wix/ecom';
import { WixClient } from '@/context/wixContext';

type CartState = {
    cart: currentCart.Cart;
    isLoading: boolean;
    counter: number;
    getCart: (wixClient: WixClient) => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    isLoading: true,
    counter: 0,
    getCart: async (wixClient) => {
        try {
            const cart = await wixClient.currentCart.getCurrentCart();
            set({
                cart: cart || [],
                isLoading: false,
                counter: cart?.lineItems.length || 0
            });
        } catch (err) {
            set((prev) => ({ ...prev, isLoading: false }));
        }
    }
}))
