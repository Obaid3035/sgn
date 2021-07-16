import React, {useEffect} from "react";

const Welcome = ( props ) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={'container'}>
            <div className="card text-center mt-5">
                <div className="card-body">
                    <p className="card-text">Thank you for completing the application form.  A confirmation email will be sent to you shortly.</p>
                    <h5 className="card-title">Human Resource</h5>
                </div>
                <div className="card-footer text-muted">
                    HR@sitchaglobalnetwork.com
                </div>
            </div>
        </div>
    );
}

export default Welcome;
