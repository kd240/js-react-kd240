import { useToggle } from 'react-use';

export default function useWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  const [wishlistState, toogleWishlistState] = useToggle(wishlist.includes(id) || false);

  function add() {
    if (!wishlist.includes(id)) {
      wishlist.push(id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  function remove() {
    const a = wishlist.filter((flight) => flight !== id);
    localStorage.setItem('wishlist', JSON.stringify(a));
  }

  function toggleWishlist() {
    if (wishlistState) {
      remove();
    } else {
      add();
    }
    toogleWishlistState();
  }

  return [wishlistState, toggleWishlist];
}
