import styled from "styled-components"

import { LoadingView, Top, ProfileWithMenu, profileMenuRef } from "../../components"
import { useUser } from "../../utils/hooks"
import ProfileContainer from "../../containers/profile"

import Menu from '../../public/icons/burger.svg'
import { COLORS } from "../../utils/const"

const MenuIcon = styled(Menu)`
    width: 36px;
    height: 36px;
    display: none;
    path {
        fill: ${COLORS.primary.camel};
    }

    @media only screen and (max-width: 700px) {
        display: block;
    }
`

const Profile = () => {
    const { user, loading } = useUser()
    return (
        <>
            <Top label="Профиль" value={<MenuIcon onClick={() => profileMenuRef.current.openModal()} />} />
            <LoadingView loading={loading} />
            {
                !loading && (
                    <ProfileWithMenu>
                        <ProfileContainer user={user} />
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default Profile