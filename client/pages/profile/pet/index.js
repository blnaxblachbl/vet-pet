import styled from "styled-components"

import { LoadingView, Top, ProfileWithMenu, profileMenuRef } from "../../../components"
import { useUser } from "../../../utils/hooks"
import { COLORS } from "../../../utils/const"
import PetContainer from "../../../containers/profile/pet"

import Menu from '../../../public/icons/burger.svg'

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

const ProfilePet = () => {
    const { user, loading } = useUser()
    return (
        <>
            <Top
                label="Питомцы"
                value={<MenuIcon onClick={() => profileMenuRef.current.openModal()} />}
            />
            <LoadingView loading={loading} />
            {
                !loading && (
                    <ProfileWithMenu>
                        <PetContainer user={user} />
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default ProfilePet