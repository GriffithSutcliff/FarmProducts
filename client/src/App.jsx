import { useEffect, useState } from 'react';
import map from './assets/map.svg';
import logo from './assets/logo.svg';
import search from './assets/search.svg';
import bag from './assets/bag.svg';
import PriceFilter from './components/PriceFilter';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:3000/api/products?category=${encodeURIComponent(selectedCategory)}`
      : 'http://localhost:3000/api/products';
    
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [selectedCategory]);

  const handlePriceChange = (minPrice, maxPrice) => {
    console.log(`Price range changed: ${minPrice} – ${maxPrice} руб.`);
  };

  // Логика слайдера
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="footer1">
        <div className="adress">
          <img src={map} className="map-icon"/>
          <p>Улица Пушкина Дом Колотушкина</p>
        </div>
        <div className="reg">
          <p onClick={() => setShowLoginModal(true)}>Войти</p>
          {showLoginModal && (
            <LoginModal 
              onClose={() => setShowLoginModal(false)}
              onLoginClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
            />
          )}
          <p>/</p>
          <p onClick={() => setShowRegisterModal(true)}>Регистрация</p>
          {showRegisterModal && (
            <RegisterModal 
              onClose={() => setShowRegisterModal(false)}
              onLoginClick={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="footer2">
        <div className="logo-container">
          <img src={logo} className="logo" />
          <h1>ЭкоБазар</h1>
        </div>
        <div className="search-container">
          <div className="search">
            <img src={search} className="search-icon"/>
            <input placeholder="поиск" />
          </div>
          <button>Поиск</button>
        </div>
        <div className="bag-container">
          <img src={bag} />
          <div className="bag-name">
            <p>корзина</p>
            <h1>стоимость</h1>
          </div>
        </div>
      </div>
      <div className="background">
        <p>8 (800) 333-88-68</p>
      </div>
      <div className="main-pos">
        <div className="main-container">
          <div className="left-side">
            <div className="filter-container">
              <h1>Категории</h1>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value=""
                  onChange={() => setSelectedCategory('')}
                />
                <span className="circle-checkbox__control"></span>
                <p>Все категории</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="Овощи"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span className="circle-checkbox__control"></span>
                <p>Овощи</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="Фрукты"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span className="circle-checkbox__control"></span>
                <p>Фрукты</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="Сыры"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span className="circle-checkbox__control"></span>
                <p>Сыры</p>
              </label>
            </div>
            <div>
              <h1>Цена</h1>
              <PriceFilter onPriceChange={handlePriceChange} />
            </div>
          </div>
          <div className="right-side">
            <div className="product-slider">
              <div className="slider-container2">
                {currentProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image_url} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">{product.price} руб.</p>
                      {product.category === 'Овощи' && <span className="in-stock">В наличии</span>}
                      {product.category !== 'Овощи' && <span className="out-of-stock">Нет в наличии</span>}
                    </div>
                    <button className="add-to-cart">Добавить</button>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button onClick={handlePrevPage} className="prev-btn" disabled={currentPage === 1}>
                  ←
                </button>
                <span className="page-number">{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} className="next-btn" disabled={currentPage === totalPages}>
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;