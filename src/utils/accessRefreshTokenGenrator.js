import { ApiError } from "./apiError.js"


export const AccessRefreshTokenGenrator = async (user) => {
    try {
        if (!user){
            throw ApiError(500, "user not avelable")
        }

        const refreshToken = await user.GenrateRefreshToken()
        const accessToken = await user.GenrateAccessToken()
        
        return {refreshToken, accessToken}
    } catch (error) {
        return new ApiError(500, error || "Token not genrated")
    }
}