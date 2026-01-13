export type NodeDev = 'development' | 'test' | 'production';

export const env: {
	PORT: number, 
	NODE_ENV: NodeDev  
} = {
	PORT : Number(process.env.PORT) || 3000,
	NODE_ENV : (process.env.NODE_ENV as NodeDev)|| 'development'
}