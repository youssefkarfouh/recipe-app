import { useEffect, useState } from 'react';
import axios from '../api/axios'
import { useLocation, useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [err, setErrMsg] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState(false);



    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, confirmPwd])


    useEffect(() => {
        setMatchPwd(pwd === confirmPwd)
    }, [pwd, confirmPwd])



    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post('/register',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );


            setUser('');
            setPwd('');
            setConfirmPwd('');

            alert("success")



        } catch (err) {

            console.log("err", err)

            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }

        }
    };



    return (
        <>
            <section className="signup p-5">

                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-4">

                            <h3 className="text-center my-5">Register</h3>

                            {err !== '' &&
                                <div class="alert alert-danger" role="alert">
                                    {err}
                                </div>}


                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        required
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        type="text" className="form-control" id="username" placeholder="username" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        required
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        type="password" className="form-control" id="password" placeholder="password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="psdConfirm" className="form-label">Confirm Password</label>
                                    <input
                                        required
                                        value={confirmPwd}
                                        onChange={(e) => setConfirmPwd(e.target.value)}
                                        type="password" className="form-control" id="psdConfirm" placeholder="confirm password" />
                                </div>

                                <button
                                    disabled={!matchPwd ? true : false}
                                    className="btn btn-primary">Sign Up</button>
                            </form>


                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default SignUp