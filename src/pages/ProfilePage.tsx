import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const AccountManagement = React.lazy(() => import("./SlideContent/AccountManagement"));
const MyBar = React.lazy(() => import("./SlideContent/MyBar"));
const MyTastingNotes = React.lazy(() => import("./SlideContent/MyTastingNotes"));
const MyRecipes = React.lazy(() => import("./SlideContent/MyRecipes"));

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState<string>("");
    const [introText, setIntroText] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("src/components/icons/profileIcons/basicimage.png");
    const [currentMenu, setCurrentMenu] = useState<number>(0);

    const menuItems = ["계정 관리", "내 바", "내 테이스팅 노트", "내 레시피"];

    const carouselViewRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    // 사용자 정보 로딩
    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        const storedIntro = localStorage.getItem("introText");
        const storedProfilePic = localStorage.getItem("profilePic");

        if (storedNickname) setNickname(storedNickname);
        if (storedIntro) setIntroText(storedIntro);
        if (storedProfilePic) setProfilePic(storedProfilePic);
    }, []);

    // 첫 번째 렌더링 후, 캐러셀의 높이를 동적으로 설정 (로딩 시 바로 표시)
    useLayoutEffect(() => {
        if (carouselViewRef.current && slideRefs.current[currentMenu]) {
            const activeSlideHeight = slideRefs.current[currentMenu]?.offsetHeight || 0;
            carouselViewRef.current.style.height = `${activeSlideHeight}px`;
        }
    }, [currentMenu]);

    const renderSlideContent = (index: number) => {
        switch (index) {
            case 0:
                return <AccountManagement />;
            case 1:
                return <MyBar />;
            case 2:
                return <MyTastingNotes />;
            case 3:
                return <MyRecipes />;
            default:
                return <AccountManagement />;
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-container">
                    <div className="profile-picture">
                        <img src={profilePic} alt="프로필 사진" />
                    </div>
                    <div className="profile-info">
                        <h2>{nickname || "UMC 님"}</h2>
                        <p>
                            {introText || "술이 취미인 사람입니다."}
                            <button
                                className="profile-info-edit"
                                onClick={() => navigate("/edit-profile")}
                            >
                                프로필 수정
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="menu-navigation">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <button
                            onClick={() => setCurrentMenu(index)}
                            className={currentMenu === index ? "active-menu" : ""}
                        >
                            {item}
                        </button>
                        {index !== menuItems.length - 1 && (
                            <span className="menu-separator">|</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="menu-carousel">
                <div className="carousel-view" ref={carouselViewRef}>
                    <div
                        className="carousel-container"
                        style={{
                            transform: `translateX(-${currentMenu * 100}%)`,
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                        }}
                    >
                        {menuItems.map((_, index) => (
                            <div
                                key={index}
                                className="carousel-slide"
                                ref={(el) => (slideRefs.current[index] = el)}
                            >
                                {renderSlideContent(index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
