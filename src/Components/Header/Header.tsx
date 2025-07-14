import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './Header.scss';
import { useClickOutside } from './Hooks/useClickOutside';
import { useWishlist } from '../../Context/WishlistContext';
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const popoverRef = useRef<HTMLDivElement>(null);
  useClickOutside(popoverRef, () => setIsOpen(false), isOpen);

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__logo" onClick={() => navigate('/')}>
          Movie Browser
        </h1>
        <div className="header__wishlist" ref={popoverRef}>
          <button className="wishlist__button" onClick={() => setIsOpen((prev) => !prev)}>
            <FontAwesomeIcon icon={faStar} className="wishlist__icon" />
            <span className="wishlist__label">Wishlist ({wishlist.length})</span>
          </button>

          {isOpen && (
            <div className="wishlist__popover">
              {wishlist.length === 0 && <p className="wishlist__empty">Your wishlist is empty</p>}

              {wishlist.length > 0 && (
                <>
                  {wishlist.map((movie) => (
                    <div className="wishlist__item" key={movie.id}>
                      {movie.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
