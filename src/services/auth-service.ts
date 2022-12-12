
import jwt from 'jsonwebtoken'


export class AuthService {

    public static async newToken(
        user: any,
        expiresIn: string | number = '7d'
    ): Promise<string> {
        user.token = jwt.sign({ id: user?.id}, 'AAAAAAAAA', {
            expiresIn
        })

        return user?.token
    }

}



