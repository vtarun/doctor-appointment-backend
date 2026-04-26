import crypto from 'crypto';

import { CreateVideoSessionResult, GenerateVideoTokenResult, VideoParticipant, VideoProvider } from "./video.provider";

export class StubVideoProvider implements VideoProvider{
    async createSession(): Promise<CreateVideoSessionResult> {
        return {
            sessionId: `stub-session-${crypto.randomUUID()}`
        }
    }

    async generateToken(input: { sessionId: string; participant: VideoParticipant; expiresAt: Date; }): Promise<GenerateVideoTokenResult> {
        const raw = `${input.sessionId}:${input.participant.userId}:${input.participant.role}:${input.expiresAt.toISOString()}`;
        return {
            token: Buffer.from(raw).toString('base64'),
            expiresAt: new Date()
        }
    }
}