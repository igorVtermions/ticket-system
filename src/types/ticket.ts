export type ticketStatus = "Aberto" | "Em Progresso" | "Concluído";


export interface Ticket{
    id: number;
    title: string;
    status: ticketStatus;
    lastUpdated:string;
    description: string;
    creator: string;
    createdAt: string;
    comments: {
        createdAt: string;
        text: string;
    }[];
}