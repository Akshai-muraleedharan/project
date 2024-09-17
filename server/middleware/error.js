


export const errorSignupHandler = (req,res,next) => {
        try {
            // console.log(req.body)
            const { email, username, password, city,confirmPassword,mobile } = req.body;

            if (!username || username.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Username is required", values: 'username' });
            }

            if (!email || email.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Email is required", values: 'email' });
            }

            if (!password || password.trim() === "") {
                return res.status(400).json({ success: 'error', message: "Password is required", values: 'password' });
            }

            if (!confirmPassword || confirmPassword.trim() === "") {
                return res.status(400).json({ success: 'error', message: "confirm-Password is required", values: 'confirm-password' });
            }

            if (password != confirmPassword) {
                return res.status(400).json({ success: false, message: "password does not match" ,values:'confirm-password'});
              }

           
           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email) ) {
                return res.status(400).json({ success: 'error', message: "Invalid email format", values: 'email' });
            }

            if (!mobile || mobile.trim() === "" ) {
                return res.status(400).json({ success: 'error', message: "mobile number is required", values: 'mobile' });
            }


            const cleanedMobile = mobile.replace(/\D/g, '');
            
    if (cleanedMobile.length < 10 || cleanedMobile.length > 15) {
        return res.status(400).json({ success: 'error', message: "Mobile number must be between 10 and 15 digits", values: 'mobile' });
    }
    
           
    
           
            

            next();
        } catch (error) {
            res.status(error.status || 501).json(error.message || "internal  errorHandler error")
        }
}



export const loginErrorHandler = (req,res,next)=> {
    try {

        const {email,password} =req.body; 

        if (!email || email.trim() === "") {
            return res.status(400).json({ success: 'error', message: "Email is required", values: 'email' });
        }

        if (!password || password.trim() === "") {
            return res.status(400).json({ success: 'error', message: "Password is required", values: 'password' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email) ) {
                return res.status(400).json({ success: 'error', message: "Invalid email format", values: 'email' });
            }

            next()

    } catch (error) {
        res.status(error.status || 501).json(error.message || "internal  errorHandler error")
    }
};



export const otpErroHandler = async (req,res,next) => {

    try {
        const { mobile,otp} = req.body;
        if(!mobile || mobile.trim() == '' ) return res.status(400).json({success:false,message:"mobile requird",values: 'mobile' })
        if(!otp || otp.trim() == '') return res.status(400).json({success:false,message:"otp requird",values: 'otp' })
          
          
            next()

    } catch (error) {
        res.status(error.status || 501).json(error.message || "internal  errorHandler error")
    }
}