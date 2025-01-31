import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import './AccountManagement.css';

const AccountManagement: React.FC = () => {
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleDeleteAccount = () => {
        navigate('/mypage/delete-account');
    };

    return (
        <div className="account-management">
            <div className="actions">
                <button onClick={() => setLogoutModalOpen(true)} className="logout-btn">로그아웃</button>
                <hr />
                <button onClick={handleDeleteAccount} className="delete-account-btn">회원탈퇴</button>
                <hr />
            </div>

            {/* 로그아웃 확인 모달 */}
            {isLogoutModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>정말 로그아웃 하시겠습니까?</p>
                        <div className="modal-actions">
                            <button onClick={() => setLogoutModalOpen(false)} className="cancel-btn">닫기</button>
                            <button onClick={handleLogout} className="confirm-btn">로그아웃</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountManagement;
