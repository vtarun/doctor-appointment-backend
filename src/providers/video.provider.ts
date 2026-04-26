export interface CreateVideoSessionResult {
    sessionId: string
}

export interface GenerateVideoTokenResult { 
    token: string,
    expiresAt: Date
}

export interface VideoParticipant {
    userId: string,
    role: 'DOCTOR' | 'PATIENT'
}

export interface VideoProvider {
    createSession(): Promise<CreateVideoSessionResult>,
    generateToken(input: {sessionId: string, participant: VideoParticipant, expiresAt: Date}): Promise<GenerateVideoTokenResult>
}