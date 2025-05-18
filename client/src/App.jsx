import { useState } from 'react'
import map from './assets/map.svg'
import logo from './assets/logo.svg'
import search from './assets/search.svg'
import bag from './assets/bag.svg'
import PriceFilter from './components/PriceFilter';
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';


function App() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  
  const handlePriceChange = (minPrice, maxPrice) => {
    console.log(`Price range changed: $${minPrice} – $${maxPrice}`);
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
                  value="vegetables" 
                />
                <span className="circle-checkbox__control"></span>
                <p>Все категории</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="vegetables" 
                />
                <span className="circle-checkbox__control"></span>
                <p>Овощи</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="fruits" 
                />
                <span className="circle-checkbox__control"></span>
                <p>Фрукты</p>
              </label>
              <label className="circle-checkbox">
                <input 
                  type="radio" 
                  className="circle-checkbox__input" 
                  name="foodCategory" 
                  value="cheeses" 
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
        </div>
      </div>
    </>
  )
}

export default App
