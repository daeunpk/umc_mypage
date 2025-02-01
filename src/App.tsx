import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'pretendard/dist/web/static/pretendard.css';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
// import SignupForm from './pages/signupForm';
// import MyRecipe from './pages/SlideContent/MyRecipes';
import DeleteAccountNextPage from './pages/DeleteAccountNextPage';
import DeleteAccount from './pages/DeleteAccount';
// import DeleteAccount from './pages/DeleteAccount';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage/>}/>
                {/* <Route path="/" element={<MyRecipe/>}/> */}
                {/* <Route path="/login" element={}/> */}
                <Route path="/mypage" element={<ProfilePage/>}/>
                <Route path="/mypage/edit-profile" element={<ProfileEditPage/>}/>
                <Route path="/mypage/delete-account" element={<DeleteAccount/>}/>
                <Route path="/mypage/delete-account-next" element={<DeleteAccountNextPage />} />
            </Routes>
        </Router>
    );
};

export default App;

