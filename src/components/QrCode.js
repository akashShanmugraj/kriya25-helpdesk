import { useDebugValue, useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { fetchUserDetails } from '../API/calls';
import { useOnSpotRegistration } from '../context/OnSpotRegistrationContext';
import Button from './Button';

const QRCodeDisplay = () => {
    const { urlState, detailsState, statusState } = useOnSpotRegistration();
    const [details, __] = detailsState;
    const [url, _] = urlState;
    const [status, setStatus] = statusState;

    const refreshPayment = async () => {
        try {
            if (url) {
                const res = await fetchUserDetails(details.kriyaId);
                setStatus(res.data.user.isPaid);
            }
        } catch (err) {
            setStatus(null);
        }
    }

    useEffect(() => {
        const int = setInterval(() => {
            refreshPayment();
        }, [1000]);

        return () => {
            clearInterval(int);
        }
    })

    return (
        <div className="flex flex-col items-center">
            <h2 className="px-4 py-2 text-violet-500 text-2xl text-center">Scan to pay{"  "}<span className="text-violet-900">{details.name}</span></h2>
            <div className='my-4'>
                {status === true && <h1 className='text-4xl text-violet-900'>Thanks for participating in kriya. 😀</h1>}
                {!status && (
                    <>
                        {url ?
                            <QRCode bgColor="transparent" value={url} fgColor="#4C1D95" eyeColor="#4C1D95" size={250} /> :
                            <h1 className='text-4xl text-violet-900'>Please wait 😄</h1>
                        }
                    </>
                )}
            </div>
            {!status && url && <Button text="Open Link" className='mb-2' handleClick={(e) => {
                window.open(url, "_blank");
            }} />}
            {!status && <Button text="Refresh" disabled={!url} handleClick={(e) => {
                refreshPayment();
            }} />}
        </div>
    );
}

export default QRCodeDisplay;