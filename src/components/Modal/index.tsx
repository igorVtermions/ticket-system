import { Ticket } from "@/types/ticket";
import { Button } from "../ui/button";
import { SendHorizontal, User } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  ticket: Ticket;
  setTickets: (updatedTickets: Ticket[]) => void;
  tickets: Ticket[];
}

export default function Modal({ ticket, setTickets, tickets }: ModalProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTickets(
      tickets.map((allTicket) =>
        allTicket.id === ticket.id
          ? {
              ...allTicket,
              comments: [
                ...ticket.comments,
                {
                  createdAt: currentTime,
                  text: newComment,
                },
              ],
            }
          : allTicket
      )
    );
    setNewComment("");
  };

  return (
    <section className="p-4 h-[500px] flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold">{ticket.title}</h2>
        <p className="text-sm text-gray-500 mb-2">Status: {ticket.status}</p>
        <p className="mb-2 text-xl font-semibold">Nome: {ticket.creator}</p>
        <p className="mb-2">Descrição: {ticket.description}</p>

        <p className="text-sm text-gray-500">
          Data de criação: {ticket.createdAt}
        </p>
        <p className="text-sm text-gray-500">
          Ultima atualização: {ticket.lastUpdated}
        </p>
        <hr className="mt-2" />
        <div className="max-h-[210px] sm:max-h-[250px] overflow-auto mt-3">
          {ticket.comments.length ? null : <h3>Não possui comentário</h3>}
          {ticket.comments.map((comment) => (
            <div
              key={comment.text}
              className="mb-3 bg-zinc-100 p-2 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-zinc-300 p-1 rounded-[50%]">
                  <User />
                </div>
                <div>
                  <p className="font-semibold mb-[-7px]">Suporte</p>
                  <span className="text-xs">{comment.createdAt}</span>
                </div>
              </div>
              <p className="ml-3">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>

      <form className="flex items-center" onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Escreva seu comentário ..."
          className="border-b-2 w-full outline-0"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="secondary" size="icon" className="size-8">
          <SendHorizontal />
        </Button>
      </form>
    </section>
  );
}
