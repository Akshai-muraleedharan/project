import jwt from "jsonwebtoken";

export const createToken = (email, role,) => {
    const token = jwt.sign({ email: email, role: role,}, process.env.JWT_KEY);
    
    return token;
}; 