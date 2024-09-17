import bcyrpt from "bcrypt";

export const matchPassword = (password,PasswordValue) => {
    const passwordMatch = bcyrpt.compareSync(password,PasswordValue );
    return passwordMatch;
}
