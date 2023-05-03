import Footer from "components/Footer";
import Nav from "components/Nav";
import { authService } from "fireB";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import DetailPage from "routes/DetailPage";
import MainPage from "routes/MainPage";
import ProfilePage from "routes/ProfilePage";
import SearchPage from "routes/SearchPage";
import "styles/App.css";


const Layout = (props) => { // Layout 함수를 만들어서 컴포넌트처럼 사용한다.
  return (// Outlet --> React-Route-Dom의 함수 중 하나; 부모 경로 요소에서 <Outlet>을 사용하면 자식 경로 요소를 렌더링 할 수 있다. Outlet 자리에는 Layout의 자식인 MainPage, DetailPage, SearchPage가 온다.
    <div>
      <Nav props={props} />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() { // 중첩 Route. Layout이 자식 요소를 감싸고 있음. 그 감싼 자식을 Outlet을 사용하면 불러와서 사용할 수 있다. 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log('authService.currentUser ->',authService.currentUser) 

  const [userObj, setUserObj] = useState(null);
  // console.log("userObj->",userObj)

  useEffect(() => {// 
    onAuthStateChanged(authService, (user) => {
      // console.log('user->',user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
       
      } else {
        setIsLoggedIn(false)
      }
      // setInit(true);
    });
  },[]);

  return (// Route에 index라고 넣으면 localhost:3000/ (Home 주소) 와 동일하게 된다. (부모 주소를 가져옴) movieId라는 state값을 붙이려면 :(콜론) 뒤에 넣으면 된다. (param값이 됨)
    <div className="app">
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Layout userObj={userObj} />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
