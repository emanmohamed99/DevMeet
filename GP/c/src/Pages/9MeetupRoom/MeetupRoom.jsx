import React, { useState } from 'react';
import NavBar from '../../Components/NavBar';
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import "./MeetupRoom.css"
import { useTranslation } from 'react-i18next';


const MeetupRoom = () => {
    // const text = "Lorem ipsum";
    let [t,i18n]= useTranslation();
    const [idCopied,setIDCopied] = useState(false);  
    const copyNotify = () =>{
        setIDCopied(true);
    }

    let url = window.location.href
    let arrayurl = url.split("/");
    let id = arrayurl[4]
    console.log(id)
    let user = JSON.parse(localStorage.getItem('user'))
    user = user.user
    let fName = user.firstName;
    let lNAme = user.lastName;
    let userName = fName + " " + lNAme
    // console.log(userName)
    const { roomId } = useParams();
    const mybackbutton = () => {
        // alert("your Room id is  "+roomcode)
        // navigate(`/meetup/${roomcode}`)
    }
    const mymeeting = async (element) => {
        // console.log(element)
        const appID = 1947769895;
        const serverSecret = "21f8b8d6f7b2c471d8b46bab695a99c4";
        const kiToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
            serverSecret,
            roomId,
            user._id,
            userName,
        );
        const zp = ZegoUIKitPrebuilt.create(kiToken)
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference
            }
        })
    }
    return (
        <>
            <NavBar />
            <div>
                <div className='room-page-parent'>
                    <div className='room-page-child'>
                        <div ref={mymeeting}>
                        </div>
                    </div>
                    <div className=" inviteDiv">
                        <h5>{t("Invite Friends")}</h5>
                        <h6>{t("Meetup ID")} </h6>
                        <div className='shareid'>{id}</div>
                        <div  onClick={copyNotify} >
                            <button className='buttonId mt-3' onClick={() => { navigator.clipboard.writeText(id); }}> {t("Copy Meetup ID")} </button>
                        </div>

                        { idCopied &&
                            <h6 className='toclipboard'  > {t("Meetup ID Copied to Clipboard")}</h6>
                        }

                    </div>
                    
                </div>
            </div>

        </>
    );
}

export default MeetupRoom;
