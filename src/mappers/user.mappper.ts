export function toUserResponse(user: any){
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        role: user.role ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}